// import { useEffect, useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { SCHOOL_GRADES } from "../data/static/constants.js";
// import { COOKIE_NAME, SystemAxios } from "../utils/custom_axios.js";
// import getCookie from "../utils/get_cookie.js";
// import { httpToHttps } from "../utils/converters.jsx";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAdd, faEdit, faInfoCircle, faTrash } from "@fortawesome/free-solid-svg-icons";

// const StudentsPage = () => {
//     const [studentsData, setStudentsData] = useState([]);
//     const [genderFilter, setGenderFilter] = useState(0);
//     const [gradeFilter, setGradeFilter] = useState(0);
//     const [showDeleteValidation, setShowDeleteValidation] = useState(false);
//     const [studentID, setStudentID] = useState(null);
//     const navigate = useNavigate();

//     const filteredStudents = useMemo(() => {
//         return studentsData.filter((student) => {
//             const genderMatches =
//                 genderFilter === 0 || student.gender === (genderFilter === 1);
//             const gradeMatches =
//                 gradeFilter === 0 || student.grade === gradeFilter;
//             return genderMatches && gradeMatches;
//         });
//     }, [studentsData, genderFilter, gradeFilter]);

//     const editButtonEventHandler = (id) => {
//         navigate("student-form", {
//             state: { id, title: "تعديل بيانات الطالب", isReadOnly: false },
//         });
//     };

//     const filterChangeHandle = (event) => {
//         const { name, value } = event.target;
//         if (name === "gender_filter") {
//             setGenderFilter(parseInt(value));
//         }
//         if (name === "grade_filter") {
//             setGradeFilter(parseInt(value));
//         }
//     };

//     const addButtonEventHandler = () => {
//         navigate("student-form", {
//             state: { id: 0, title: "إضافة طالب جديد", isReadOnly: false },
//         });
//     };

//     const viewButtonEventHandler = (id) => {
//         navigate("student-form", {
//             state: { id, title: "بيانات الطالب", isReadOnly: true },
//         });
//     };

//     // const photoButtonEventHandler = (id) => {
//     //     navigate("student-photo-form", { state: { id } });
//     // };

//     const deleteButtonEventHandler = (id) => {
//         setStudentID(id);
//         setShowDeleteValidation(true);
//     };

//     const deleteStudentRequest = async () => {
//         try {
//             const response = await SystemAxios.delete(
//                 `/students/delete/${studentID}/`,
//                 {
//                     withCredentials: true,
//                     headers: {
//                         "X-CSRFToken": getCookie("csrftoken"),
//                     },
//                 }
//             );
//             if (response.status === 204) {
//                 setStudentsData((prev) =>
//                     prev.filter((student) => student.id !== studentID)
//                 );
//                 setShowDeleteValidation(false);
//                 setStudentID(null);
//             }
//         } catch (error) {
//             console.error("Error deleting student:", error.response);
//             alert("حدث خطأ أثناء حذف الطالب."); // User feedback for errors
//         }
//     };

//     const requestStudentsData = async () => {
//         try {
//             const response = await SystemAxios.get("/students/", {
//                 withCredentials: true,
//                 headers: {
//                     COOKIE_HEADER_NAME: getCookie(COOKIE_NAME),
//                 },
//             });
//             if (response.status === 200) {
//                 console.log(response.data);
//                 setStudentsData(response.data);
//             }
//         } catch (error) {
//             console.error("Error fetching students data:", error);
//             // alert('حدث خطأ أثناء استرجاع بيانات الطلاب.'); // User feedback for errors
//         }
//     };

//     useEffect(() => {
//         requestStudentsData();
//     }, []);

