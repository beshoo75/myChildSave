// // import React, { useState, useEffect } from 'react';
// // // import usersData from '../data/static/userData.jsx'; // Import your user data
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// // import getCookie from '../data/control/setCookie.jsx';
// // import { AppContext } from "../utils/context";
// // import { useContext } from 'react';
// // const ListSupervisor = () => {
// //     const navigate = useNavigate();

import UserTable from "./tables/user_table"

// //     const [data, setData] = useState([]);
// //     const [loading, setLoading] = useState(true);
// //     const handleDelete = async (user_Id) => {
// //         try {
// //             const respons = await axios.delete(`http://localhost:8000/users/delete/${user_Id}/`, {
// //                 withCredentials: true,
// //                 headers: {
// //                     'X-CSRFToken': getCookie('csrftoken'),
// //                 },
// //             }); // Replace with your API endpoint
// //             alert(`user deleted`);
// //             setData(data.filter(data => data.id !== user_Id));
// //         } catch (error) {
// //             console.error('Error deleting user:', error);

// //         }
// //     };

// //     // const handleEdit = (id) => {
// //     //     // Logic for editing a user can be implemented here
// //     //     alert(`Edit user with ID: ${id}`);
// //     // };
// //     useEffect(() => {
// //         const fetchData = async () => {
// //             try {

// //                 const response = await axios.get('http://localhost:8000/users?type=1', {},{
// //                     withCredentials: true,
// //                     headers: {
// //                         'X-CSRFToken': getCookie('csrftoken'),
// //                     },
// //                 }) // Replace with your API endpoint
// //                 setData(response.data);
// //                 setLoading(false);

// //             } catch (error) {
// //                 console.error('Error fetching data:', error);
// //                 setLoading(false);
// //             }
// //         };

// //         fetchData();
// //     }, []);

// //     if (loading) {
// //         return <div>Loading...</div>;
// //     }
// //     const { setSharedVariable } = useContext(AppContext);
// //     return (
// //         <div dir='rtl' className="p-4 bg- shadow-xl min-h-screen">
// //             <div className='flex  m-auto w-'>
// //                 <h1 className="text-2xl font-bold mb-4 px-8 m-auto">المشرفين</h1>
// //                 <button onClick={() => { navigate('/RegisterSuper') }} className="bg-green-500 text-white py-1 px-4 rounded m-auto hover:bg-green-600 mx-4">
// //                     اضافة مشرف
// //                 </button>
// //             </div>
// //             <table className="min-w-full bg-white border border-gray-300">
// //                 <thead>
// //                     <tr className="bg-gray-200">
// //                         <th className="py-2 px-4 border">الصورة</th>
// //                         <th className="py-2 px-4 border">الاسم</th>
// //                         <th className="py-2 px-4 border">اللقب</th>
// //                         <th className="py-2 px-4 border">الجنسية</th>
// //                         <th className="py-2 px-4 border">Actions</th>
// //                     </tr>
// //                 </thead>
// //                 <tbody>
// //                     {data.map(user => (
// //                         <tr key={user.id} className="hover:bg-gray-100">
// //                             <td className="py-2 px-4 border">
// //                                 <img src={user.photo} alt={user.name} className="w-12 h-12 rounded-full" />
// //                             </td>
// //                             <td className="py-2 px-4 border">{user.first_name}</td>
// //                             <td className="py-2 px-4 border">{user.last_name}</td>
// //                             <td className="py-2 px-4 border">{user.nationality}</td>
// //                             <td className="py-2 px-4 border">
// //                                 <button
// //                                     onClick={() => navigate('/ChatApp')}
// //                                     className="border-2 border-yellow-300 text-black py-1 px-3 rounded mr-2 hover:bg-yellow-600 mx-4"
// //                                 >
// //                                     تحدث
// //                                 </button>
// //                                 <button
// //                                     onClick={() => {
// //                                         setSharedVariable(user.id);
// //                                         navigate('/EditSuper')
// //                                     }}
// //                                     className="bg-blue-500 text-white py-1 px-3 rounded mr-2 hover:bg-blue-600 mx-4"
// //                                 >
// //                                     تعديل
// //                                 </button>

// //                                 <button
// //                                     onClick={() => handleDelete(user.id)}
// //                                     className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
// //                                 >
// //                                     حذف
// //                                 </button>
// //                             </td>
// //                         </tr>
// //                     ))}
// //                 </tbody>
// //             </table>
// //         </div>
// //     );

// // }
// // export default ListSupervisor;

// // import { useState, useEffect, useContext, useCallback } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// // import getCookie from '../data/control/set_cookie.jsx';
// // import { AppContext } from "../utils/context.jsx";

