// import React from 'react'
// import student from '../data/static/user_data'
// import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
// const containerStyle = {
//     width: '100%',
//     height: '100vh',
// };
// export default function BuseReport() {
//     const homeLocation = {
//         lat: 25.43726490668397,
//         lng: 49.572224942188484,
//     };

//     const { isLoaded } = useJsApiLoader({
//         id: 'google-map-script',
//         googleMapsApiKey: 'AIzaSyBTfYU0MEJW0Oz_fEaC_Zf1czU1dj2YgBw',
//     });
//     const onLoad = React.useCallback((map) => {
//         const bounds = new window.google.maps.LatLngBounds();
//         bounds.extend(center);
//         bounds.extend(homeLocation);
//         map.fitBounds(bounds);
//         setMap(map);
//     }, [homeLocation]);

//     const onUnmount = React.useCallback((map) => {
//         setMap(null);
//     }, []);

//     return (
//         <>
//             <h1 style={{ backgroundColor: '#dad7cd' }} className='text-black p-4 text-center m-10 rounded text-3xl'>التقرير الحالي للباص رقم: <span className='text-green-800'>1111</span></h1>
//             <div className='w-10/12 m-auto shadow-lg rounded my-5 p-4 flex justify-around'>

//                 <h1 className='text-black text-3xl'>المشرف: <span className='text-green-800'>محمد علي</span></h1>
//                 <h1 className='text-black text-3xl'>عدد الطلاب في الباص: <span className='text-green-800'>20</span></h1>

//             </div>

//             <div className='w-10/12 m-auto shadow-lg rounded '>
//                 <table className="w-full  mt-5">
//                     <thead>
//                         <tr className='border-b rounded p-2 border-green-500 text-center'>
//                             <th className=" px-4 py-2 text-right">الصورة</th>
//                             <th className=" px-4 py-2 ">الاسم</th>
//                             <th className=" px-4 py-2 ">الصف</th>
//                             <th className=" px-4 py-2 ">العنوان</th>
//                             <th className=" px-4 py-2 ">الحالة</th>
//                         </tr>
//                     </thead>
//                     <tbody className='text-center'>
//                         {student.map((student) => (
//                             <tr key={student.id}>
//                                 <td className="py-2 px-4 ">
//                                     <img src={student.photo} alt={student.name} className="w-12 h-12 rounded-full" />
//                                 </td>
//                                 <td className="border-b border-gray-200 px-4 py-2">{student.name}</td>
//                                 <td className="border-b border-gray-200 px-4 py-2">{student.classNu}</td>
//                                 <td className="border-b border-gray-200 px-4 py-2">{student.nationality}</td>
//                                 <td className="border-b border-gray-200 px-4 py-2">{student.active ? 'في الباص' : 'تم النزول'}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             <div className='w-10/12 m-auto shadow-lg rounded '>
//                 <GoogleMap
//                     mapContainerStyle={containerStyle}
//                     center={homeLocation}
//                     zoom={15}
//                     onLoad={onLoad}
//                     onUnmount={onUnmount}
//                 ></GoogleMap>
//             </div>
//         </>
//     )
// }
import { useCallback, useEffect, useState } from "react";
import student from "../data/static/user_data";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import car from "../assets/img/car.png";
import { useGeolocation } from "../utils/location_context";
import { SystemAxios } from "../utils/custom_axios";
import getCookie from "../utils/get_cookie";
const containerStyle = {
    width: "100%",
    height: "100vh",
};