//     return (
//         <div className="w-11/12 m-auto p-4 shadow-lg shadow-green-200 flex flex-col justify-start items-center">
//             <div className="w-full flex justify-between mb-2">
//                 <h1 className="text-2xl font-bold">الطلاب</h1>
//                 <button
//                     className="shadow-lg mb-3 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 "
//                     onClick={addButtonEventHandler}
//                 >
//                     <FontAwesomeIcon icon={faAdd} />
//                 </button>
//             </div>
//             {studentsData.length === 0 ? (
//                 <h1>لا يوجد اي بيانات</h1>
//             ) : (
//                 <div className="w-full">
//                     <div
//                         style={{ backgroundColor: "#dad7cd" }}
//                         className="w-full flex flex-col mb-4 rounded shadow-md p-2"
//                     >
//                         <div className="flex justify-between items-center mb-2">
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
//                         <div className="flex justify-between items-center">
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
//                     </div>
//                     {filteredStudents.length === 0 ? (
//                         <h1>لا يوجد طلاب حسب الاختيارات التي حددتها</h1>
//                     ) : (
//                         <div className="w-full shadow overflow-scroll">
//                             <table className="w-full bg-white">
//                                 <thead>
//                                     <tr style={{ backgroundColor: "#a3b18a" }}>
//                                         <th className="py-2 px-4 ">الصورة</th>
//                                         <th className="py-2 px-4 ">الاسم</th>
//                                         <th className="py-2 px-4 ">الصف</th>
//                                         <th className="py-2 px-4 ">الجنس</th>
//                                         <th className="py-2 px-4 ">Actions</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody className="text-center">
//                                     {filteredStudents.map((student) => (
//                                         <tr
//                                             key={student.id}
//                                             className="hover:bg-gray-100"
//                                         >
//                                             <td className="py-2 px-4 ">
//                                                 <img
//                                                     src={httpToHttps(
//                                                         student.student_photo
//                                                     )}
//                                                     alt={student.student_name}
//                                                     className="w-12 h-12 rounded-full"
//                                                 />
//                                             </td>
//                                             <td className="py-2 px-4">
//                                                 {student.student_name}
//                                             </td>
//                                             <td className="py-2 px-4">
//                                                 {
//                                                     SCHOOL_GRADES[
//                                                         student.grade - 1
//                                                     ]
//                                                 }
//                                             </td>
//                                             <td className="py-2 px-4">
//                                                 {student.gender === "M"
//                                                     ? "ذكر"
//                                                     : "أنثى"}
//                                             </td>
//                                             <td className="py-2 px-4">
//                                                 <button
//                                                     onClick={() =>
//                                                         viewButtonEventHandler(
//                                                             student.id
//                                                         )
//                                                     }
//                                                     className="bg-blue-400 text-white py-1 px-3 rounded ml-2 hover:bg-blue-600"
//                                                 >
//                                                     <FontAwesomeIcon icon={faInfoCircle} />
//                                                 </button>
//                                                 <button
//                                                     onClick={() =>
//                                                         editButtonEventHandler(
//                                                             student.id
//                                                         )
//                                                     }
//                                                     style={{
//                                                         backgroundColor:
//                                                             "#95d5b2",
//                                                     }}
//                                                     className=" text-white py-1 px-3 rounded ml-2 bg-yellow-400 hover:bg-yellow-600"
//                                                 >
//                                                     <FontAwesomeIcon icon={faEdit} />
//                                                 </button>
//                                                 <button
//                                                     onClick={() =>
//                                                         deleteButtonEventHandler(
//                                                             student.id
//                                                         )
//                                                     }
//                                                     className="bg-red-400 ml-2 text-white py-1 px-3 rounded hover:bg-red-600"
//                                                 >
//                                                     <FontAwesomeIcon icon={faTrash} />
//                                                 </button>
//                                                 {/* <button
//                                                     onClick={() =>
//                                                         photoButtonEventHandler(
//                                                             student.id
//                                                         )
//                                                     }
//                                                     className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
//                                                 >
//                                                     الصورة
//                                                 </button> */}
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                             {showDeleteValidation && (
//                                 <div className="z-50 fixed top-0 right-0 w-full h-full lg:w-screen lg:h-screen bg-black flex justify-center items-center">
//                                     <div className="bg-white w-3/4 lg:w-4/5 lg:h-2/5 rounded-md flex flex-col justify-between items-center">
//                                         <h2 className="p-4 text-2xl">
//                                             تأكيد الحذف
//                                         </h2>
//                                         <div className="p-4 text-start">
//                                             <p>
//                                                 هل أنت متأكد من أنك تريد حذف
//                                                 بيانات هذا الطالب؟
//                                             </p>
//                                             <p>
//                                                 حالما يتم حذف بيانات هذا الطالب
//                                                 فإنه لن يمكنك أستعادة بياناته
//                                                 بشكل نهائي.
//                                             </p>
//                                             {filteredStudents.find(
//                                                 (student) =>
//                                                     student.id === studentID
//                                             ) && (
//                                                 <div className="mt-2">
//                                                     <p>
//                                                         اسم الطالب:{" "}
//                                                         <strong>
//                                                             {
//                                                                 filteredStudents.find(
//                                                                     (student) =>
//                                                                         student.id ===
//                                                                         studentID
//                                                                 ).student_name
//                                                             }
//                                                         </strong>
//                                                     </p>
//                                                     <p>
//                                                         المرحلة الدراسية:{" "}
//                                                         <strong>
//                                                             {
//                                                                 SCHOOL_GRADES[
//                                                                     filteredStudents.find(
//                                                                         (
//                                                                             student
//                                                                         ) =>
//                                                                             student.id ===
//                                                                             studentID
//                                                                     ).grade - 1
//                                                                 ]
//                                                             }
//                                                         </strong>
//                                                     </p>
//                                                 </div>
//                                             )}
//                                         </div>
//                                         <div className="flex justify-end m-1">
//                                             <button
//                                                 className="w-20 bg-red-500 m-1 rounded h-10 font-bold text-white shadow"
//                                                 onClick={deleteStudentRequest}
//                                             >
//                                                 حذف
//                                             </button>
//                                             <button
//                                                 className="w-20 bg-green-500 m-1 rounded h-10 font-bold text-white shadow"
//                                                 onClick={() =>
//                                                     setShowDeleteValidation(
//                                                         false
//                                                     )
//                                                 }
//                                             >
//                                                 الغاء
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default StudentsPage;

import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { SCHOOL_GRADES } from "../data/static/constants.js";
import { COOKIE_NAME, SystemAxios } from "../utils/custom_axios.js";
import getCookie from "../utils/get_cookie.js";
import { httpToHttps } from "../utils/converters.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAdd,
    faEdit,
    faInfoCircle,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const StudentsPage = () => {
    const [studentsData, setStudentsData] = useState([]);
    const [genderFilter, setGenderFilter] = useState(0); // 0: All, 1: Male, 2: Female
    const [gradeFilter, setGradeFilter] = useState(0); // 0: All
    const [showDeleteValidation, setShowDeleteValidation] = useState(false);
    const [studentID, setStudentID] = useState(null);
    const navigate = useNavigate();

    const filteredStudents = useMemo(() => {
        return studentsData.filter((student) => {
            const genderMatches =
                genderFilter === 0 ||
                (genderFilter === 1
                    ? student.gender === "M"
                    : student.gender === "F");
            const gradeMatches =
                gradeFilter === 0 || student.grade === gradeFilter;
            return genderMatches && gradeMatches;
        });
    }, [studentsData, genderFilter, gradeFilter]);

    const editButtonEventHandler = (id) => {
        navigate("student-form", {
            state: { id, title: "تعديل بيانات الطالب", isReadOnly: false },
        });
    };

    const filterChangeHandle = (event) => {
        const { name, value } = event.target;
        if (name === "gender_filter") {
            setGenderFilter(parseInt(value));
        }
        if (name === "grade_filter") {
            setGradeFilter(parseInt(value));
        }
    };

    const addButtonEventHandler = () => {
        navigate("student-form", {
            state: { id: 0, title: "إضافة طالب جديد", isReadOnly: false },
        });
    };

    const viewButtonEventHandler = (id) => {
        navigate("student-form", {
            state: { id, title: "بيانات الطالب", isReadOnly: true },
        });
    };

    const deleteButtonEventHandler = (id) => {
        setStudentID(id);
        setShowDeleteValidation(true);
    };

    const deleteStudentRequest = async () => {
        try {
            const response = await SystemAxios.delete(
                `/students/delete/${studentID}/`,
                {
                    withCredentials: true,
                    headers: {
                        "X-CSRFToken": getCookie("csrftoken"),
                    },
                }
            );
            if (response.status === 204) {
                setStudentsData((prev) =>
                    prev.filter((student) => student.id !== studentID)
                );
                setShowDeleteValidation(false);
                setStudentID(null);
            }
        } catch (error) {
            console.error("Error deleting student:", error.response);
            toast("حدث خطأ أثناء حذف الطالب."); // User feedback for errors
        }
    };

    const requestStudentsData = async () => {
        try {
            const response = await SystemAxios.get("/students/", {
                withCredentials: true,
                headers: {
                    COOKIE_HEADER_NAME: getCookie(COOKIE_NAME),
                },
            });
            if (response.status === 200) {
                // console.log(response.data);
                setStudentsData(response.data);
            }
        } catch (error) {
            console.error("Error fetching students data:", error);
            // alert('حدث خطأ أثناء استرجاع بيانات الطلاب.'); // User feedback for errors
        }
    };

    useEffect(() => {
        requestStudentsData();
    }, []);

    return (
        <div className="w-11/12 m-auto p-4 shadow-lg shadow-green-200 flex flex-col justify-start items-center">
            <div className="w-full flex justify-between mb-2">
                <h1 className="text-2xl font-bold">الطلاب</h1>
                <button
                    className="shadow-lg mb-3 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                    onClick={addButtonEventHandler}
                >
                    <FontAwesomeIcon icon={faAdd} />
                </button>
            </div>
            {studentsData.length === 0 ? (
                <h1>لا يوجد اي بيانات</h1>
            ) : (
                <div className="w-full">
                    <div
                        style={{ backgroundColor: "#dad7cd" }}
                        className="w-full flex flex-col mb-4 rounded shadow-md p-2"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <label htmlFor="gender">العرض حسب الجنس</label>
                            <select
                                id="gender"
                                name="gender_filter"
                                onChange={filterChangeHandle}
                                className="border border-gray-400 p-2 rounded bg-inherit w-1/3"
                            >
                                <option value={0}>الكل</option>
                                <option value={1}>ذكر</option>
                                <option value={2}>أنثى</option>
                            </select>
                        </div>
                        <div className="flex justify-between items-center">
                            <label htmlFor="grade">العرض حسب الصف</label>
                            <select
                                id="grade"
                                name="grade_filter"
                                onChange={filterChangeHandle}
                                className="border border-gray-400 p-2 rounded bg-inherit w-1/3"
                            >
                                <option value={0}>الكل</option>
                                {SCHOOL_GRADES.map((grade, index) => (
                                    <option key={index + 1} value={index + 1}>
                                        {grade}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {filteredStudents.length === 0 ? (
                        <h1>لا يوجد طلاب حسب الاختيارات التي حددتها</h1>
                    ) : (
                        <div className="w-full shadow overflow-scroll">
                            <table className="w-full bg-white">
                                <thead>
                                    <tr style={{ backgroundColor: "#a3b18a" }}>
                                        <th className="py-2 px-4">الصورة</th>
                                        <th className="py-2 px-4">الاسم</th>
                                        <th className="py-2 px-4">الصف</th>
                                        <th className="py-2 px-4">الجنس</th>
                                        <th className="py-2 px-4">الإجراءات</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {filteredStudents.map((student) => (
                                        <tr
                                            key={student.id}
                                            className="hover:bg-gray-100"
                                        >
                                            <td className="py-2 px-4">
                                                <img
                                                    src={httpToHttps(
                                                        student.student_photo
                                                    )}
                                                    alt={student.student_name}
                                                    className="w-12 h-12 rounded-full"
                                                />
                                            </td>
                                            <td className="py-2 px-4">
                                                {student.student_name}
                                            </td>
                                            <td className="py-2 px-4">
                                                {
                                                    SCHOOL_GRADES[
                                                        student.grade - 1
                                                    ]
                                                }
                                            </td>
                                            <td className="py-2 px-4">
                                                {student.gender === "M"
                                                    ? "ذكر"
                                                    : "أنثى"}
                                            </td>
                                            <td className="py-2 px-4">
                                                <button
                                                    onClick={() =>
                                                        viewButtonEventHandler(
                                                            student.id
                                                        )
                                                    }
                                                    className="bg-blue-400 text-white py-1 px-3 rounded ml-2 hover:bg-blue-600"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faInfoCircle}
                                                    />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        editButtonEventHandler(
                                                            student.id
                                                        )
                                                    }
                                                    style={{
                                                        backgroundColor:
                                                            "#95d5b2",
                                                    }}
                                                    className="text-white py-1 px-3 rounded ml-2 bg-yellow-400 hover:bg-yellow-600"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faEdit}
                                                    />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        deleteButtonEventHandler(
                                                            student.id
                                                        )
                                                    }
                                                    className="bg-red-400 ml-2 text-white py-1 px-3 rounded hover:bg-red-600"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faTrash}
                                                    />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {showDeleteValidation && (
                                <div className="z-50 fixed top-0 right-0 w-full h-full lg:w-screen lg:h-screen bg-black flex justify-center items-center">
                                    <div className="bg-white w-3/4 h-2/5 lg:w-1/5 lg:h-3/5 rounded-md flex flex-col justify-between items-center">
                                        <h2 className="p-4 text-2xl">
                                            تأكيد الحذف
                                        </h2>
                                        <div className="p-4 text-start">
                                            <p>
                                                هل أنت متأكد من أنك تريد حذف
                                                بيانات هذا الطالب؟
                                            </p>
                                            <p>
                                                حالما يتم حذف بيانات هذا الطالب
                                                فإنه لن يمكنك أستعادة بياناته
                                                بشكل نهائي.
                                            </p>
                                            {filteredStudents.find(
                                                (student) =>
                                                    student.id === studentID
                                            ) && (
                                                <div className="mt-2">
                                                    <p>
                                                        اسم الطالب:{" "}
                                                        <strong>
                                                            {
                                                                filteredStudents.find(
                                                                    (student) =>
                                                                        student.id ===
                                                                        studentID
                                                                ).student_name
                                                            }
                                                        </strong>
                                                    </p>
                                                    <p>
                                                        المرحلة الدراسية:{" "}
                                                        <strong>
                                                            {
                                                                SCHOOL_GRADES[
                                                                    filteredStudents.find(
                                                                        (
                                                                            student
                                                                        ) =>
                                                                            student.id ===
                                                                            studentID
                                                                    ).grade - 1
                                                                ]
                                                            }
                                                        </strong>
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex justify-end m-1">
                                            <button
                                                className="w-20 bg-red-500 m-1 rounded h-10 font-bold text-white shadow"
                                                onClick={deleteStudentRequest}
                                            >
                                                حذف
                                            </button>
                                            <button
                                                className="w-20 bg-green-500 m-1 rounded h-10 font-bold text-white shadow"
                                                onClick={() =>
                                                    setShowDeleteValidation(
                                                        false
                                                    )
                                                }
                                            >
                                                الغاء
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default StudentsPage;
