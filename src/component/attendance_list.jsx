// import { useEffect, useState} from 'react';
// import { useNavigate } from 'react-router-dom';
// // import { SCHOOL_GRADES } from '../data/static/constants.js';
// import { COOKIE_NAME, SystemAxios } from '../utils/custom_axios.js';
// import getCookie from '../utils/get_cookie.js';

// const AttendanceList = () => {
//     const [attendanceData, setAttendanceData] = useState([]);
//     // const [showDeleteValidation, setShowDeleteValidation] = useState(false);
//     // const [attendanceID, setAttendanceID] = useState(null);
//     const navigate = useNavigate();

//     // const filteredStudents = useMemo(() => {
//     //     return attendanceData.filter(student => {
//     //         const genderMatches = genderFilter === 0 || student.gender === (genderFilter === 1);
//     //         const gradeMatches = gradeFilter === 0 || student.grade === gradeFilter;
//     //         return genderMatches && gradeMatches;
//     //     });
//     // }, [attendanceData, genderFilter, gradeFilter]);

//     const editButtonEventHandler = (id) => {
//         navigate('attendance-form', { state: { id, title: "تعديل بيانات حضور الطالب", isReadOnly: false } });
//     };

//     // const filterChangeHandle = (event) => {
//     //     const { name, value } = event.target;
//     //     if (name === 'gender_filter') {
//     //         setGenderFilter(parseInt(value));
//     //     }
//     //     if (name === 'grade_filter') {
//     //         setGradeFilter(parseInt(value));
//     //     }
//     // };

//     const addButtonEventHandler = () => {
//         navigate('attendance-form', { state: { id: 0, title: "تسجيل حضور الطالب", isReadOnly: false } });
//     };

//     const viewButtonEventHandler = (id) => {
//         navigate('attendance-form', { state: { id, title: "تفاصيل الحضور", isReadOnly: true } });
//     };

//     // const deleteButtonEventHandler = (id) => {
//     //     setAttendanceID(id);
//     //     setShowDeleteValidation(true);
//     // };

//     // const deleteStudentRequest = async () => {
//     //     try {
//     //         const response = await SystemAxios.delete(`/students/delete/${attendanceID}/`, {
//     //             withCredentials: true,
//     //             headers: {
//     //                 "X-CSRFToken": getCookie('csrftoken')
//     //             }
//     //         });
//     //         if (response.status === 204) {
//     //             setAttendanceData(prev => prev.filter(student => student.id !== attendanceID));
//     //             setShowDeleteValidation(false);
//     //             setAttendanceID(null);
//     //         }
//     //     } catch (error) {
//     //         console.error('Error deleting student:', error.response);
//     //         alert('حدث خطأ أثناء حذف الطالب.'); // User feedback for errors
//     //     }
//     // };

//     const requestAttendanceData = async () => {
//         try {
//             const response = await SystemAxios.get('/students/attendance', {
//                 withCredentials: true,
//                 headers: {
//                     COOKIE_HEADER_NAME: getCookie(COOKIE_NAME)
//                 }
//             });
//             if (response.status === 200) {
//                 setAttendanceData(response.data);
//             }
//         } catch (error) {
//             console.error('Error fetching students data:', error);
//             // alert('حدث خطأ أثناء استرجاع بيانات الطلاب.'); // User feedback for errors
//         }
//     };

//     useEffect(() => {
//         requestAttendanceData();
//     }, []);