function BusReport() {
    // const socket = new WebSocket("ws://localhost:8000/ws/traffic/global/");
    const [map, setMap] = useState(null); // State to manage the map instance

    const [busData_Location, setBusData_Location] = useState({});
    const [studentsHomeLocations, setStudentsHomeLocations] = useState([]);
    // const [supervisorBus, setSupervisorBus] = useState({});

    const { geolocation } = useGeolocation();
    const homeLocation = {
        lat: geolocation.lat || 25.43726490668397,
        lng: geolocation.lng || 49.572224942188484,
    };

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyBTfYU0MEJW0Oz_fEaC_Zf1czU1dj2YgBw", // Replace with your API key
    });

    useEffect(() => {
        getSupervisorBusRequest();
        // socket.onmessage = (event) => {
        //     const data = JSON.parse(event.data);
        //     let temp = {};
        //     try {
        //         temp = { data: busData_Location.data };
        //         if (data.bus_id == temp.data.id) {
        //             temp = { location: data, data: busData_Location.data };
        //         }
        //     } catch (error) {
        //         console.error(error);
        //     } finally {
        //         setBusData_Location(temp);
        //         console.log(busData_Location);
        //     }
        //     // setBusData_Location(() => [
        //     //     ...temp,
        //     //     {
        //     //         user: parseInt(data.user),
        //     //         message_text: data.message_text,
        //     //         room_name: data.room_name,
        //     //     },
        //     // ]);
        // };

        // socket.onerror = (error) => {
        //     console.error("WebSocket error:", error);
        // };

        const intervalId = setInterval(() => {
            console.log(geolocation);
            console.log("student", studentsHomeLocations);
        }, 10000);

        return () => {
            // socket.close();
            clearInterval(intervalId);
            console.log("closed");
        };
    }, []);

    const getSupervisorBusRequest = async () => {
        try {
            const id = parseInt(localStorage.getItem("id"));
            const response = await SystemAxios.get(
                `/students/traffic-supervisor?supervisor=${id}`,
                {
                    withCredentials: true,
                    headers: { "X-CSRFToken": getCookie("csrftoken") },
                }
            );

            if (response.status === 200 && response.data.length > 0) {
                setBusData_Location((prevData) => ({
                    location: prevData.location,
                    data: { ...response.data[0] },
                }));
                console.log(response.data);
                // setID(response.data.id);
                console.log("data fetched");
            }
        } catch (error) {
            console.error("Error fetching home location:", error.response);
        }
    };

    const onLoad = useCallback(
        (map) => {
            const bounds = new window.google.maps.LatLngBounds();
            bounds.extend(homeLocation);
            map.fitBounds(bounds);
            setMap(map);
        },
        [homeLocation]
    );

    const onUnmount = useCallback(() => {
        setMap(null);
    }, []);

    return (
        <>
            <h1
                style={{ backgroundColor: "#dad7cd" }}
                className="text-black p-4 text-center m-10 rounded text-3xl"
            >
                التقرير الحالي للباص رقم:{" "}
                <span className="text-green-800">1111</span>
            </h1>
            <div className="w-10/12 m-auto shadow-lg rounded my-5 p-4 flex justify-around">
                <h1 className="text-black text-3xl">
                    المشرف: <span className="text-green-800">محمد علي</span>
                </h1>
                <h1 className="text-black text-3xl">
                    عدد الطلاب في الباص:{" "}
                    <span className="text-green-800">20</span>
                </h1>
            </div>

            <div className="w-10/12 m-auto shadow-lg rounded">
                <table className="w-full mt-5">
                    <thead>
                        <tr className="border-b rounded p-2 border-green-500 text-center">
                            <th className="px-4 py-2 text-right">الصورة</th>
                            <th className="px-4 py-2">الاسم</th>
                            <th className="px-4 py-2">الصف</th>
                            <th className="px-4 py-2">العنوان</th>
                            <th className="px-4 py-2">الحالة</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {student.map((student, index) => (
                            <tr key={index}>
                                <td className="py-2 px-4">
                                    <img
                                        src={student.photo}
                                        alt={student.name}
                                        className="w-12 h-12 rounded-full"
                                    />
                                </td>
                                <td className="border-b border-gray-200 px-4 py-2">
                                    {student.name}
                                </td>
                                <td className="border-b border-gray-200 px-4 py-2">
                                    {student.classNu}
                                </td>
                                <td className="border-b border-gray-200 px-4 py-2">
                                    {student.nationality}
                                </td>
                                <td className="border-b border-gray-200 px-4 py-2">
                                    {student.active ? "في الباص" : "تم النزول"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="w-10/12 m-auto shadow-lg my-10 rounded">
                {isLoaded ? (
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={homeLocation}
                        zoom={15}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                    >
                        {student.map((stu, index) => (
                            <Marker
                                key={index}
                                position={{
                                    lat: geolocation.lat + index,
                                    lng: geolocation.lng + index,
                                }}
                                title={student.name}
                                icon={{
                                    url: car,
                                    scaledSize: new window.google.maps.Size(
                                        50,
                                        50
                                    ),
                                }}
                            />
                        ))}
                    </GoogleMap>
                ) : (
                    <div>Loading map...</div>
                )}
            </div>
        </>
    );
}
export default BusReport;
