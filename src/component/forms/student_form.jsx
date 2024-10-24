// // import { useEffect, useRef, useState } from "react";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import getCookie from "../../data/control/set_cookie";
// // import { SystemAxios } from "../../utils/custom_axios";
// // import { SCHOOL_GRADES } from "../../data/static/constants";
// // import { httpToHttps, objectToFormData } from "../../utils/converters";

// // const StudentForm = () => {
// //     const navigate = useNavigate();
// //     const location = useLocation();
// //     const fileButtonRef = useRef(null);

// //     const [studentDataObject, setStudentDataObject] = useState({
// //         student_name: "",
// //         age: "",
// //         health_state: "",
// //         contact_information: "",
// //         gender: "M",
// //         grade: 1,
// //         date_of_birth: "",
// //         parent: null,
// //         bus: null,
// //         student_photo: null,
// //     });

// //     const [parentsData, setParentsData] = useState([]);
// //     const [busesData, setBusesData] = useState([]);
// //     const [studentHasPhoto, setStudentHasPhoto] = useState(false);
// //     const [studentHasChangePhoto, setStudentHasChangePhoto] = useState(false);
// //     const [photoSrc, setPhotoSrc] = useState(null);
// //     const [loading, setLoading] = useState(false);

// //     const getStudentData = async () => {
// //         try {
// //             const response = await SystemAxios.get(
// //                 `/students/${location.state.id}/`,
// //                 {
// //                     withCredentials: true,
// //                     headers: {
// //                         "X-CSRFToken": getCookie("csrftoken"),
// //                     },
// //                 }
// //             );
// //             if (response.status === 200) {
// //                 const data = response.data;
// //                 setStudentDataObject((prevData) => ({
// //                     ...prevData,
// //                     ...data,
// //                     parent: data.parent,
// //                     bus: data.bus,
// //                 }));
// //                 setStudentHasPhoto(!!data.student_photo);
// //             }
// //         } catch (error) {
// //             console.error(error.response);
// //         }
// //     };

// //     useEffect(() => {
// //         if (!getCookie("csrftoken")) {
// //             navigate("/");
// //             return;
// //         }

// //         getParentsData();
// //         getBusesData();

// //         if (location.state && location.state.id) {
// //             getStudentData();
// //         } else {
// //             const date = new Date(2000, 0, 1).toISOString().split("T")[0];
// //             setStudentDataObject((prevData) => ({
// //                 ...prevData,
// //                 date_of_birth: date,
// //             }));
// //         }
// //     }, []);

// //     const handleInput = (event) => {
// //         const { name, value } = event.target;
// //         setStudentDataObject((prevData) => ({ ...prevData, [name]: value }));
// //     };

// //     const handleInputNumber = (event) => {
// //         const { name, value } = event.target;
// //         setStudentDataObject((prevData) => ({
// //             ...prevData,
// //             [name]: parseInt(value, 10),
// //         }));
// //     };

// //     const handleRadioInput = (event) => {
// //         const { value } = event.target;
// //         setStudentDataObject((prevData) => ({
// //             ...prevData,
// //             gender: value,
// //         }));
// //     };

// //     const saveNewStudentData = async () => {
// //         setLoading(true);
// //         const formData = objectToFormData(studentDataObject);
// //         for (let key in studentDataObject) {
// //             console.log(
// //                 `${key}=>${studentDataObject[key]} - ${typeof studentDataObject[
// //                     key
// //                 ]}`
// //             );
// //         }
// //         try {
// //             const response = await SystemAxios.post(
// //                 "/students/create/",
// //                 formData,
// //                 {
// //                     withCredentials: true,
// //                     headers: {
// //                         "Content-Type": "multipart/form-data",
// //                         "X-CSRFToken": getCookie("csrftoken"),
// //                     },
// //                 }
// //             );

// //             if (response.status === 201) {
// //                 console.log("Student Created");
// //                 // navigate(-1); // Navigate back after creation
// //             }
// //         } catch (error) {
// //             console.error(error.response ? error.response.data : error.message);
// //             alert(error.message);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     const updateStudentData = async () => {
// //         setLoading(true);
// //         let response = null;
// //         try {
// //             if (studentHasChangePhoto) {
// //                 const formData = objectToFormData(studentDataObject);
// //                 response = await SystemAxios.put(
// //                     `/students/update/${location.state.id}/`,
// //                     formData,
// //                     {
// //                         withCredentials: true,
// //                         headers: {
// //                             "Content-Type": "multipart/form-data",
// //                             "X-CSRFToken": getCookie("csrftoken"),
// //                         },
// //                     }
// //                 );
// //             } else {
// //                 const data = studentDataObject;
// //                 delete data.student_photo;
// //                 console.log(data);
// //                 response = await SystemAxios.put(
// //                     `/students/update-data/${location.state.id}/`,
// //                     data,
// //                     {
// //                         withCredentials: true,
// //                         headers: {
// //                             "X-CSRFToken": getCookie("csrftoken"),
// //                         },
// //                     }
// //                 );
// //             }
// //             if (response.status === 200) {
// //                 console.log("Student updated");
// //                 navigate(-1);
// //             }
// //         } catch (error) {
// //             console.error(error);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     const onFormSubmit = (event) => {
// //         event.preventDefault();
// //         if (location.state && location.state.id) {
// //             updateStudentData();
// //         } else {
// //             saveNewStudentData();
// //         }
// //     };

