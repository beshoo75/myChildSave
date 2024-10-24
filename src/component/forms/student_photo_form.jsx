// import { useEffect, useRef, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { SystemAxios } from "../../utils/custom_axios";
// import getCookie from "../../utils/get_cookie";
// import { faL } from "@fortawesome/free-solid-svg-icons";

// const StudentPhotoForm = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const fileButtonRef = useRef(null);
//     const [studentHasPhoto, setStudentHasPhoto] = useState(false);
//     const [studentHasChangePhoto, setStudentHasChangePhoto] = useState(false);
//     const [studetnPhotoFormData, setStudentPhotoFormData] = useState({
//         student_id: location.state?.id,
//         student_photo: "",
//     });
//     const [photoSrc, setPhotoSrc] = useState(null);

//     useEffect(() => {
//         try {
//             SystemAxios.get(
//                 `/students/get-student-photo/${location.state?.id}`,
//                 {},
//                 {
//                     withCredentials: true,
//                     headers: {
//                         "X-CSRFToken": getCookie("csrftoken"),
//                     },
//                 }
//             )
//                 .then((response) => {
//                     if (response.status == 200) {
//                         setStudentHasPhoto(true);
//                         setStudentPhotoFormData(response.data);
//                     }
//                 })
//                 .catch((error) => {
//                     setStudentHasPhoto(false);
//                 });
//             // console.log(response.status);
//             // console.log(response.data);
//         } catch (error) {
//             // console.error(error.response.data);
//         }
//         console.log(studetnPhotoFormData);
//     }, []);

//     const handleAddPhotoRequest = (data) => {
//         try {
//             const respone = SystemAxios.post(
//                 "/students/add-student-photo/",
//                 data,
//                 {
//                     withCredentials: true,
//                     headers: {
//                         "X-CSRFToken": getCookie("csrftoken"),
//                         "Content-Type": "multipart/form-data",
//                     },
//                 }
//             );
//             if (respone.status == 201) {
//                 return true;
//             }
//         } catch (error) {
//             console.error(error.response.data);
//         }
//         return false;
//     };

//     const handleUpdatePhotoRequest = (data) => {
//         try {
//             const respone = SystemAxios.put(
//                 "/students/update-student-photo/",
//                 data,
//                 {
//                     withCredentials: true,
//                     headers: {
//                         "X-CSRFToken": getCookie("csrftoken"),
//                     },
//                 }
//             );
//             if (respone.status === 200) {
//                 return true;
//             }
//         } catch (error) {
//             console.error(error.response.data);
//         }
//         return false;
//     };

//     const handleButtonClickEvent = (event) => {
//         event.preventDefault();
//         fileButtonRef.current.click();
//     };

//     const handlePhotoUploadEvent = (event) => {
//         event.preventDefault();
//         const formData = new FormData();
//         formData.append("student_photo", studetnPhotoFormData.student_photo);
//         formData.append("student_id", studetnPhotoFormData.student_id);
//         const result =
//             studentHasPhoto && studentHasChangePhoto
//                 ? handleUpdatePhotoRequest()
//                 : handleAddPhotoRequest();
//         // const result = handleAddPhotoRequest(formData);
//         result ?? navigate(-1);
//     };

//     const handleFileChangeEvent = (event) => {
//         setStudentPhotoFormData((prevData) => ({
//             ...prevData,
//             student_photo: event.target.files[0],
//         }));
//         setStudentHasChangePhoto(true);
//         showPhoto(event.target.files[0]);
//     };

//     const showPhoto = (photo) => {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//             setPhotoSrc(reader.result); // set the image source to the file's data url
//         };

//         reader.readAsDataURL(photo); // read the photo as data url
//     };

