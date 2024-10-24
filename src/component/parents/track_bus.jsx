import React, { useState, useEffect } from "react";
import {
    GoogleMap,
    useJsApiLoader,
    Marker,
    Polyline,
} from "@react-google-maps/api";
import car from "../../assets/img/car.png";
import getCookie from "../../utils/get_cookie";
import { SystemAxios } from "../../utils/custom_axios";
import getLocation from "../../utils/get_location";
import FloatingActionButton from "../widget/floating_action_button";
import { faLocation } from "@fortawesome/free-solid-svg-icons";
const containerStyle = {
    width: "100%",
    height: "100vh",
};


function TrackBus() {
    const socket = new WebSocket("ws://localhost:8000/ws/traffic/global/");

    const [position, setPosition] = useState({
        latitude: null,
        longitude: null,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [route, setRoute] = useState([]);
    // const [id, setID] = useState(0);
    const [map, setMap] = useState(null);
    const [parentHomeLocationData, setParentHomeLocationData] = useState({
        hasLocation: false,
        data: { parent: parseInt(localStorage.getItem("id")) },
    });
    const [studentBus, setStudentBus] = useState([]);
    const [busLocations, setBusLocations] = useState([]);

    useEffect(() => {
        fetchLocationAndRoute();
        socket.onmessage = (event) => {
            // update buses locations that comes from the supervisor, where parent has a student inside that bus
            const data = JSON.parse(event.data);
            studentBus.map((student) => {
                if (student.bus == data.bus_id) {
                    // check if student bus id is equal to the data bus coming from the server
                    let temp = busLocations;
                    if (temp.length > 0) {
                        // check if the bus locations array has items
                        temp = temp.filter((bus) => {
                            // if the bus data has an object data remove it from bus locations array
                            if (bus.bus_id !== data.bus) {
                                return bus;
                            }
                        });
                    }
                    setBusLocations([...temp, data]); // set new bus location data that comes from the server to buslocations state
                }
            });
            // console.log(busLocations);
        };

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };
        return () => {
            socket.close();
        };
    }, []);
    const homeLocation = {
        lat: parentHomeLocationData.data.lat || 25.43247783909052,
        lng: parentHomeLocationData.data.lng || 49.572036104196684,
    };
    const center = {
        lat: position.latitude || 0,
        lng: position.longitude || 0,
    };
    const fetchLocationAndRoute = async () => {
        try {
            console.log("bus" + busLocations)
            console.log("====================")
            await getParentHomeLocationRequest();
            await getStudentBus();
            const userPosition = await getLocation();
            setPosition(userPosition);
        } catch (err) {
            setError("Failed to get location.");
        } finally {
            setLoading(false);
        }
    };

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyBTfYU0MEJW0Oz_fEaC_Zf1czU1dj2YgBw",
    });

    const fetchRoute = (origin, destination) => {
        if (!window.google || !window.google.maps) {
            console.error("Google Maps API not loaded");
            return;
        }

        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route(
            {
                origin: new window.google.maps.LatLng(origin.latitude, origin.longitude),
                destination: new window.google.maps.LatLng(destination.lat, destination.lng),
                travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    const points = result.routes[0].overview_path; // Use overview_path for the route
                    setRoute(points);
                } else {
                    console.error("Error fetching directions:", status, result);
                }
            }
        );
    };

    useEffect(() => {
        if (position.latitude && position.longitude) {
            fetchRoute(position, homeLocation);
        }
    }, [position]);

    /**
     * Get data of the students and their buses that are related to the parent
     */
    const getStudentBus = async () => {
        try {
            const response = await SystemAxios.get(
                `/students/traffic-parent?parent=${parentHomeLocationData.data.parent}`,
                {
                    withCredentials: true,
                    headers: { "X-CSRFToken": getCookie("csrftoken") },
                }
            );

            if (response.status === 200 && response.data.length > 0) {
                setStudentBus(() => [...response.data]);
                console.log(studentBus);
                // setID(response.data.id);
                console.log("data fetched bus");
            }
        } catch (error) {
            console.error("Error fetching home location:", error);
            setError("Failed to fetch home location.");
        }
    };

    /**
     * get the parent home location from the data base
     */
    const getParentHomeLocationRequest = async () => {
        try {
            const response = await SystemAxios.get(
                `/users/location?parent=${parentHomeLocationData.data.parent}`,
                {
                    withCredentials: true,
                    headers: { "X-CSRFToken": getCookie("csrftoken") },
                }
            );

            if (response.status === 200 && response.data.length > 0) {
                setParentHomeLocationData(() => ({
                    hasLocation: true,
                    data: { ...response.data[0] },
                })

                );

                console.log(response.data);
                // setID(response.data.id);
                console.log("data fetched 1");
            }
            // else {
            //     setParentHomeLocationData(() => ({
            //         hasLocation: true,
            //         data: homeLocation
            //     }))
            // }
        } catch (error) {
            console.error("Error fetching home location:", error.response);
            setError("Failed to fetch home location.");
        }
    };

    const handleSaveButtonClick = async (event) => {
        event.preventDefault();
        if (parentHomeLocationData.hasLocation) {
            await editParentHomeLocationRequest();
        } else {
            await saveNewParentHomeLocationRequest();
        }
    };

    const saveNewParentHomeLocationRequest = async () => {
        try {
            const { latitude, longitude } = await getLocation();

            const response = await SystemAxios.post(
                "/users/location/create/",
                {
                    ...parentHomeLocationData.data,
                    lat: latitude,
                    lng: longitude,
                },
                {
                    withCredentials: true,
                    headers: { "X-CSRFToken": getCookie("csrftoken") },
                }
            );

            if (response.status === 201) {
                await getParentHomeLocationRequest(); // Refresh data
            }
        } catch (error) {
            console.error("Error saving location:", error.response);
            setError("Failed to save location.");
        }
    };

    const editParentHomeLocationRequest = async () => {
        try {
            const { latitude, longitude } = await getLocation();
            const response = await SystemAxios.put(
                `/users/location/update/${parentHomeLocationData.data.id}/`,
                {
                    ...parentHomeLocationData.data,
                    lat: latitude,
                    lng: longitude,
                },
                {
                    withCredentials: true,
                    headers: { "X-CSRFToken": getCookie("csrftoken") },
                }
            );

            if (response.status === 200) {
                setParentHomeLocationData((prevData) => ({
                    ...prevData,
                    data: { ...prevData.data, lat: latitude, lng: longitude },
                }));
                console.log("update done");
            }
        } catch (error) {
            console.error("Error editing location:", error);
            setError("Failed to edit location.");
        }
    };

    return loading ? (
        <div>Loading...</div>
    ) : error ? (
        <div>{error}</div>
    ) : isLoaded && position.latitude && position.longitude ? (
        <>
            {/* <button onClick={handleSaveButtonClick}>
                {parentHomeLocationData.hasLocation ? "تعديل" : "حفظ"} إحداثيات
                المنزل
            </button> */}

            <div className="w-full h-5/6">
                <FloatingActionButton text={parentHomeLocationData.hasLocation ? "تعديل" : "حفظ"} onClick={handleSaveButtonClick} />
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={15}
                    onLoad={setMap}
                    onUnmount={() => setMap(null)}
                >
                    <Marker
                        position={busLocations}
                        title="You are here!"
                        icon={{
                            url: car,
                            scaledSize: new window.google.maps.Size(50, 50),
                        }}

                    />
                    <Marker
                        position={homeLocation}
                        title="Your home is here!"
                        icon={{
                            url: car,
                            scaledSize: new window.google.maps.Size(50, 50),
                        }}
                    />
                    {route.length > 0 && (
                        <Polyline
                            path={route}
                            options={{
                                strokeColor: "#FF0000",
                                strokeOpacity: 1.0,
                                strokeWeight: 7,
                            }}
                        />
                    )}
                </GoogleMap>
            </div>
        </>
    ) : (
        <div>Error loading map or location.</div>
    );
}

export default TrackBus;