// //     const getParentsData = async () => {
// //         try {
// //             const response = await SystemAxios.get(
// //                 "/users/users-names?type=1",
// //                 {
// //                     withCredentials: true,
// //                     headers: {
// //                         "X-CSRFToken": getCookie("csrftoken"),
// //                     },
// //                 }
// //             );
// //             if (response.status === 200) {
// //                 setParentsData(response.data);
// //             }
// //         } catch (error) {
// //             console.error(error.response);
// //         }
// //     };

// //     const getBusesData = async () => {
// //         try {
// //             const response = await SystemAxios.get("/buses/buses-names", {
// //                 withCredentials: true,
// //                 headers: {
// //                     // COOKIE_HEADER_NAME: getCookie(COOKIE_NAME),
// //                     "X-CSRFToken": getCookie("csrftoken"),
// //                 },
// //             });
// //             if (response.status === 200) {
// //                 setBusesData(response.data);
// //             }
// //         } catch (error) {
// //             console.error(error.response);
// //         }
// //     };

// //     const handleFileChangeEvent = (event) => {
// //         setStudentDataObject((prevData) => ({
// //             ...prevData,
// //             student_photo: event.target.files[0],
// //         }));
// //         setStudentHasChangePhoto(true);
// //         showPhoto(event.target.files[0]);
// //     };

// //     const showPhoto = (photo) => {
// //         const reader = new FileReader();
// //         reader.onloadend = () => {
// //             setPhotoSrc(reader.result);
// //         };
// //         reader.readAsDataURL(photo);
// //     };

// //     const handleButtonClickEvent = (event) => {
// //         event.preventDefault();
// //         fileButtonRef.current.click();
// //     };