//     return (
//         <div className="-m-4 p-2 max-w-screen h-screen flex flex-col justify-start items-center">
//             <div className='w-full flex justify-between mb-2'>
//                 <h1 className="text-2xl font-bold">حضور الحافلات</h1>
//                 <button
//                     className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 shadow"
//                     onClick={addButtonEventHandler}
//                 >
//                     تسجيل الحضور
//                 </button>
//             </div>
//             {attendanceData.length === 0 ? (
//                 <h1>لا يوجد اي بيانات</h1>
//             ) : (
//                 <div className='w-full'>
//                     {/* <div className="w-full flex flex-col mb-4 bg-blue-200 rounded shadow-md p-2">
//                         <div className='flex justify-between items-center mb-2'>
//                             <label htmlFor="gender">العرض حسب الجنس</label>
//                             <select
//                                 id="gender"
//                                 name="gender_filter"
//                                 onChange={filterChangeHandle}
//                                 className="border border-gray-400 p-2 rounded bg-inherit w-1/3"
//                             >
//                                 <option value={0}>All</option>
//                                 <option value={1}>ذكر</option>
//                                 <option value={2}>أنثى</option>
//                             </select>
//                         </div>
//                         <div className='flex justify-between items-center'>
//                             <label htmlFor="grade">العرض حسب الصف</label>
//                             <select
//                                 id="grade"
//                                 name="grade_filter"
//                                 onChange={filterChangeHandle}
//                                 className="border border-gray-400 p-2 rounded bg-inherit w-1/3"
//                             >
//                                 <option value={0}>All</option>
//                                 {SCHOOL_GRADES.map((grade, index) => (
//                                     <option key={index + 1} value={index + 1}>
//                                         {grade}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div> */}
//                     {attendanceData.length === 0 ? (
//                         <h1>لا يوجد طلاب حسب الاختيارات التي حددتها</h1>
//                     ) : (
//                         <div className='max-w-full overflow-scroll shadow'>
//                             <table className="w-full bg-white border border-gray-300">
//                                 <thead>
//                                     <tr className="bg-gray-200">
//                                         <th className="py-2 px-4 border">رقم الحافله</th>
//                                         <th className="py-2 px-4 border">اسم الطالب</th>
//                                         <th className="py-2 px-4 border">التاريخ</th>
//                                         <th className="py-2 px-4 border">الفتره</th>
//                                         <th className="py-2 px-4 border">الحضور</th>
//                                         <th className="py-2 px-4 border">الحاله</th>
//                                         <th className="py-2 px-4 border">Actions</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {attendanceData.map(student => (
//                                         <tr key={student.id} className="hover:bg-gray-100">
//                                             <td className="py-2 px-4 border">{attendanceData.bus}</td>
//                                             <td className="py-2 px-4 border">{attendanceData.student}</td>
//                                             <td className="py-2 px-4 border">{attendanceData.check_date}</td>
//                                             <td className="py-2 px-4 border">{attendanceData.shift_type ? 'الصباح' : "المساء"}</td>
//                                             <td className="py-2 px-4 border">{attendanceData.attendance ? 'نعم' : "لا"}</td>
//                                             <td className="py-2 px-4 border">{attendanceData.check_type ? 'صعود' : "نزول"}</td>
//                                             <td className="py-2 px-4 border">
//                                                 <button onClick={() => viewButtonEventHandler(attendanceData.id)} className="bg-yellow-500 text-white py-1 px-3 rounded mr-2 hover:bg-yellow-600">
//                                                     عرض
//                                                 </button>
//                                                 <button onClick={() => editButtonEventHandler(attendanceData.id)} className="bg-blue-500 text-white py-1 px-3 rounded mr-2 hover:bg-blue-600">
//                                                     تعديل
//                                                 </button>
//                                                 {/* <button onClick={() => deleteButtonEventHandler(attendanceData.id)} className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">
//                                                     حذف
//                                                 </button> */}
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                             {/* {showDeleteValidation && (
//                                 <div className='z-10 fixed top-0 left-0 w-screen h-screen bg-black flex justify-center items-center'>
//                                     <div className='bg-white w-4/5 h-2/5 rounded-md flex flex-col justify-between items-center'>
//                                         <h2 className='p-4 text-2xl'>تأكيد الحذف</h2>
//                                         <div className='p-4 text-start'>
//                                             <p>هل أنت متأكد من أنك تريد حذف بيانات هذا الطالب؟</p>
//                                             <p>حالما يتم حذف بيانات هذا الطالب فإنه لن يمكنك أستعادة بياناته بشكل نهائي.</p>
//                                             {attendanceData.find(attendance => attendance.id === attendanceID) && (
//                                                 <div className='mt-2'>
//                                                     <p>اسم الطالب: <strong>{attendanceData.find(attendance => attendance.id === attendanceID).attendance_name}</strong></p>
//                                                     <p>المرحلة الدراسية: <strong>{SCHOOL_GRADES[attendanceData.find(attendance => attendance.id === attendanceID).grade - 1]}</strong></p>
//                                                 </div>
//                                             )}
//                                         </div>
//                                         <div className='flex justify-end m-1'>
//                                             <button className='w-20 bg-red-500 m-1 rounded h-10 font-bold text-white shadow' onClick={deleteStudentRequest}>
//                                                 حذف
//                                             </button>
//                                             <button className='w-20 bg-green-500 m-1 rounded h-10 font-bold text-white shadow' onClick={() => setShowDeleteValidation(false)}>
//                                                 الغاء
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             )} */}
//                         </div>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AttendanceList;

// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { SystemAxios } from "../utils/custom_axios.js";
// import getCookie from "../utils/get_cookie.js";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faListCheck, faCamera } from "@fortawesome/free-solid-svg-icons";

// const AttendanceList = () => {
//     const [attendanceData, setAttendanceData] = useState([]);
//     const [loading, setLoading] = useState(true); // Loading state
//     const [requerURL, setRequestURL] = useState("");
//     const navigate = useNavigate();

//     const handleEditButtonClick = (id) => {
//         navigate("attendance-form", {
//             state: { id, title: "تعديل بيانات حضور الطالب", isReadOnly: false },
//         });
//     };

//     const handleAddButtonClick = (event) => {
//         event.preventDefault();
//         navigate("attendance-form", {
//             state: {
//                 id: 0,
//                 bus_id: 1,
//                 title: "تسجيل حضور الطالب",
//                 isReadOnly: false,
//             },
//         });
//     };

//     const handleViewButtonClick = (id) => {
//         navigate("attendance-form", {
//             state: { id, title: "تفاصيل الحضور", isReadOnly: true },
//         });
//     };

//     const fetchAttendanceData = async () => {
//         setLoading(true); // Start loading
//         try {
//             const response = await SystemAxios.get(
//                 requerURL,
//                 {},
//                 {
//                     withCredentials: true,
//                     headers: {
//                         "X-CSRFToken": getCookie("csrftoken"),
//                     },
//                 }
//             );
//             if (response.status === 200) {
//                 setAttendanceData(response.data);
//             }
//         } catch (error) {
//             console.error("Error fetching attendance data:", error);
//             alert("حدث خطأ أثناء استرجاع بيانات الطلاب."); // User feedback for errors
//         } finally {
//             setLoading(false); // End loading
//         }
//     };
//     const getRequestURL = () => {
//         if (localStorage.getItem("is_superuser") == "true") {
//             setRequestURL(() => "/students/attendance");
//         }
//         //  else if (localStorage.getItem("is_staff") == "true") {
//         //     setRequestURL(
//         //         `/students/attendance?user=${parseInt(
//         //             localStorage.getItem("id")
//         //         )}`
//         //     );
//         // }
//         else {
//             let userType =
//                 localStorage.getItem("is_staff") == "true"
//                     ? "supervisor"
//                     : "parent";
//             setRequestURL(
//                 () =>
//                     `/students/attendance?${userType}=${parseInt(
//                         localStorage.getItem("id")
//                     )}`
//             );
//         }
//     };

//     useEffect(() => {
//         getRequestURL();
//         fetchAttendanceData();
//     }, []);

