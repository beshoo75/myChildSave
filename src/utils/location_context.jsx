// import { createContext, useContext, useEffect, useState } from "react";
// import getCookie from "../utils/get_cookie";

// const LocationContext = createContext();

// export const GeolocationProvider = ({ children }) => {
//     const [geolocation, setGeolocation] = useState({
//         user: parseInt(localStorage.getItem("id")),
//         lat: 0,
//         lng: 0,
//     });
//     const socket = new WebSocket(
//         `wss://${window.location.hostname}/ws/traffic/`
//     );
//     const [error, setError] = useState(null);
//     const [intervalId, setIntervalId] = useState();
//     const getGeolocation = () => {
//         if (localStorage.getItem("is_staff") == "true") {
//             if (navigator.geolocation) {
//                 navigator.geolocation.getCurrentPosition(
//                     (position) => {
//                         const { latitude, longitude } = position.coords;
//                         // console.log(`latitude:${latitude}, longitude: ${longitude}`);
//                         setGeolocation({
//                             lat: parseFloat(latitude),
//                             lng: parseFloat(longitude),
//                         });

//                         sendLocation(geolocation);
//                         console.log("context");
//                     },
//                     (err) => {
//                         setError(err.message);
//                     }
//                 );
//             } else {
//                 setError("Geolocation is not supported by this browser.");
//             }
//             if (!getCookie("csrftoken")) {
//                 return () => {
//                     socket.close();
//                     clearInterval(intervalId);
//                 };
//             }
//         }
//     };

//     useEffect(() => {
//         //     getGeolocation(); // Get location immediately
//         getGeolocation(); // Get location immediately
//         setIntervalId(() => setInterval(getGeolocation, 10000)); // Repeat every 10 seconds
//         socket.onerror = (error) => {
//             console.error("WebSocket error:", error);
//         };
//         //     setIntervalId(() => setInterval(getGeolocation, 15000)); // Repeat every 15 seconds

//         //     return () => clearInterval(intervalId); // Cleanup on unmount

//         // socket.onmessage = (event) => {
//         //     const data = JSON.parse(event.data);
//         //     if (data.messages) {
//         //         setAllMessages(data.messages);
//         //     } else {
//         //         setAllMessages((prevData) => [
//         //             ...prevData,
//         //             {
//         //                 user: parseInt(data.user),
//         //                 message_text: data.message_text,
//         //                 room_name: data.room_name,
//         //             },
//         //         ]);
//         //     }
//         // };

//         // return () => clearInterval(intervalId); // Cleanup on unmount
//     }, []);

//     const sendLocation = (data) => {
//         if (data) {
//             socket.send(JSON.stringify(data));
//             // const message = {
//             //     message_text: text,
//             //     user: parseInt(localStorage.getItem("id")),
//             // };
//         }
//     };

//     const stopGeoLocationUpdates = () => {
//         if (intervalId) {
//             clearInterval(intervalId);
//             setIntervalId(null);
//         }
//     };

//     return (
//         <LocationContext.Provider
//             value={{ geolocation, error, stopGeoLocationUpdates }}
//         >
//             {children}
//         </LocationContext.Provider>
//     );
// };

// export const useGeolocation = () => {
//     return useContext(LocationContext);
// };

import { createContext, useContext, useState } from "react";
import { SystemAxios } from "./custom_axios";
import getCookie from "./get_cookie";
import { toast } from "react-toastify";
// import { SystemAxios } from "./custom_axios";
// import getCookie from "./get_cookie";
// import getCookie from "../utils/get_cookie";

const LocationContext = createContext();