// //     return (
// //         <div className="w-auto m-auto p-4 shadow-lg shadow-green-200">
// //             {loading ? (
// //                 <h1>Loading...</h1>
// //             ) : parentsData.length === 0 || busesData.length === 0 ? (
// //                 <h1>
// //                     لايوجد بيانات أولياء أمور الطلاب أو الحافلات الرجاء التحقق
// //                     من إضافتها اولاً
// //                 </h1>
// //             ) : (
// //                 <>
// //                     <div className="text-3xl font-bold py-4 mx-4 mb-4 text-green-500">
// //                         <h1>{location.state?.title || "Student Form"}</h1>
// //                     </div>
// //                     <div className="w-full px-4">
// //                         <form
// //                             className="w-full flex flex-col justify-start items-start space-y-2"
// //                             onSubmit={onFormSubmit}
// //                         >
// //                             <div>
// //                                 <img
// //                                     src={
// //                                         studentHasChangePhoto
// //                                             ? photoSrc
// //                                             : studentHasPhoto
// //                                             ? httpToHttps(
// //                                                   studentDataObject.student_photo
// //                                               )
// //                                             : ""
// //                                     }
// //                                     alt="student-img"
// //                                 />
// //                                 <button onClick={handleButtonClickEvent}>
// //                                     اختيار الصورة
// //                                 </button>
// //                                 <input
// //                                     ref={fileButtonRef}
// //                                     onChange={handleFileChangeEvent}
// //                                     className="hidden"
// //                                     type="file"
// //                                 />
// //                             </div>
// //                             <input
// //                                 className="border-none w-1/2 px-2 py-4 outline-none bg-green-50 focus:bg-green-100 rounded-md"
// //                                 onChange={handleInput}
// //                                 type="text"
// //                                 name="student_name"
// //                                 placeholder="الاسم"
// //                                 disabled={location.state?.isReadOnly}
// //                                 value={studentDataObject.student_name}
// //                                 required
// //                             />
// //                             <input
// //                                 className="border-none w-1/2 px-2 py-4 outline-none bg-green-50 focus:bg-green-100 rounded-md"
// //                                 onChange={handleInputNumber}
// //                                 type="number"
// //                                 name="age"
// //                                 disabled={location.state?.isReadOnly}
// //                                 placeholder="العمر"
// //                                 value={studentDataObject.age}
// //                                 required
// //                             />
// //                             <div className="w-1/2 px-2 py-4 flex text-right ">
// //                                 <label className="ltr:mr-8 rtl:ml-8 text-xl flex-1">
// //                                     الجنس
// //                                 </label>
// //                                 <div className="flex-auto">
// //                                     <input
// //                                         onChange={handleRadioInput}
// //                                         checked={
// //                                             studentDataObject.gender === "M"
// //                                         }
// //                                         value="M"
// //                                         className="ltr:mr-2 rtl:ml-2"
// //                                         id="male"
// //                                         disabled={location.state?.isReadOnly}
// //                                         type="radio"
// //                                         name="gender"
// //                                     />
// //                                     <label htmlFor="male" className="text-xl">
// //                                         ذكر
// //                                     </label>
// //                                 </div>
// //                                 <div className="flex-auto">
// //                                     <input
// //                                         onChange={handleRadioInput}
// //                                         checked={
// //                                             studentDataObject.gender === "F"
// //                                         }
// //                                         value="F"
// //                                         className="ltr:mr-2 rtl:ml-2"
// //                                         id="female"
// //                                         type="radio"
// //                                         name="gender"
// //                                         disabled={location.state.isReadOnly}
// //                                     />
// //                                     <label htmlFor="female" className="text-xl">
// //                                         أنثى
// //                                     </label>
// //                                 </div>
// //                             </div>
// //                             <div className="w-1/2 px-2 py-4 flex justify-start items-center">
// //                                 <label className="ltr:mr-4 rtl:ml-4 w-1/2 text-xl text-start">
// //                                     المرحلة الدراسية
// //                                 </label>
// //                                 <select
// //                                     onChange={handleInputNumber}
// //                                     name="grade"
// //                                     className="border p-4 flex-auto"
// //                                     value={studentDataObject.grade || ""}
// //                                     disabled={location.state.isReadOnly}
// //                                 >
// //                                     {SCHOOL_GRADES.map((grade, index) => (
// //                                         <option key={index} value={index + 1}>
// //                                             {grade}
// //                                         </option>
// //                                     ))}
// //                                 </select>
// //                             </div>
// //                             <div className="w-full px-2 py-4 flex justify-start items-center">
// //                                 <label className="ltr:mr-4 rtl:ml-4 w-1/2 text-xl text-start">
// //                                     ولي الأمر (مستخدم)
// //                                 </label>
// //                                 <select
// //                                     onChange={handleInputNumber}
// //                                     name="parent"
// //                                     className="border p-4 flex-auto"
// //                                     value={studentDataObject.parent || ""}
// //                                     disabled={location.state.isReadOnly}
// //                                 >
// //                                     <option value="">اختر ولي الأمر</option>
// //                                     {parentsData.map((parent) => (
// //                                         <option
// //                                             key={parent.id}
// //                                             value={parent.id}
// //                                         >
// //                                             {parent.username}
// //                                         </option>
// //                                     ))}
// //                                 </select>
// //                             </div>
// //                             <div className="w-full px-2 py-4 flex justify-start items-center">
// //                                 <label className="ltr:mr-4 rtl:ml-4 w-1/2 text-xl text-start">
// //                                     الحافلة
// //                                 </label>
// //                                 <select
// //                                     onChange={handleInputNumber}
// //                                     name="bus"
// //                                     className="border p-4 flex-auto"
// //                                     value={studentDataObject.bus || ""}
// //                                     disabled={location.state.isReadOnly}
// //                                 >
// //                                     <option value="">اختر رقم الحافلة </option>
// //                                     {busesData.map((bus, index) => (
// //                                         <option key={index} value={bus.id}>
// //                                             {bus.bus_number}
// //                                         </option>
// //                                     ))}
// //                                 </select>
// //                             </div>
// //                             <div className="w-full px-2 py-4 flex justify-start items-center">
// //                                 <label
// //                                     className="ltr:mr-4 rtl:ml-4 w-1/2 text-start text-xl"
// //                                     htmlFor="date"
// //                                 >
// //                                     تاريخ الميلاد
// //                                 </label>
// //                                 <input
// //                                     onChange={handleInput}
// //                                     value={studentDataObject.date_of_birth}
// //                                     className="border p-4 flex-auto"
// //                                     id="date"
// //                                     type="date"
// //                                     name="date_of_birth"
// //                                     disabled={location.state.isReadOnly}
// //                                     required
// //                                 />
// //                             </div>
// //                             <textarea
// //                                 onChange={handleInput}
// //                                 value={studentDataObject.health_state}
// //                                 className="w-full px-2 py-4 outline-none bg-green-50 rounded-md border-none focus:bg-green-100"
// //                                 rows={4}
// //                                 name="health_state"
// //                                 placeholder="الحالة الصحية"
// //                                 disabled={location.state.isReadOnly}
// //                             />
// //                             <textarea
// //                                 onChange={handleInput}
// //                                 value={studentDataObject.contact_information}
// //                                 className="w-full px-2 py-4 outline-none bg-green-50 rounded-md border-none focus:bg-green-100"
// //                                 rows={4}
// //                                 name="contact_information"
// //                                 placeholder="معلومات التواصل"
// //                                 disabled={location.state.isReadOnly}
// //                             />
// //                             {!location.state?.isReadOnly && (
// //                                 <button
// //                                     type="submit"
// //                                     className="w-full text-xl font-bold rounded text-green-500 py-4 border-2 border-green-100 hover:bg-green-500 hover:text-white"
// //                                 >
// //                                     {location.state?.id ? "تعديل" : "إضافة"}
// //                                 </button>
// //                             )}
// //                         </form>
// //                     </div>
// //                 </>
// //             )}
// //         </div>
// //     );
// // };