//     return (
//         <div className="-m-4 p-2 max-w-screen h-screen flex flex-col justify-start items-center">
//             <div className="w-full flex justify-between mb-2">
//                 <h1 className="text-2xl font-bold">حضور الحافلات</h1>
//                 <div>
//                     <button
//                         className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 shadow"
//                         onClick={handleAddButtonClick}
//                     >
//                         <FontAwesomeIcon icon={faListCheck} scale={3} />
//                     </button>
//                     <Link
//                         to="attendance-camera"
//                         className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 shadow"
//                     >
//                         <FontAwesomeIcon icon={faCamera} scale={3} />
//                     </Link>
//                 </div>
//             </div>
//             {loading ? (
//                 <h1>جاري تحميل البيانات...</h1> // Loading message
//             ) : attendanceData.length === 0 ? (
//                 <h1>لا يوجد اي بيانات</h1>
//             ) : (
//                 <div className="w-full">
//                     <div className="max-w-full overflow-scroll shadow">
//                         <table className="w-full bg-white border border-gray-300">
//                             <thead>
//                                 <tr className="bg-gray-200">
//                                     <th className="py-2 px-4 border">
//                                         رقم الحافله
//                                     </th>
//                                     <th className="py-2 px-4 border">
//                                         اسم الطالب
//                                     </th>
//                                     <th className="py-2 px-4 border">
//                                         التاريخ
//                                     </th>
//                                     <th className="py-2 px-4 border">الحضور</th>
//                                     <th className="py-2 px-4 border">الفتره</th>
//                                     <th className="py-2 px-4 border">الحاله</th>
//                                     <th className="py-2 px-4 border"></th>
//                                     <th className="py-2 px-4 border"></th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {attendanceData.map((attendance) => (
//                                     <tr
//                                         key={attendance.id}
//                                         className="hover:bg-gray-100"
//                                     >
//                                         <td className="py-2 px-4 border">
//                                             {attendance.bus_number}
//                                         </td>
//                                         <td className="py-2 px-4 border">
//                                             {attendance.student_name}
//                                         </td>
//                                         <td className="py-2 px-4 border">
//                                             {attendance.check_date}
//                                         </td>
//                                         <td className="py-2 px-4 border">
//                                             {attendance.attendance
//                                                 ? "نعم"
//                                                 : "لا"}
//                                         </td>
//                                         <td className="py-2 px-4 border">
//                                             {attendance.shift_type
//                                                 ? "الصباح"
//                                                 : "المساء"}
//                                         </td>
//                                         <td className="py-2 px-4 border">
//                                             {attendance.check_type
//                                                 ? "صعود"
//                                                 : "نزول"}
//                                         </td>
//                                         <td className="py-2 px-4 border">
//                                             <button
//                                                 onClick={() =>
//                                                     handleViewButtonClick(
//                                                         attendance.id
//                                                     )
//                                                 }
//                                                 className="bg-yellow-500 text-white py-1 px-3 rounded mr-2 hover:bg-yellow-600"
//                                             >
//                                                 عرض
//                                             </button>
//                                         </td>
//                                         <td>
//                                             <button
//                                                 onClick={() =>
//                                                     handleEditButtonClick(
//                                                         attendance.id
//                                                     )
//                                                 }
//                                                 className="bg-blue-500 text-white py-1 px-3 rounded mr-2 hover:bg-blue-600"
//                                             >
//                                                 تعديل
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AttendanceList;

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SystemAxios } from "../utils/custom_axios.js";
import getCookie from "../utils/get_cookie.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck, faCamera } from "@fortawesome/free-solid-svg-icons";

