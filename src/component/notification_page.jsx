// // import { useState } from "react";
// // import { useGeolocation } from "../utils/location_context";

// // const allNotifications = [
// //     { id: 1, message: "لديك رسالة جديده من ضحى", time: "2024-10-04T10:00:00Z" },
// //     {
// //         id: 2,
// //         message: "الطالب/ة بشرى تعذر عن الحضور اليوم.",
// //         time: "2024-10-04T10:05:00Z",
// //     },
// //     {
// //         id: 3,
// //         message: "لديك رسالة من ولي الامر محمد",
// //         time: "2024-10-04T11:00:00Z",
// //     },
// //     { id: 4, message: "تم تسجيل الطالب علي !", time: "2024-10-04T12:00:00Z" },
// // ];

// // const timeFilters = [
// //     { label: "All", value: "all" },
// //     { label: "Last 5 minutes", value: "5" },
// //     { label: "Last hour", value: "60" },
// //     { label: "Last 24 hours", value: "1440" },
// // ];

// // function NotificationCard({ notification }) {
// //     return (
// //         <div className="bg-white shadow-md rounded-lg p-4 mb-4">
// //             <h3 className="text-xl font-bold">{notification.title}</h3>
// //             <p className="text-green-600 font-semibold">
// //                 {notification.message}
// //             </p>
// //             <p className="text-gray-500">
// //                 {new Date(notification.notif_timestamp).toLocaleString()}
// //             </p>
// //             <div className="flex justify-around my-2">
// //                 <button className="border border-green-300 rounded p-2 hover:bg-green-100">
// //                     تعين كمقروة
// //                 </button>
// //                 <button className="border border-red-300 rounded p-2 hover:bg-red-200">
// //                     {" "}
// //                     الغاء
// //                 </button>
// //             </div>
// //         </div>
// //     );
// // }

// // function NotificationPage() {
// //     const [filter, setFilter] = useState("all");

// //     const { notifData } = useGeolocation();

// //     // const filteredNotifications = notifData.filter((notification) => {
// //     //     const notificationTime = new Date(notification.notif_timestamp);
// //     //     const now = new Date();
// //     //     const differenceInMinutes = (now - notificationTime) / (1000 * 60);

// //     //     if (filter === "all") return true; // Show all notifications
// //     //     return differenceInMinutes <= parseInt(filter); // Filter based on selected time
// //     // });
// //     // console.log(notifData)

// //     return (
// //         <div className="min-h-screen bg-green-50 flex flex-col items-center p-6">
// //             <h1 className="text-3xl font-bold text-green-700 mb-6">
// //                 الاشعارات
// //             </h1>
// //             <div className="mb-4 flex">
// //                 <select
// //                     value={filter}
// //                     onChange={(e) => setFilter(e.target.value)}
// //                     className="border border-gray-300 rounded-md p-2"
// //                 >
// //                     {timeFilters.map((option) => (
// //                         <option key={option.value} value={option.value}>
// //                             {option.label}
// //                         </option>
// //                     ))}
// //                 </select>
// //             </div>
// //             <div className="w-full max-w-md">
// //                 {notifData.map((notification, index) => (
// //                     <NotificationCard key={index} notification={notification} />
// //                 ))}
// //             </div>
// //         </div>
// //     );
// // }

// // export default NotificationPage;

// import { useEffect, useState } from "react";
// import { useGeolocation } from "../utils/location_context";

// const timeFilters = [
//     { label: "All", value: "all" },
//     { label: "Last 5 minutes", value: "5" },
//     { label: "Last hour", value: "60" },
//     { label: "Last 24 hours", value: "1440" },
// ];

// function NotificationCard({ notification }) {
//     return (
//         <div className="bg-white shadow-md rounded-lg p-4 mb-4">
//             <h3 className="text-xl font-bold">{notification.title}</h3>
//             <p className="text-green-600 font-semibold">
//                 {notification.message}
//             </p>
//             <p className="text-gray-500">
//                 {new Date(notification.time).toLocaleString()}
//             </p>
//             <div className="flex justify-around my-2">
//                 <button className="border border-green-300 rounded p-2 hover:bg-green-100">
//                     تعين كمقروة
//                 </button>
//                 <button className="border border-red-300 rounded p-2 hover:bg-red-200">
//                     الغاء
//                 </button>
//             </div>
//         </div>
//     );
// }