// // export default StudentForm;

// import { useEffect, useRef, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import getCookie from "../../data/control/set_cookie";
// import { SystemAxios } from "../../utils/custom_axios";
// import { SCHOOL_GRADES } from "../../data/static/constants";
// import { httpToHttps, objectToFormData } from "../../utils/converters";

// const StudentForm = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const fileButtonRef = useRef(null);

//     const [studentDataObject, setStudentDataObject] = useState({
//         student_name: "",
//         age: "",
//         health_state: "",
//         contact_information: "",
//         gender: "M",
//         grade: 0,
//         date_of_birth: "",
//         parent: null,
//         bus: null,
//         student_photo: null,
//     });

//     const [parentsData, setParentsData] = useState([]);
//     const [busesData, setBusesData] = useState([]);
//     const [studentHasPhoto, setStudentHasPhoto] = useState(false);
//     const [studentHasChangePhoto, setStudentHasChangePhoto] = useState(false);
//     const [photoSrc, setPhotoSrc] = useState(null);
//     const [loading, setLoading] = useState(false);

//     const getStudentData = async () => {
//         try {
//             const response = await SystemAxios.get(
//                 `/students/${location.state.id}/`,
//                 {
//                     withCredentials: true,
//                     headers: {
//                         "X-CSRFToken": getCookie("csrftoken"),
//                     },
//                 }
//             );
//             if (response.status === 200) {
//                 const data = response.data;
//                 setStudentDataObject((prevData) => ({
//                     ...prevData,
//                     ...data,
//                     parent: data.parent,
//                     bus: data.bus,
//                 }));
//                 setStudentHasPhoto(!!data.student_photo);
//             }
//         } catch (error) {
//             console.error(error.response);
//         }
//     };

//     useEffect(() => {
//         if (!getCookie("csrftoken")) {
//             navigate("/", { replace: true });
//             return;
//         }

//         getParentsData();
//         getBusesData();

//         if (location.state && location.state.id) {
//             getStudentData();
//         } else {
//             const date = new Date(2000, 0, 2).toISOString().split("T")[0];
//             setStudentDataObject((prevData) => ({
//                 ...prevData,
//                 date_of_birth: date,
//             }));
//         }
//     }, []);

//     const handleInput = (event) => {
//         const { name, value } = event.target;
//         setStudentDataObject((prevData) => ({ ...prevData, [name]: value }));
//     };

//     const handleInputNumber = (event) => {
//         const { name, value } = event.target;
//         setStudentDataObject((prevData) => ({
//             ...prevData,
//             [name]: parseInt(value, 10),
//         }));
//     };

//     const handleRadioInput = (event) => {
//         const { value } = event.target;
//         setStudentDataObject((prevData) => ({
//             ...prevData,
//             gender: value,
//         }));
//     };

//     const saveNewStudentData = async () => {
//         setLoading(true);
//         const formData = objectToFormData(studentDataObject);
//         try {
//             const response = await SystemAxios.post(
//                 "/students/create/",
//                 formData,
//                 {
//                     withCredentials: true,
//                     headers: {
//                         "Content-Type": "multipart/form-data",
//                         "X-CSRFToken": getCookie("csrftoken"),
//                     },
//                 }
//             );

//             if (response.status === 201) {
//                 navigate(-1);
//             }
//         } catch (error) {
//             console.error(error.response ? error.response.data : error.message);
//             alert(error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const updateStudentData = async () => {
//         setLoading(true);
//         let response = null;
//         try {
//             if (studentHasChangePhoto) {
//                 const formData = objectToFormData(studentDataObject);
//                 response = await SystemAxios.put(
//                     `/students/update/${location.state.id}/`,
//                     formData,
//                     {
//                         withCredentials: true,
//                         headers: {
//                             "Content-Type": "multipart/form-data",
//                             "X-CSRFToken": getCookie("csrftoken"),
//                         },
//                     }
//                 );
//             } else {
//                 const data = { ...studentDataObject };
//                 delete data.student_photo;
//                 response = await SystemAxios.put(
//                     `/students/update-data/${location.state.id}/`,
//                     data,
//                     {
//                         withCredentials: true,
//                         headers: {
//                             "X-CSRFToken": getCookie("csrftoken"),
//                         },
//                     }
//                 );
//             }
//             if (response.status === 200) {
//                 navigate(-1);
//             }
//         } catch (error) {
//             console.error(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const onFormSubmit = (event) => {
//         event.preventDefault();
//         if (location.state && location.state.id) {
//             updateStudentData();
//         } else {
//             saveNewStudentData();
//         }
//     };

