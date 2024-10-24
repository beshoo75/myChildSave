// // import { useEffect, useState } from "react";
// // import { SystemAxios } from "../utils/custom_axios";
// // import getCookie from "../utils/get_cookie";
// // import { useNavigate } from "react-router-dom";

// // const ChatContacts = () => {
// //     const [contacts, setContacts] = useState([]);
// //     const navigate = useNavigate();

// //     const getContacts = async () => {
// //         try {
// //             const response = await SystemAxios.get("/users/users-contacts", {
// //                 withCredentials: true,
// //                 headers: {
// //                     "X-CSRFToken": getCookie("csrftoken"),
// //                 },
// //             });

// //             if (response.status === 200) {
// //                 setContacts(response.data); // Directly set the contacts data
// //             }
// //         } catch (error) {
// //             console.error(error.response);
// //         }
// //     };

// //     useEffect(() => {
// //         getContacts();
// //     }, []);

// //     const generateRoomName = (contact) => {
// //         // console.log('contact', contact)
// //         let roomName = "";
// //         if (contact.is_superuser == false && contact.is_staff == false) {
// //             roomName = `${contact.username}_${localStorage.getItem(
// //                 "username"
// //             )}`;
// //         } else if (contact.is_superuser == true) {
// //             roomName = `${localStorage.getItem("username")}_${
// //                 contact.username
// //             }`;
// //         } else {
// //             roomName =
// //                 contact.is_superuser == true
// //                     ? (roomName = `${localStorage.getItem("username")}_${
// //                           contact.username
// //                       }`)
// //                     : (roomName = `${contact.username}_${localStorage.getItem(
// //                           "username"
// //                       )}`);
// //         }
// //         return roomName;
// //     };

// //     const handleUserButtonClick = (event, contact) => {
// //         event.preventDefault();
// //         navigate("ChatApp", {
// //             state: {
// //                 roomName: generateRoomName(contact),
// //                 contact: [contact.username, contact.first_name, contact.last_name],
// //             },
// //         });
// //         // console.log(generateRoomName(contact))
// //     };

// //     return (
// //         <div className="m-auto w-1/2 p-4 shadow-lg shadow-green-200">
// //             <h2 className="text-lg bg-green-50 w-1/2 m-auto mb-2 p-3 ">
// //                 الاشخاص
// //             </h2>
// //             <ul className="">
// //                 {contacts.map((contact, index) =>
// //                     contact.username != localStorage.getItem("username") ? (
// //                         <li
// //                             className="text-center text-lg text-green-500 border shadow shadow-green-200 cursor-pointer hover:bg-green-100 rounded-md w-1/2 m-auto p-2 mb-2 "
// //                             key={index}
// //                         >
// //                             <button
// //                                 onClick={(e) =>
// //                                     handleUserButtonClick(e, contact)
// //                                 }
// //                             >
// //                                 {contact.username}
// //                             </button>
// //                         </li> // Adjust based on the structure of your contact data
// //                     ) : (
// //                         <></>
// //                     )
// //                 )}
// //             </ul>
// //         </div>
// //     );
// // };

// // export default ChatContacts;

// import { useEffect, useState } from "react";
// import { SystemAxios } from "../utils/custom_axios";
// import getCookie from "../utils/get_cookie";
// import { useNavigate } from "react-router-dom";

// const ChatContacts = () => {
//     const [contacts, setContacts] = useState([]);
//     const navigate = useNavigate();

//     const getContacts = async () => {
//         try {
//             const response = await SystemAxios.get("/users/users-contacts", {
//                 withCredentials: true,
//                 headers: {
//                     "X-CSRFToken": getCookie("csrftoken"),
//                 },
//             });

//             if (response.status === 200) {
//                 setContacts(response.data); // Directly set the contacts data
//             }
//         } catch (error) {
//             console.error(error.response);
//         }
//     };

//     useEffect(() => {
//         getContacts();
//     }, []);

//     const generateRoomName = (contact) => {
//         let roomName = "";
//         if (contact.is_superuser === false && contact.is_staff === false) {
//             roomName = `${contact.username}_${localStorage.getItem("username")}`;
//         } else if (contact.is_superuser === true) {
//             roomName = `${localStorage.getItem("username")}_${contact.username}`;
//         } else {
//             roomName = `${contact.username}_${localStorage.getItem("username")}`;
//         }
//         return roomName;
//     };

//     const handleUserButtonClick = (event, contact) => {
//         event.preventDefault();
//         navigate("ChatApp", {
//             state: {
//                 roomName: generateRoomName(contact),
//                 contact: [contact.username, contact.first_name, contact.last_name],
//             },
//         });
//     };

