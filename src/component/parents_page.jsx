// // import React from 'react'
// import { useState, useEffect } from "react";
// // import axios from 'axios';
// import getCookie from "../data/control/set_cookie";
// // import InputFiled from './widget/input_field';
// import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { AppContext } from "../utils/context";
// import { SystemAxios } from "../utils/custom_axios";
// export default function Parents() {
//     //==== vars=============

import UserTable from "./tables/user_table"

//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [filteredItems, setFilteredItems] = useState([]);
//     const { setSharedVariable } = useContext(AppContext);
//     const navigate = useNavigate();
//     //=======Functions======
//     const handleSearchChange = (event) => {
//         setSearchQuery(event.target.value);
//     };
//     const fetchData = async () => {
//         try {
//             const response = await SystemAxios.get("/users/?type=2", {
//                 withCredentials: true,
//                 headers: {
//                     "X-CSRFToken": getCookie("csrftoken"),
//                 },
//             }); // Replace with your API endpoint
//             if (response.status == 200) {
//                 setData(response.data);
//                 setLoading(false);
//             }   
//         } catch (error) {
//             console.error("Error fetching data:", error);
//             setLoading(false);
//         }
//     };
//     useEffect(() => {
//         fetchData();
//     }, []);
//     if (loading) {
//         return <div>Loading...</div>;
//     }
//     const handleDelete = async (user_Id) => {
//         try {
//             const response = await SystemAxios.delete(
//                 `/users/delete/${user_Id}/`,
//                 {
//                     withCredentials: true,
//                     headers: {
//                         "X-CSRFToken": getCookie("csrftoken"),
//                     },
//                 }
//             ); // Replace with your API endpoint
//             if (response.status == 204) {
//                 alert(`user deleted`);
//                 setData(data.filter((data) => data.id !== user_Id));
//             }
//         } catch (error) {
//             console.error("Error deleting user:", error);
//         }
//     };

//     //========style========
//     const divStyle = {
//         backgroundColor: "#b7e4c7",
//         padding: "20px",
//         borderRadius: "5px",
//     };

//     return (
//         <div
//             dir="rtl"
//             className="md:w-10/12 m-auto p-4 bg- shadow-xl sm:w-full "
//         >
//             <div className="flex  m-auto">
//                 <h1 className="text-2xl font-bold mb-4 px-8 m-auto">
//                     اوليا الامور
//                 </h1>
//                 <button
//                     onClick={() => {
//                         navigate("/RegisterParent");
//                     }}
//                     className="bg-green-500 text-white py-1 px-4 rounded m-auto hover:bg-green-600 mx-4"
//                 >
//                     اضافة ولي امر
//                 </button>
//             </div>
//             <div className="my-3" style={divStyle}>
//                 {/* <div className='w-11/12 text-right flex'>
//                     <InputFiled type='text' placeholder="البحث" value={searchQuery} onChange={handleSearchChange} />
//                 </div> */}
//             </div>
//             <table className=" md:w-full bg-white  rounded">
//                 <thead className="text-center md:w-full sm:w-1/2">
//                     <tr
//                         style={{
//                             backgroundColor: "#40916c",
//                         }}
//                     >
//                         <th className="py-2 px-4 ">الصورة</th>
//                         <th className="py-2 px-4 ">الاسم</th>
//                         <th className="py-2 px-4 ">اللقب</th>
//                         <th className="py-2 px-4 ">الجنسية</th>
//                         <th className="py-2 px-4 ">Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody className="text-center">
//                     {data.map((user) => (
//                         <tr key={user.id} className="hover:bg-gray-100">
//                             <td className="py-2 px-4 ">
//                                 <img
//                                     src={user.photo}
//                                     alt={user.name}
//                                     className="w-12 h-12 rounded-full"
//                                 />
//                             </td>
//                             <td className="py-2 px-4 ">{user.first_name}</td>
//                             <td className="py-2 px-4 ">{user.last_name}</td>
//                             <td className="py-2 px-4 ">{user.nationality}</td>
//                             <td className="py-2 px-4 ">
//                                 <button
//                                     onClick={() => {
//                                         setSharedVariable(user.id);
//                                         navigate("/EditParent");
//                                     }}
//                                     className="bg-blue-500 text-white py-1 px-3 rounded mr-2 hover:bg-blue-600 mx-4"
//                                 >
//                                     تعديل
//                                 </button>

//                                 <button
//                                     onClick={() => handleDelete(user.id)}
//                                     className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
//                                 >
//                                     حذف
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }


const ParentsPage = () => {
    return <UserTable type={2} />
}

export default ParentsPage