//     const getParentsData = async () => {
//         try {
//             const response = await SystemAxios.get(
//                 "/users/users-names?type=1",
//                 {
//                     withCredentials: true,
//                     headers: {
//                         "X-CSRFToken": getCookie("csrftoken"),
//                     },
//                 }
//             );
//             if (response.status === 200) {
//                 setParentsData(response.data);
//             }
//         } catch (error) {
//             console.error(error.response);
//         }
//     };

//     const getBusesData = async () => {
//         try {
//             const response = await SystemAxios.get("/buses/buses-names", {
//                 withCredentials: true,
//                 headers: {
//                     "X-CSRFToken": getCookie("csrftoken"),
//                 },
//             });
//             if (response.status === 200) {
//                 setBusesData(response.data);
//             }
//         } catch (error) {
//             console.error(error.response);
//         }
//     };

//     const handleFileChangeEvent = (event) => {
//         setStudentDataObject((prevData) => ({
//             ...prevData,
//             student_photo: event.target.files[0],
//         }));
//         setStudentHasChangePhoto(true);
//         showPhoto(event.target.files[0]);
//     };

//     const showPhoto = (photo) => {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//             setPhotoSrc(reader.result);
//         };
//         reader.readAsDataURL(photo);
//     };

//     const handleButtonClickEvent = (event) => {
//         event.preventDefault();
//         fileButtonRef.current.click();
//     };

//     return (
//         <div className="max-w-3xl mx-auto p-6 shadow-lg bg-white rounded-lg">
//             {loading ? (
//                 <h1 className="text-center text-xl">Loading...</h1>
//             ) : parentsData.length === 0 || busesData.length === 0 ? (
//                 <h1 className="text-center text-xl text-red-600">
//                     لايوجد بيانات أولياء أمور الطلاب أو الحافلات الرجاء التحقق
//                     من إضافتها اولاً
//                 </h1>
//             ) : (
//                 <>
//                     <h1 className="text-3xl font-bold text-center text-green-600 mb-4">
//                         {location.state?.title || "Student Form"}
//                     </h1>
//                     <form className="space-y-4" onSubmit={onFormSubmit}>
//                         <div className="flex flex-col items-center">
//                             <img
//                                 src={
//                                     studentHasChangePhoto
//                                         ? photoSrc
//                                         : studentHasPhoto
//                                         ? httpToHttps(
//                                               studentDataObject.student_photo
//                                           )
//                                         : ""
//                                 }
//                                 alt="student-img"
//                                 className="w-32 h-32 object-cover rounded-full mb-4"
//                             />
//                             <button
//                                 type="button"
//                                 onClick={handleButtonClickEvent}
//                                 className="bg-green-500 text-white px-4 py-2 rounded-md"
//                             >
//                                 اختيار الصورة
//                             </button>
//                             <input
//                                 ref={fileButtonRef}
//                                 onChange={handleFileChangeEvent}
//                                 className="hidden"
//                                 type="file"
//                             />
//                         </div>
//                         <input
//                             className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                             onChange={handleInput}
//                             type="text"
//                             name="student_name"
//                             placeholder="الاسم"
//                             disabled={location.state?.isReadOnly}
//                             value={studentDataObject.student_name}
//                             required
//                         />
//                         <input
//                             className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                             onChange={handleInputNumber}
//                             type="number"
//                             name="age"
//                             disabled={location.state?.isReadOnly}
//                             placeholder="العمر"
//                             value={studentDataObject.age}
//                             required
//                         />
//                         <div className="flex items-center justify-between">
//                             <label className="text-xl">الجنس</label>
//                             <div className="flex items-center">
//                                 <input
//                                     onChange={handleRadioInput}
//                                     checked={studentDataObject.gender === "M"}
//                                     value="M"
//                                     type="radio"
//                                     name="gender"
//                                     disabled={location.state?.isReadOnly}
//                                 />
//                                 <label className="ml-2">ذكر</label>
//                                 <input
//                                     onChange={handleRadioInput}
//                                     checked={studentDataObject.gender === "F"}
//                                     value="F"
//                                     type="radio"
//                                     name="gender"
//                                     disabled={location.state?.isReadOnly}
//                                     className="ml-4"
//                                 />
//                                 <label className="ml-2">أنثى</label>
//                             </div>
//                         </div>
//                         <div className="flex items-center justify-between">
//                             <label className="text-xl">المرحلة الدراسية</label>
//                             <select
//                                 onChange={handleInputNumber}
//                                 name="grade"
//                                 className="border p-2 rounded-md flex-grow ml-4"
//                                 value={studentDataObject.grade || ""}
//                                 disabled={location.state.isReadOnly}
//                             >
//                                 <option value="">اختر المرحلة الدراسية</option>
//                                 {SCHOOL_GRADES.map((grade, index) => (
//                                     <option key={index} value={index + 1}>
//                                         {grade}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className="flex items-center justify-between">
//                             <label className="text-xl">
//                                 ولي الأمر (مستخدم)
//                             </label>
//                             <select
//                                 onChange={handleInputNumber}
//                                 name="parent"
//                                 className="border p-2 rounded-md flex-grow ml-4"
//                                 value={studentDataObject.parent || ""}
//                                 disabled={location.state.isReadOnly}
//                             >
//                                 <option value="">اختر ولي الأمر</option>
//                                 {parentsData.map((parent) => (
//                                     <option key={parent.id} value={parent.id}>
//                                         {parent.username}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className="flex items-center justify-between">
//                             <label className="text-xl">الحافلة</label>
//                             <select
//                                 onChange={handleInputNumber}
//                                 name="bus"
//                                 className="border p-2 rounded-md flex-grow ml-4"
//                                 value={studentDataObject.bus || ""}
//                                 disabled={location.state.isReadOnly}
//                             >
//                                 <option value="">اختر رقم الحافلة</option>
//                                 {busesData.map((bus) => (
//                                     <option key={bus.id} value={bus.id}>
//                                         {bus.bus_number}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className="flex items-center justify-between">
//                             <label className="text-xl">تاريخ الميلاد</label>
//                             <input
//                                 onChange={handleInput}
//                                 value={studentDataObject.date_of_birth}
//                                 className="border p-2 rounded-md flex-grow ml-4"
//                                 type="date"
//                                 name="date_of_birth"
//                                 disabled={location.state.isReadOnly}
//                                 required
//                             />
//                         </div>
//                         <textarea
//                             onChange={handleInput}
//                             value={studentDataObject.health_state}
//                             className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                             rows={4}
//                             name="health_state"
//                             placeholder="الحالة الصحية"
//                             disabled={location.state.isReadOnly}
//                         />
//                         <textarea
//                             onChange={handleInput}
//                             value={studentDataObject.contact_information}
//                             className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                             rows={4}
//                             name="contact_information"
//                             placeholder="معلومات التواصل"
//                             disabled={location.state.isReadOnly}
//                         />
//                         {!location.state?.isReadOnly && (
//                             <button
//                                 type="submit"
//                                 className="w-full text-xl font-bold rounded text-white bg-green-500 py-2 border-2 border-green-100 hover:bg-green-600 transition"
//                             >
//                                 {location.state?.id ? "تعديل" : "إضافة"}
//                             </button>
//                         )}
//                     </form>
//                 </>
//             )}
//         </div>
//     );
// };