// // const ListSupervisor = () => {
// //     const navigate = useNavigate();
// //     const [data, setData] = useState([]);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState(null);
// //     const { setSharedVariable } = useContext(AppContext);

// //     const handleDelete = useCallback(async (user_Id) => {
// //         try {
// //             await axios.delete(`http://localhost:8000/users/delete/${user_Id}/`, {
// //                 withCredentials: true,
// //                 headers: {
// //                     'X-CSRFToken': getCookie('csrftoken'),
// //                 },
// //             });
// //             alert(`User deleted`);
// //             setData(prevData => prevData.filter(user => user.id !== user_Id));
// //         } catch (error) {
// //             setError('Error deleting user. Please try again.');
// //             console.error('Error deleting user:', error);
// //         }
// //     }, []);

// //     useEffect(() => {
// //         const fetchData = async () => {
// //             try {
// //                 const response = await axios.get('http://localhost:8000/users?type=1', {
// //                     withCredentials: true,
// //                     headers: {
// //                         'X-CSRFToken': getCookie('csrftoken'),
// //                     },
// //                 });
// //                 setData(response.data);
// //             } catch (error) {
// //                 setError('Error fetching data. Please try again later.');
// //                 console.error('Error fetching data:', error);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };

// //         fetchData();
// //     }, []);

// //     if (loading) {
// //         return <div>Loading...</div>;
// //     }

// //     return (
// //         <div dir='rtl' className="p-4 shadow-xl w-auto m-auto">
// //             {error && <div className="text-red-500">{error}</div>}
// //             <div className='flex justify-between w-auto m-auto mb-3'>
// //                 <h1 className="text-2xl font-bold mb-4 px-8">المشرفين</h1>
// //                 <button onClick={() => navigate('/RegisterSuper')} className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600 mx-4">
// //                     اضافة مشرف
// //                 </button>
// //             </div>
// //             <table className="min-w-full bg-white border border-gray-300">
// //                 <thead>
// //                     <tr className="bg-gray-200">
// //                         <th className="py-2 px-4 border">الصورة</th>
// //                         <th className="py-2 px-4 border">الاسم</th>
// //                         <th className="py-2 px-4 border">اللقب</th>
// //                         <th className="py-2 px-4 border">الجنسية</th>
// //                         <th className="py-2 px-4 border">Actions</th>
// //                     </tr>
// //                 </thead>
// //                 <tbody>
// //                     {data.map(user => (
// //                         <tr key={user.id} className="hover:bg-gray-100">
// //                             <td className="py-2 px-4">
// //                                 <img src={user.photo} alt={user.name} className="w-12 h-12 rounded-full" />
// //                             </td>
// //                             <td className="py-2 px-4">{user.first_name}</td>
// //                             <td className="py-2 px-4">{user.last_name}</td>
// //                             <td className="py-2 px-4">{user.nationality}</td>
// //                             <td className="py-2 px-4">
// //                                 <button
// //                                     onClick={() => navigate('/ChatApp')}
// //                                     className="border-2 border-yellow-300 text-black py-1 px-3 rounded mr-2 hover:bg-yellow-600"
// //                                     aria-label={`Chat with ${user.first_name}`}
// //                                 >
// //                                     تحدث
// //                                 </button>
// //                                 <button
// //                                     onClick={() => {
// //                                         setSharedVariable(user.id);
// //                                         navigate('/EditSuper');
// //                                     }}
// //                                     className="bg-blue-500 text-white py-1 px-3 rounded mr-2 hover:bg-blue-600"
// //                                     aria-label={`Edit ${user.first_name}`}
// //                                 >
// //                                     تعديل
// //                                 </button>
// //                                 <button
// //                                     onClick={() => handleDelete(user.id)}
// //                                     className="bg-red-500 text-white py-1 px-3 mr-3 rounded hover:bg-red-600"
// //                                     aria-label={`Delete ${user.first_name}`}
// //                                 >
// //                                     حذف
// //                                 </button>
// //                             </td>
// //                         </tr>
// //                     ))}
// //                 </tbody>
// //             </table>
// //         </div>
// //     );
// // };

// // export default ListSupervisor;

// import { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import getCookie from "../data/control/set_cookie.jsx";
// // import { AppContext } from "../utils/context.jsx";
// import { SystemAxios } from "../utils/custom_axios.js";
// import { httpToHttps } from "../utils/converters.jsx";

// const SuperVisorPage = () => {
//     const navigate = useNavigate();
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     // const [error, setError] = useState(null);
//     // const { setSharedVariable } = useContext(AppContext);