const AttendanceList = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleEditButtonClick = (event, id) => {
        event.preventDefault();
        navigate("attendance-form", {
            state: {
                id: id,
                title: "تعديل بيانات حضور الطالب",
                isReadOnly: false,
            },
        });
    };

    const handleAddButtonClick = (event) => {
        event.preventDefault();
        navigate("attendance-form", {
            state: {
                id: 0,
                title: "تسجيل حضور الطالب",
                isReadOnly: false,
            },
        });
    };

    const handleViewButtonClick = (event, id) => {
        event.preventDefault();
        navigate("attendance-form", {
            state: {
                id: id,
                bus_id: 1,
                title: "تفاصيل الحضور",
                isReadOnly: true,
            },
        });
    };

    const fetchAttendanceData = async () => {
        setLoading(true);
        const requestURL = getRequestURL();
        try {
            const response = await SystemAxios.get(requestURL, {
                withCredentials: true,
                headers: {
                    "X-CSRFToken": getCookie("csrftoken"),
                },
            });
            if (response.status === 200) {
                setAttendanceData(response.data);
                // setAttendanceData(attendanceData.reverse());
            }
        } catch (error) {
            console.error("Error fetching attendance data:", error);
            // Consider using an error message in the UI instead of alert
            setAttendanceData([]); // Handle error gracefully
        } finally {
            setLoading(false);
        }
    };

    const getRequestURL = () => {
        const userId = parseInt(localStorage.getItem("id"));
        if (localStorage.getItem("is_superuser") == "true") {
            return "/students/attendance";
        } else {
            const userType =
                localStorage.getItem("is_staff") == "true"
                    ? "supervisor"
                    : "parent";
            return `/students/attendance?${userType}=${userId}`.toString();
        }
    };

    useEffect(() => {
        // getRequestURL();
        fetchAttendanceData();
    }, []); // Re-fetch when requestURL changes

    return (
        <div className="w-screen h-screen p-2">
            {localStorage.getItem("is_staff") == "true" ? (
                <div className="w-full flex justify-between p-4">
                    <h1 className="text-2xl font-bold">حضور الحافلات</h1>
                    <div>
                        <button
                            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 shadow"
                            onClick={handleAddButtonClick}
                        >
                            <FontAwesomeIcon icon={faListCheck} scale={3} />
                        </button>
                        <Link
                            to="attendance-camera"
                            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 shadow"
                        >
                            <FontAwesomeIcon icon={faCamera} scale={3} />
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="w-full flex justify-center p-4">
                    <h1 className="text-3xl font-bold text-emerald-600">
                        تقارير الحافلات
                    </h1>
                </div>
            )}

            {loading ? (
                <h1>جاري تحميل البيانات...</h1>
            ) : attendanceData.length === 0 ? (
                <div className="max-w-full h-2/3 flex justify-center items-center">
                    <h1 className="text-4xl font-bold">لا يوجد اي بيانات</h1>
                </div>
            ) : (
                <div className="w-full">
                    <div className="w-full overflow-scroll">
                        <table className="w-full bg-white border border-gray-300 text-center">
                            <thead className="sticky">
                                <tr className="bg-gray-200">
                                    <th className="py-2 px-4 border">
                                        رقم الحافله
                                    </th>
                                    <th className="py-2 px-4 border">
                                        اسم الطالب
                                    </th>
                                    <th className="py-2 px-4 border">
                                        التاريخ
                                    </th>
                                    <th className="py-2 px-4 border">الحضور</th>
                                    <th className="py-2 px-4 border">الفتره</th>
                                    <th className="py-2 px-4 border">الحاله</th>
                                    <th className="py-2 px-4 border"></th>
                                    {localStorage.getItem("is_staff") ===
                                    "true" ? (
                                        <th className="py-2 px-4 border"></th>
                                    ) : (
                                        <></>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {attendanceData.map((attendance) => (
                                    <tr
                                        key={attendance.id}
                                        className="hover:bg-gray-100"
                                    >
                                        <td className="py-2 px-4 border">
                                            {attendance.bus_number}
                                        </td>
                                        <td className="py-2 px-4 border">
                                            {attendance.student_name}
                                        </td>
                                        <td className="py-2 px-4 border">
                                            {attendance.check_date}
                                        </td>
                                        <td className="py-2 px-4 border">
                                            {attendance.attendance
                                                ? "نعم"
                                                : "لا"}
                                        </td>
                                        <td className="py-2 px-4 border">
                                            {attendance.shift_type
                                                ? "الصباح"
                                                : "المساء"}
                                        </td>
                                        <td className="py-2 px-4 border">
                                            {attendance.check_type
                                                ? "صعود"
                                                : "نزول"}
                                        </td>
                                        <td className="py-2 px-4 border">
                                            <button
                                                onClick={(event) =>
                                                    handleViewButtonClick(
                                                        event,
                                                        attendance.id
                                                    )
                                                }
                                                className="bg-blue-500 text-white py-1 px-3 rounded mr-2 hover:bg-yellow-600"
                                            >
                                                عرض
                                            </button>
                                        </td>
                                        {localStorage.getItem("is_staff") ===
                                        "true" ? (
                                            <td className="py-2 px-4 border">
                                                <button
                                                    onClick={(event) =>
                                                        handleEditButtonClick(
                                                            event,
                                                            attendance.id
                                                        )
                                                    }
                                                    className="bg-yellow-500 text-white py-1 px-3 rounded mr-2 hover:bg-blue-600"
                                                >
                                                    تعديل
                                                </button>
                                            </td>
                                        ) : (
                                            <></>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AttendanceList;