// export default StudentForm;

import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import getCookie from "../../data/control/set_cookie";
import { SystemAxios } from "../../utils/custom_axios";
import { SCHOOL_GRADES } from "../../data/static/constants";
import {
    httpToHttps,
    objectToFormData,
    photoFileToDataURL,
} from "../../utils/converters";

import studentImage from "../../assets/img/student.webp";
import { toast } from "react-toastify";

const StudentForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const fileButtonRef = useRef(null);

    const [studentDataObject, setStudentDataObject] = useState({
        student_name: "",
        age: "",
        health_state: "",
        contact_information: "",
        gender: "M",
        grade: 0,
        date_of_birth: "",
        parent: null,
        bus: null,
        student_photo: null,
    });

    const [errors, setErrors] = useState({});
    const [parentsData, setParentsData] = useState([]);
    const [busesData, setBusesData] = useState([]);
    const [studentHasPhoto, setStudentHasPhoto] = useState(false);
    const [studentHasChangePhoto, setStudentHasChangePhoto] = useState(false);
    const [photoSrc, setPhotoSrc] = useState(null);
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        if (!studentDataObject.student_name) {
            newErrors.student_name = "الاسم مطلوب";
        }
        if (!studentDataObject.age || studentDataObject.age <= 0) {
            newErrors.age = "العمر مطلوب ويجب أن يكون أكبر من 0";
        }
        if (!studentDataObject.date_of_birth) {
            newErrors.date_of_birth = "تاريخ الميلاد مطلوب";
        }
        if (!studentDataObject.parent) {
            newErrors.parent = "يجب اختيار ولي الأمر";
        }
        if (!studentDataObject.bus) {
            newErrors.bus = "يجب اختيار رقم الحافلة";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const getStudentData = async () => {
        try {
            const response = await SystemAxios.get(
                `/students/${location.state?.id}/`,
                {
                    withCredentials: true,
                    headers: {
                        "X-CSRFToken": getCookie("csrftoken"),
                    },
                }
            );
            if (response.status === 200) {
                const data = response.data;
                setStudentDataObject((prevData) => ({
                    ...prevData,
                    ...data,
                    parent: data.parent,
                    bus: data.bus,
                }));
                setStudentHasPhoto(!!data.student_photo);
            }
        } catch (error) {
            console.error(error.response);
        }
    };

    useEffect(() => {
        if (!getCookie("csrftoken")) {
            navigate("/", { replace: true });
            return;
        }

        getParentsData();
        getBusesData();

        if (location.state && location.state.id) {
            getStudentData();
        } else {
            const date = new Date(2000, 0, 2).toISOString().split("T")[0];
            setStudentDataObject((prevData) => ({
                ...prevData,
                date_of_birth: date,
            }));
        }
    }, []);

    const handleInput = (event) => {
        const { name, value } = event.target;
        setStudentDataObject((prevData) => ({ ...prevData, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error on change
    };

    const handleInputNumber = (event) => {
        const { name, value } = event.target;
        setStudentDataObject((prevData) => ({
            ...prevData,
            [name]: parseInt(value, 10),
        }));
        setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error on change
    };

    const handleRadioInput = (event) => {
        const { value } = event.target;
        setStudentDataObject((prevData) => ({
            ...prevData,
            gender: value,
        }));
    };

    const saveNewStudentData = async () => {
        setLoading(true);
        let response = null;
        try {
            const formData = objectToFormData(studentDataObject);
            let tempData = studentDataObject;
            delete tempData.student_photo;
            response = await SystemAxios.post(
                studentHasChangePhoto
                    ? `/students/create/`
                    : `/students/create-data/`,
                studentHasChangePhoto ? formData : tempData,
                studentHasChangePhoto
                    ? {
                          withCredentials: true,
                          headers: {
                              "Content-Type": "multipart/form-data",
                              "X-CSRFToken": getCookie("csrftoken"),
                          },
                      }
                    : {
                          withCredentials: true,
                          headers: {
                              "X-CSRFToken": getCookie("csrftoken"),
                          },
                      }
            );
            if (response.status === 201) {
                // navigate(-1);
                toast("تم إنشاء حساب الطالب بنجاح")
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const updateStudentData = async () => {
        setLoading(true);
        let response = null;
        try {
            const formData = objectToFormData(studentDataObject);
            let tempData = studentDataObject;
            delete tempData.student_photo;
            response = await SystemAxios.put(
                studentHasChangePhoto
                    ? `/students/update/${location.state.id}/`
                    : `/students/update-data/${location.state.id}/`,
                studentHasChangePhoto ? formData : tempData,
                studentHasChangePhoto
                    ? {
                          withCredentials: true,
                          headers: {
                              "Content-Type": "multipart/form-data",
                              "X-CSRFToken": getCookie("csrftoken"),
                          },
                      }
                    : {
                          withCredentials: true,
                          headers: {
                              "X-CSRFToken": getCookie("csrftoken"),
                          },
                      }
            );
            if (response.status === 200) {
                navigate(-1);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            if (location.state && location.state.id) {
                updateStudentData();
            } else {
                saveNewStudentData();
            }
        }
    };

    const getParentsData = async () => {
        try {
            const response = await SystemAxios.get(
                "/users/users-names?type=1",
                {
                    withCredentials: true,
                    headers: {
                        "X-CSRFToken": getCookie("csrftoken"),
                    },
                }
            );
            if (response.status === 200) {
                console.log(response.status)
                setParentsData(response.data);
            }
        } catch (error) {
            console.error(error.response);
        }
    };

    const getBusesData = async () => {
        try {
            const response = await SystemAxios.get("/buses/names", {
                withCredentials: true,
                headers: {
                    "X-CSRFToken": getCookie("csrftoken"),
                },
            });
            if (response.status === 200) {
                setBusesData(response.data);
            }
        } catch (error) {
            console.error(error.response);
        }
    };

    const handleFileChangeEvent = (event) => {
        setStudentDataObject((prevData) => ({
            ...prevData,
            student_photo: event.target.files[0],
        }));
        setStudentHasChangePhoto(true);
        photoFileToDataURL(event.target.files[0], setPhotoSrc);
    };

    // photoFileToDataURL(photo, setPhotoSrc);
    // const showPhoto = (photo) => {
    //     // Show photo logic...
    // };

    const handleButtonClickEvent = (event) => {
        event.preventDefault();
        fileButtonRef.current.click();
    };

    return (
        <div className="max-w-3xl mx-auto p-6 shadow-lg bg-white rounded-lg">
            {loading ? (
                <h1 className="text-center text-xl">Loading...</h1>
            ) : parentsData.length === 0 || busesData.length === 0 ? (
                <h1 className="text-center text-xl text-red-600">
                    لايوجد بيانات أولياء أمور الطلاب أو الحافلات الرجاء التحقق
                    من إضافتها اولاً
                </h1>
            ) : (
                <>
                    <h1 className="text-3xl font-bold text-center text-green-600 mb-4">
                        {location.state?.title || "Student Form"}
                    </h1>
                    <form className="space-y-4" onSubmit={onFormSubmit}>
                        <div className="flex flex-col items-center">
                            <img
                                src={
                                    studentHasChangePhoto
                                        ? photoSrc
                                        : studentHasPhoto
                                        ? httpToHttps(
                                              studentDataObject.student_photo
                                          )
                                        : studentImage
                                }
                                alt="student-img"
                                className="w-32 h-32 object-cover rounded-full mb-4"
                            />
                            <button
                                type="button"
                                onClick={handleButtonClickEvent}
                                className="bg-green-500 text-white px-4 py-2 rounded-md"
                            >
                                اختيار الصورة
                            </button>
                            <input
                                ref={fileButtonRef}
                                onChange={handleFileChangeEvent}
                                className="hidden"
                                type="file"
                            />
                        </div>
                        <div>
                            <input
                                className={`w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                                    errors.student_name ? "border-red-500" : ""
                                }`}
                                onChange={handleInput}
                                type="text"
                                name="student_name"
                                placeholder="الاسم"
                                disabled={location.state?.isReadOnly}
                                value={studentDataObject.student_name}
                                required
                            />
                            {errors.student_name && (
                                <p className="text-red-500">
                                    {errors.student_name}
                                </p>
                            )}
                        </div>
                        <div>
                            <input
                                className={`w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                                    errors.age ? "border-red-500" : ""
                                }`}
                                onChange={handleInputNumber}
                                type="number"
                                name="age"
                                disabled={location.state?.isReadOnly}
                                placeholder="العمر"
                                value={studentDataObject.age}
                                required
                            />
                            {errors.age && (
                                <p className="text-red-500">{errors.age}</p>
                            )}
                        </div>
                        <div className="flex items-center justify-between mxl-4">
                            <label className="text-xl">الجنس</label>
                            <div className="flex items-center">
                                <input
                                    onChange={handleRadioInput}
                                    checked={studentDataObject.gender === "M"}
                                    value="M"
                                    type="radio"
                                    name="gender"
                                    disabled={location.state?.isReadOnly}
                                />
                                <label className="mx-2">ذكر</label>
                                <input
                                    onChange={handleRadioInput}
                                    checked={studentDataObject.gender === "F"}
                                    value="F"
                                    type="radio"
                                    name="gender"
                                    disabled={location.state?.isReadOnly}
                                    className="mr-4"
                                />
                                <label className="mx-2">أنثى</label>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="text-xl">المرحلة الدراسية</label>
                            <select
                                onChange={handleInputNumber}
                                name="grade"
                                className="border p-2 rounded-md flex-grow mr-4"
                                value={studentDataObject.grade || ""}
                                disabled={location.state.isReadOnly}
                            >
                                <option value="">اختر المرحلة الدراسية</option>
                                {SCHOOL_GRADES.map((grade, index) => (
                                    <option key={index} value={index + 1}>
                                        {grade}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="text-xl">
                                ولي الأمر (مستخدم)
                            </label>
                            <select
                                onChange={handleInputNumber}
                                name="parent"
                                className={`border p-2 rounded-md flex-grow mr-4 ${
                                    errors.parent ? "border-red-500" : ""
                                }`}
                                value={studentDataObject.parent || ""}
                                disabled={location.state.isReadOnly}
                            >
                                <option value="">اختر ولي الأمر</option>
                                {parentsData.map((parent) => (
                                    <option key={parent.id} value={parent.id}>
                                        {parent.username}
                                    </option>
                                ))}
                            </select>
                            {errors.parent && (
                                <p className="text-red-500">{errors.parent}</p>
                            )}
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="text-xl">الحافلة</label>
                            <select
                                onChange={handleInputNumber}
                                name="bus"
                                className={`border p-2 rounded-md flex-grow mr-4 ${
                                    errors.bus ? "border-red-500" : ""
                                }`}
                                value={studentDataObject.bus || ""}
                                disabled={location.state.isReadOnly}
                            >
                                <option value="">اختر رقم الحافلة</option>
                                {busesData.map((bus) => (
                                    <option key={bus.id} value={bus.id}>
                                        {bus.bus_number}
                                    </option>
                                ))}
                            </select>
                            {errors.bus && (
                                <p className="text-red-500">{errors.bus}</p>
                            )}
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="text-xl">تاريخ الميلاد</label>
                            <input
                                onChange={handleInput}
                                value={studentDataObject.date_of_birth}
                                className={`border p-2 rounded-md flex-grow mr-4 ${
                                    errors.date_of_birth ? "border-red-500" : ""
                                }`}
                                type="date"
                                name="date_of_birth"
                                disabled={location.state.isReadOnly}
                                required
                            />
                            {errors.date_of_birth && (
                                <p className="text-red-500">
                                    {errors.date_of_birth}
                                </p>
                            )}
                        </div>
                        <textarea
                            onChange={handleInput}
                            value={studentDataObject.health_state}
                            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            rows={4}
                            name="health_state"
                            placeholder="الحالة الصحية"
                            disabled={location.state.isReadOnly}
                        />
                        <textarea
                            onChange={handleInput}
                            value={studentDataObject.contact_information}
                            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            rows={4}
                            name="contact_information"
                            placeholder="معلومات التواصل"
                            disabled={location.state.isReadOnly}
                        />
                        {!location.state?.isReadOnly && (
                            <button
                                type="submit"
                                className="w-full text-xl font-bold rounded text-white bg-green-500 py-2 border-2 border-green-100 hover:bg-green-600 transition"
                            >
                                {location.state?.id ? "تعديل" : "إضافة"}
                            </button>
                        )}
                    </form>
                </>
            )}
        </div>
    );
};

export default StudentForm;