//     return (
//         <div className="m-auto w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
//             <h2 className="text-xl font-semibold text-green-600 bg-green-50 p-4 rounded-md mb-4 text-center">
//                 الاشخاص
//             </h2>
//             <ul className="">
//                 {contacts.map((contact, index) =>
//                     contact.username !== localStorage.getItem("username") ? (
//                         <li
//                             className="text-center text-lg text-green-600 border border-green-200 rounded-md cursor-pointer transition duration-200 transform hover:bg-green-100 hover:scale-105 w-full p-3 mb-2"
//                             key={index}
//                         >
//                             <button
//                                 onClick={(e) => handleUserButtonClick(e, contact)}
//                                 className="w-full"
//                             >
//                                 {contact.username}
//                             </button>
//                         </li>
//                     ) : null
//                 )}
//             </ul>
//         </div>
//     );
// };

// export default ChatContacts;

import { useEffect, useState } from "react";
import { SystemAxios } from "../utils/custom_axios";
import getCookie from "../utils/get_cookie";
import { useNavigate } from "react-router-dom";
import generateRoomName from "../utils/generate_roomname";

const ChatContacts = () => {
    const [contacts, setContacts] = useState([]);
    const navigate = useNavigate();

    const getContacts = async () => {
        try {
            const response = await SystemAxios.get("/users/users-contacts", {
                withCredentials: true,
                headers: {
                    "X-CSRFToken": getCookie("csrftoken"),
                },
            });

            if (response.status === 200) {
                setContacts(response.data);
            }
        } catch (error) {
            console.error(error.response);
        }
    };

    useEffect(() => {
        getContacts();
    }, []);

    // const generateRoomName = (contact) => {
    //     return `${localStorage.getItem("username")}_${contact.username}`;
    // };

    const handleUserButtonClick = (event, contact) => {
        event.preventDefault();
        navigate("ChatApp", {
            state: {
                roomName: generateRoomName(contact),
                contact: [
                    contact.username,
                    contact.first_name,
                    contact.last_name,
                ],
            },
        });
    };

    const categorizeUsers = (contacts) => {
        const adminUsers = contacts.filter((contact) => contact.is_superuser);
        const supervisorUsers = contacts.filter((contact) => contact.is_staff);
        const parentUsers = contacts.filter(
            (contact) => !contact.is_superuser && !contact.is_staff
        );
        return { adminUsers, supervisorUsers, parentUsers };
    };

    const { adminUsers, supervisorUsers, parentUsers } =
        categorizeUsers(contacts);

    return (
        <div className="m-auto w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center text-green-600 mb-6">
                جهات الاتصال
            </h2>
            {localStorage.getItem("is_superuser") == "false" ? (
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-green-700 mb-2">
                        Admins
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {adminUsers.map((contact, index) => (
                            <div
                                className="bg-green-50 border border-green-200 rounded-lg p-4 shadow hover:bg-green-100 transition"
                                key={index}
                            >
                                <button
                                    onClick={(e) =>
                                        handleUserButtonClick(e, contact)
                                    }
                                    className="text-lg text-green-600 w-full"
                                >
                                    {contact.username}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <></>
            )}
            {localStorage.getItem("is_staff") == "false" ? (
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-green-700 mb-2">
                        Supervisors
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {supervisorUsers.map((contact, index) => (
                            <div
                                className="bg-green-50 border border-green-200 rounded-lg p-4 shadow hover:bg-green-100 transition"
                                key={index}
                            >
                                <button
                                    onClick={(e) =>
                                        handleUserButtonClick(e, contact)
                                    }
                                    className="text-lg text-green-600 w-full"
                                >
                                    {contact.username}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <></>
            )}
            {localStorage.getItem("is_superuser") == "true" ||
            localStorage.getItem("is_staff") == "true" ? (
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-green-700 mb-2">
                        Parents
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {parentUsers.map((contact, index) => (
                            <div
                                className="bg-green-50 border border-green-200 rounded-lg p-4 shadow hover:bg-green-100 transition"
                                key={index}
                            >
                                <button
                                    onClick={(e) =>
                                        handleUserButtonClick(e, contact)
                                    }
                                    className="text-lg text-green-600 w-full"
                                >
                                    {contact.username}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <></>
            )}

            {/* <div className="mb-6">
                <h3 className="text-xl font-bold text-blue-700 mb-2">
                    Supervisors
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {supervisorUsers.map((contact, index) => (
                        <div
                            className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow hover:bg-blue-100 transition"
                            key={index}
                        >
                            <button
                                onClick={(e) =>
                                    handleUserButtonClick(e, contact)
                                }
                                className="text-lg text-blue-600 w-full"
                            >
                                {contact.username}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <h3 className="text-xl font-bold text-purple-700 mb-2">
                    Parents
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {parentUsers.map((contact, index) => (
                        <div
                            className="bg-purple-50 border border-purple-200 rounded-lg p-4 shadow hover:bg-purple-100 transition"
                            key={index}
                        >
                            <button
                                onClick={(e) =>
                                    handleUserButtonClick(e, contact)
                                }
                                className="text-lg text-purple-600 w-full"
                            >
                                {contact.username}
                            </button>
                        </div>
                    ))}
                </div>
            </div> */}
        </div>
    );
};

export default ChatContacts;