//     const handleDeleteButtonEvent = useCallback(async (e, user_Id) => {
//         e.preventDefault();
//         try {
//             const response = await SystemAxios.delete(
//                 `/users/delete/${user_Id}/`,
//                 {
//                     withCredentials: true,
//                     headers: {
//                         "X-CSRFToken": getCookie("csrftoken"),
//                     },
//                 }
//             );
//             if (response.status == 204) {
//                 alert(`User deleted`);
//                 setData((prevData) =>
//                     prevData.filter((user) => user.id !== user_Id)
//                 );
//             }
//         } catch (error) {
//             console.error("Error deleting user. Please try again.");
//             console.error("Error deleting user:", error);
//         }
//     }, []);

//     const fetchData = async () => {
//         try {
//             const response = await SystemAxios.get("/users?type=1", {
//                 withCredentials: true,
//                 headers: {
//                     "X-CSRFToken": getCookie("csrftoken"),
//                 },
//             });
//             if (response.status == 200) {
//                 setData(response.data);
//             }
//         } catch (error) {
//             console.error("Error fetching data. Please try again later.");
//             console.error("Error fetching data:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const handleAddButtonEvent = (event) => {
//         event.preventDefault();
//         navigate("/RegisterSuper", {
//             state: {
//                 id: 0,
//                 staff: true,
//                 readOnly: false,
//             },
//         });
//     };

//     const handleEditButtonEvent = (event, id) => {
//         event.preventDefault();
//         navigate("/RegisterSuper", {
//             state: {
//                 id: id,
//                 staff: true,
//                 readOnly: false,
//             },
//         });
//     };

//     const handleViewButtonEvent = (event, id) => {
//         event.preventDefault();
//         navigate("/RegisterSuper", {
//             state: {
//                 id: id,
//                 staff: true,
//                 readOnly: true,
//             },
//         });
//     };

//     if (loading) {
//         return <div className="text-center p-4">Loading...</div>;
//     }

//     return (
//         <div className="p-4 shadow-xl w-11/12 m-auto">
//             {/* {error && <div className="text-red-500 text-center">{error}</div>} */}
//             <div className="flex justify-between items-center mb-4">
//                 <h1 className="text-2xl font-bold">المشرفين</h1>
//                 <button
//                     onClick={handleAddButtonEvent}
//                     className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
//                 >
//                     اضافة مشرف
//                 </button>
//             </div>
//             <div className="w-full overflow-auto">
//                 <table className="w-full m-auto min-w-fullbg-white border border-gray-300">
//                     <thead className=" bg-gray-200">
//                         <tr>
//                             <th className="py-2 px-4 border">الصورة</th>
//                             <th className="py-2 px-4 border">الاسم</th>
//                             <th className="py-2 px-4 border">اللقب</th>
//                             <th className="py-2 px-4 border">الجنسية</th>
//                             <th className="py-2 px-4 border"></th>
//                             <th className="py-2 px-4 border"></th>
//                             <th className="py-2 px-4 border"></th>
//                         </tr>
//                     </thead>
//                     <tbody className="text-center ">
//                         {data.map((user) => (
//                             <tr
//                                 key={user.id}
//                                 className="hover:bg-gray-100 transition"
//                             >
//                                 <td className="py-2 px-4">
//                                     <img
//                                         alt={user.username}
//                                         src={httpToHttps(user.photo)}
//                                         // src={user.photo}
//                                         className="w-12 h-12 rounded-full"
//                                     />
//                                 </td>
//                                 <td className="py-2 px-4">{user.first_name}</td>
//                                 <td className="py-2 px-4">{user.last_name}</td>
//                                 <td className="py-2 px-4">
//                                     {user.nationality}
//                                 </td>
//                                 <td className="">
//                                     <button
//                                         onClick={(e) =>
//                                             handleViewButtonEvent(e, user.id)
//                                         }
//                                         className="transitionborder-2 border-yellow-300 text-black py-1 px-3 rounded hover:bg-yellow-600 hover:text-white transition"
//                                         aria-label={`Chat with ${user.first_name}`}
//                                     >
//                                         تفاصيل
//                                     </button>
//                                 </td>
//                                 <td>
//                                     <button
//                                         onClick={(e) =>
//                                             handleEditButtonEvent(e, user.id)
//                                         }
//                                         className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition"
//                                         aria-label={`Edit ${user.first_name}`}
//                                     >
//                                         تعديل
//                                     </button>
//                                 </td>
//                                 <td>
//                                     <button
//                                         onClick={(e) =>
//                                             handleDeleteButtonEvent(e, user.id)
//                                         }
//                                         className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
//                                         aria-label={`Delete ${user.first_name}`}
//                                     >
//                                         حذف
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default SuperVisorPage;


const SupervisorPage = () => {
    return (
        <UserTable type={1} />
    )
}

export default SupervisorPage