export const GeolocationProvider = ({ children }) => {
    const [geolocation, setGeolocation] = useState({
        user: parseInt(localStorage.getItem("id")),
        lat: 0,
        lng: 0,
    });
    const [error, setError] = useState(null);
    const [intervalId, setIntervalId] = useState(null);
    const [notifState, setNotifState] = useState({
        count: 0,
        data: [],
    });
    const trafficRoomName = "global";
    let trafficSocket = null;
    let notifSocket = null;

    const getGeolocation = () => {
        if (localStorage.getItem("is_staff") == "true") {
            if (navigator.geolocation) {
                console.log("location");
                try {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const { latitude, longitude } = position.coords;
                            console.log(
                                `latitude:${latitude}, longitude: ${longitude}`
                            );
                            setGeolocation((prevGeo) => ({
                                ...prevGeo,
                                lat: latitude,
                                lng: longitude,
                            }));
                            sendLocation({
                                user: parseInt(localStorage.getItem("id")),
                                lat: latitude,
                                lng: longitude,
                                room_name: trafficRoomName,
                            });
                        },
                        (err) => {
                            setError(err.message);
                        }
                    );
                } catch (error) {
                    console.error(error);
                }
            } else {
                setError("Geolocation is not supported by this browser.");
            }
        }
    };

    const startGeoLocationUpdates = () => {
        trafficSocket = new WebSocket(
            `wss://${window.location.hostname}/ws/traffic/${trafficRoomName}/`
        );
        getGeolocation();
        const id = setInterval(getGeolocation, 10000); // Repeat every 10 seconds
        setIntervalId(id);

        trafficSocket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };
    };

    const updateNotificationsState = async (id) => {
        let tempData = notifState.data.filter((notif) => notif.id === id)[0];
        tempData.read = true;
        try {
            const response = await SystemAxios.put(
                `/notifications/update/${id}/`,
                tempData,
                {
                    withCredentials: true,
                    headers: {
                        "X-CSRFToken": getCookie("csrftoken"),
                    },
                }
            );
            if (response.status === 200) {
                setNotifState((prevData) => ({
                    count: prevData.count - 1,
                    data: prevData.data.filter((notif) => notif.id !== id),
                }));
            }
        } catch (error) {
            console.error(error.response);
        }
    };

    const startNotificationsUpdateService = () => {
        try {
            notifSocket = new WebSocket(
                `wss://${
                    window.location.hostname
                }/ws/notification/${localStorage.getItem("id")}/`
            );

            notifSocket.onmessage = async (event) => {
                const data = JSON.parse(event.data);
                if (
                    data["type"] === "notif_count" &&
                    data.count !== notifState.count
                ) {
                    // console.log(typeof notificationsState.data);
                    // console.log(data);
                    // setNotifCount(data.count);
                    setNotifState((prevData) => ({
                        ...prevData,
                        count: data.count,
                    }));
                    await fetchNotifications();
                    // notificationRequest();
                    toast(`لديك ${data.count} إشعار جديد`);
                }
                // if (data.type == "new_notif") {
                //     setNotificationsState((prevData) => ({
                //         ...prevData,
                //         data: [data.notif, ...prevData.data],
                //     }));
                // } else if (data.type == "all_notifs") {
                //     setNotificationsState((prevData) => ({
                //         ...prevData,
                //         data: [...data.notifs],
                //     }));
                // } else if (data.type == "notif_count") {
                //     setNotificationsState((prevData) => ({
                //         ...prevData,
                //         count: data.count,
                //     }));

                // }
            };
            // console.log("state", notifData);

            notifSocket.onerror = (error) => {
                console.error("Notification WebSocket error:", error);
            };
        } catch (error) {
            console.error(error);
        }
    };

    const fetchNotifications = async () => {
        try {
            const response = await SystemAxios.get(
                `/notifications?user=${localStorage.getItem("id")}`,
                // notifData.,
                {
                    withCredentials: true,
                    headers: {
                        "X-CSRFToken": getCookie("csrftoken"),
                    },
                }
            );
            if (response.status === 200) {
                // setNotifData(() => response.data);
                setNotifState((prevData) => ({
                    ...prevData,
                    data: response.data,
                }));
                // console.log(response.data);
            }
        } catch (error) {
            console.error(error.response);
        }
    };

    // useEffect(() => {}, []);

    const sendLocation = (data) => {
        if (data) {
            // console.log(data);
            trafficSocket.send(JSON.stringify(data));
        }
    };

    const stopGeoLocationUpdates = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
            trafficSocket.close();
        }
    };

    const stopNotificationsUpdateService = () => {
        notifSocket.close();
    };

    return (
        <LocationContext.Provider
            value={{
                geolocation,
                error,
                notifCount: notifState.count, // Aliasing notificationsState.count to notifCount (Renaming)
                notifData: notifState.data,
                startGeoLocationUpdates,
                stopGeoLocationUpdates,
                startNotificationsUpdateService,
                stopNotificationsUpdateService,
                updateNotificationsState,
            }}
        >
            {children}
        </LocationContext.Provider>
    );
};

export const useGeolocation = () => {
    return useContext(LocationContext);
};