// function NotificationPage() {
//     const [filter, setFilter] = useState("all");
//     const { notifData } = useGeolocation(); // Assume this provides the notifications data
//     let filteredNotifications = [];

//     useEffect(() => {
//         filteredNotifications = notifData.filter((notification) => {
//             const notificationTime = new Date(notification.time);
//             const now = new Date();
//             const differenceInMinutes = (now - notificationTime) / (1000 * 60);

//             if (filter === "all") return true; // Show all notifications
//             return differenceInMinutes <= parseInt(filter); // Filter based on selected time
//         });
//     }, []);

//     return (
//         <div className="min-h-screen bg-green-50 flex flex-col items-center p-6">
//             <h1 className="text-3xl font-bold text-green-700 mb-6">
//                 الاشعارات
//             </h1>
//             <div className="mb-4 flex">
//                 <select
//                     value={filter}
//                     onChange={(e) => setFilter(e.target.value)}
//                     className="border border-gray-300 rounded-md p-2"
//                 >
//                     {timeFilters.map((option, index) => (
//                         <option key={index} value={option.value}>
//                             {option.label}
//                         </option>
//                     ))}
//                 </select>
//             </div>
//             <div className="w-full max-w-md">
//                 {filteredNotifications.map((notification, index) => (
//                     <NotificationCard key={index} notification={notification} />
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default NotificationPage;

// import { useEffect, useState } from "react";
// import { useGeolocation } from "../utils/location_context";
// import { SystemAxios } from "../utils/custom_axios";
// import getCookie from "../utils/get_cookie";

// const timeFilters = [
//     { label: "All", value: "all" },
//     { label: "Last 5 minutes", value: "5" },
//     { label: "Last hour", value: "60" },
//     { label: "Last 24 hours", value: "1440" },
// ];

// function NotificationCard({ notification }) {
//     console.log(notification.notif_timestamp)
//     return (
//         <div className="bg-white shadow-md rounded-lg p-4 mb-4">
//             <h3 className="text-xl font-bold">{notification.title}</h3>
//             <p className="text-green-600 font-semibold">
//                 {notification.message}
//             </p>
//             <p className="text-gray-500">
//                 {new Date(notification.notif_timestamp).toISOString()}
//             </p>
//             <div className="flex justify-around my-2">
//                 <button className="border border-green-300 rounded p-2 hover:bg-green-100">
//                     تعين كمقروة
//                 </button>
//                 <button className="border border-red-300 rounded p-2 hover:bg-red-200">
//                     الغاء
//                 </button>
//             </div>
//         </div>
//     );
// }

// function NotificationPage() {
//     const [filter, setFilter] = useState("all");
//     const { notifCount } = useGeolocation(); // Assume this provides the notifications data
//     const [filteredNotifications, setFilteredNotifications] = useState([]);
//     const [currentNotifCount, setCurrentNotifCount] = useState(0);
//     const [notifsData, setNotifsData] = useState([]);

//     useEffect(() => {
//         notificationRequest();
//         setCurrentNotifCount(notifCount);
//     }, []);

//     useEffect(() => {
//         const now = new Date();
//         const filtered = notifsData.filter((notification) => {
//             const notificationTime = new Date(notification.notif_timestamp);
//             const differenceInMinutes = (now - notificationTime) / (1000 * 60);