//     return (
//         <div>
//             <form onSubmit={handlePhotoUploadEvent}>
//                 <div>
//                     <img
//                         src={
//                             studentHasChangePhoto
//                                 ? photoSrc
//                                 : studentHasPhoto
//                                 ? studetnPhotoFormData.student_photo
//                                 : ""
//                         }
//                         alt="student-img"
//                     />
//                     <button onClick={handleButtonClickEvent}>
//                         اختيار الصورة
//                     </button>
//                 </div>
//                 <input
//                     ref={fileButtonRef}
//                     onChange={handleFileChangeEvent}
//                     className="hidden"
//                     type="file"
//                 />
//                 <button type="submit">حفظ</button>
//             </form>
//         </div>
//     );
// };

// export default StudentPhotoForm;

import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SystemAxios } from "../../utils/custom_axios";
import getCookie from "../../utils/get_cookie";

const StudentPhotoForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const fileButtonRef = useRef(null);
    const [studentHasPhoto, setStudentHasPhoto] = useState(false);
    const [studentHasChangePhoto, setStudentHasChangePhoto] = useState(false);
    const [studentPhotoFormData, setStudentPhotoFormData] = useState({
        student_id: location.state?.id,
        student_photo: "",
    });
    const [photoSrc, setPhotoSrc] = useState(null);

    const fetchStudentPhoto = async () => {
        try {
            const response = await SystemAxios.get(
                `/students/get-student-photo/${location.state?.id}`,
                {
                    withCredentials: true,
                    headers: {
                        "X-CSRFToken": getCookie("csrftoken"),
                    },
                }
            );

            if (response.status === 200) {
                setStudentHasPhoto(true);
                setStudentPhotoFormData(response.data);
            }
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching student photo:", error);
            setStudentHasPhoto(false);
        }
    };

    useEffect(() => {
        fetchStudentPhoto();
    }, [location.state?.id]);

    const handleAddPhotoRequest = async (data) => {
        try {
            const response = await SystemAxios.post(
                "/students/add-student-photo/",
                data,
                {
                    withCredentials: true,
                    headers: {
                        "X-CSRFToken": getCookie("csrftoken"),
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response.status === 201;
        } catch (error) {
            console.error("Error adding photo:", error);
            return false;
        }
    };

    const handleUpdatePhotoRequest = async (data) => {
        try {
            const response = await SystemAxios.put(
                `/students/update-student-photo/${studentPhotoFormData.id}/`,
                data,
                {
                    withCredentials: true,
                    headers: {
                        "X-CSRFToken": getCookie("csrftoken"),
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response.status === 200;
        } catch (error) {
            console.error("Error updating photo:", error);
            return false;
        }
    };

    const handleButtonClickEvent = (event) => {
        event.preventDefault();
        fileButtonRef.current.click();
    };

    const handlePhotoUploadEvent = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("student_photo", studentPhotoFormData.student_photo);
        formData.append("student_id", studentPhotoFormData.student_id);

        const result =
            studentHasPhoto && studentHasChangePhoto
                ? await handleUpdatePhotoRequest(formData)
                : await handleAddPhotoRequest(formData);

        if (result) {
            navigate(-1);
        }
    };

    const handleFileChangeEvent = (event) => {
        setStudentPhotoFormData((prevData) => ({
            ...prevData,
            student_photo: event.target.files[0],
        }));
        setStudentHasChangePhoto(true);
        showPhoto(event.target.files[0]);
    };

    const showPhoto = (photo) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setPhotoSrc(reader.result);
        };
        reader.readAsDataURL(photo);
    };

    return (
        <div>
            <form onSubmit={handlePhotoUploadEvent}>
                <div>
                    <img
                        src={
                            studentHasChangePhoto
                                ? photoSrc
                                : studentHasPhoto
                                ? studentPhotoFormData.student_photo
                                : ""
                        }
                        alt="student-img"
                    />
                    <button onClick={handleButtonClickEvent}>
                        اختيار الصورة
                    </button>
                </div>
                <input
                    ref={fileButtonRef}
                    onChange={handleFileChangeEvent}
                    className="hidden"
                    type="file"
                />
                <button type="submit">حفظ</button>
            </form>
        </div>
    );
};

export default StudentPhotoForm;