//             if (filter === "all") return true; // Show all notifications
//             return differenceInMinutes <= parseInt(filter); // Filter based on selected time
//         });
//         setFilteredNotifications(filtered);
//         if (currentNotifCount !== notifCount) {
//             console.warn("changed");
//             notificationRequest();
//             setCurrentNotifCount(notifCount);
//         }
//     }, [notifCount, filter]); // Add filter and notifData as dependencies
//     const notificationRequest = async () => {
//         try {
//             const response = await SystemAxios.get(
//                 `/notifications?user=${localStorage.getItem("id")}`,
//                 {
//                     withCredentials: true,
//                     headers: {
//                         "X-CSRFToken": getCookie("csrftoken"),
//                     },
//                 }
//             );
//             // console.log("notif");
//             if (response.status == 200) {
//                 console.log(response.data);
//                 setNotifsData(response.data);
//                 // console.log(response.data);
//                 // console.log(response.data);
//             }
//         } catch (error) {
//             console.error(error.response);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-green-50 flex flex-col items-center p-6">
//             <h1 className="text-3xl font-bold text-green-700 mb-6">
//                 الاشعارات
//             </h1>
//             <div className="mb-4 flex">
//                 <select
//                     value={filter}
//                     onChange={(e) => setFilter(e.target.value)}
//                     className="border border-gray-300 rounded-md p-2"
//                 >
//                     {timeFilters.map((option, index) => (
//                         <option key={index} value={option.value}>
//                             {option.label}
//                         </option>
//                     ))}
//                 </select>
//             </div>
//             <h2>Welcom</h2>
//             <div className="w-full max-w-md">
//                 {notifsData.map((notification) => (
//                     <NotificationCard
//                         key={notification.id}
//                         notification={notification}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default NotificationPage;

import { useEffect, useState } from "react";
import { useGeolocation } from "../utils/location_context";
// import { SystemAxios } from "../utils/custom_axios";
// import getCookie from "../utils/get_cookie";
import NotificationCard from "./widget/notification_card";

const timeFilters = [
    { label: "All", value: "all" },
    { label: "Last 5 minutes", value: "5" },
    { label: "Last hour", value: "60" },
    { label: "Last 24 hours", value: "1440" },
];

function NotificationPage() {
    const [filter, setFilter] = useState("all");
    const { notifCount, notifData } = useGeolocation(); // Assume this provides the notifications count
    const [filteredNotifications, setFilteredNotifications] = useState([]);
    const [count, setCount] = useState(0);

    // const fetchNotifications = async () => {
    //     try {
    //         const response = await SystemAxios.get(
    //             `/notifications?user=${localStorage.getItem("id")}`,
    //             {
    //                 withCredentials: true,
    //                 headers: {
    //                     "X-CSRFToken": getCookie("csrftoken"),
    //                 },
    //             }
    //         );
    //         if (response.status === 200) {
    //             setNotifsData(response.data);
    //         }
    //     } catch (error) {
    //         console.error(error.response);
    //     }
    // };

    const filterData = async () => {
        // console.log(await notifData);
        if (notifCount !== count) {
            const now = new Date();
            const filtered = await notifData.filter((notification) => {
                const notificationTime = new Date(notification.notif_timestamp);
                const differenceInMinutes =
                    (now - notificationTime) / (1000 * 60);
                return (
                    filter === "all" || differenceInMinutes <= parseInt(filter)
                );
            });
            setFilteredNotifications(filtered);
            setCount(notifCount);
        }
    };

    // useEffect(() => {
    //     // setCount(notifCount);
    //     filterData();
    // }, []); // Fetch notifications only once on mount

    useEffect(() => {
        filterData();
    }, [filter, notifCount]); // Update when filter or notifications change

    return (
        <div className="min-h-screen bg-green-50 flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold text-green-700 mb-6">
                الاشعارات
            </h1>
            <div className="mb-4 flex">
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border border-gray-300 rounded-md p-2"
                >
                    {timeFilters.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="w-full max-w-md">
                {filteredNotifications.length > 0 ? (
                    filteredNotifications.map((notification) => (
                        <NotificationCard
                            key={notification.id}
                            notification={notification}
                        />
                    ))
                ) : (
                    <div className="w-full h-full flex justify-center items-center text-red-700 font-bold text-3xl">
                        <p>لا توجد اشعارات</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default NotificationPage;
