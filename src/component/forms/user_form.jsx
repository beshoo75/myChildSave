// import { useNavigate } from "react-router-dom";
// import { useEffect, useRef, useState } from "react";
// import { SystemAxios } from "../../utils/custom_axios";
// import getCookie from "../../utils/get_cookie";
// import MyLabel from "../widget/my_label";
// import InputField from "../widget/input_field";
// import CustomButton from "../widget/custom_button";
// import {
//     httpToHttps,
//     objectToFormData,
//     photoFileToDataURL,
// } from "../../utils/converters";
// import PropTypes from "prop-types";
// import { toast } from "react-toastify";
// import teamImage from "../../assets/img/team-3.jpg";

// export default function UserForm({ userID, isStaff, isReadOnly }) {
//     // const location = useLocation();

//     const [userFormDataObject, setUserFormDataObject] = useState({
//         photo: null,
//         username: "",
//         first_name: "",
//         last_name: "",
//         phone_number: "",
//         home_address: "",
//         id_doc: "",
//         email: "",
//         nationality: "",
//         is_staff: isStaff,
//         is_superuser: false,
//     });
//     const [userHasPhoto, setUserHasPhoto] = useState(false);
//     const [userHasChangePhoto, setUserHasChangePhoto] = useState(false);
//     const [photoSrc, setPhotoSrc] = useState(null);
//     // const [loading, setLoading] = useState(false);

//     const navigate = useNavigate();

//     const fileButtonRef = useRef();

//     const defaultPassword = "00000000";

//     const onFormSubmit = (event) => {
//         event.preventDefault();
//         if (userID > 0) {
//             updateUserData();
//         } else {
//             saveNewUserData();
//         }
//     };

//     const getUserData = async () => {
//         try {
//             const response = await SystemAxios.get(`/users/${userID}/`, {
//                 withCredentials: true,
//                 headers: {
//                     "X-CSRFToken": getCookie("csrftoken"),
//                 },
//             });
//             if (response.status === 200) {
//                 // const data = response.data;
//                 setUserFormDataObject((prevData) => ({
//                     ...prevData,
//                     ...response.data,
//                 }));
//                 setUserHasPhoto(response.data.photo ? true : false);
//             }
//         } catch (error) {
//             console.error(error.response);
//         }
//     };

//     useEffect(() => {
//         if (!getCookie("csrftoken")) {
//             navigate("/");
//         }

//         if (userID > 0) {
//             getUserData();
//         }
//     }, []);

//     const saveNewUserData = async () => {
//         // setLoading(true);
//         // for (let key in userFormDataObject) {
//         //     console.log(
//         //         `${key}=>${
//         //             userFormDataObject[key]
//         //         } - ${typeof userFormDataObject[key]}`
//         //     );
//         // }
//         try {
//             let tempData = userFormDataObject;
//             tempData["passsword"] = defaultPassword;
//             const formData = objectToFormData(userFormDataObject);
//             const response = await SystemAxios.post(
//                 userHasChangePhoto ? "/users/create/" : "users/create-data/",
//                 userHasChangePhoto ? formData : tempData,
//                 {
//                     withCredentials: true,
//                     headers: userHasChangePhoto
//                         ? {
//                               "Content-Type": "multipart/form-data",
//                               "X-CSRFToken": getCookie("csrftoken"),
//                           }
//                         : {
//                               "X-CSRFToken": getCookie("csrftoken"),
//                           },
//                 }
//             );

//             if (response.status === 201) {
//                 toast("تم إنشاء حساب المستخدم بنجاح");
//                 // navigate(-1); // Navigate back after creation
//             }
//         } catch (error) {
//             console.error(error.response);
//             // alert(error.message);
//         } finally {
//             // setLoading(false);
//         }
//     };

//     const updateUserData = async () => {
//         try {
//             const formData = objectToFormData(userFormDataObject);
//             const response = await SystemAxios.put(
//                 userHasChangePhoto
//                     ? `/users/update/${userID}/`
//                     : `/users/update-data/${userID}/`,
//                 userHasChangePhoto ? formData : userFormDataObject,
//                 {
//                     withCredentials: true,
//                     headers: userHasChangePhoto
//                         ? {
//                               "Content-Type": "multipart/form-data",
//                               "X-CSRFToken": getCookie("csrftoken"),
//                           }
//                         : {
//                               "X-CSRFToken": getCookie("csrftoken"),
//                           },
//                 }
//             );

//             if (response.status === 200) {
//                 toast("تم تعديل حساب المستخدم بنجاح");
//                 // navigate(-1);
//             }
//         } catch (error) {
//             console.error(error.response.data);
//         } finally {
//             // setLoading(false);
//         }
//     };

//     const handleButtonClickEvent = (event) => {
//         event.preventDefault();
//         fileButtonRef.current.click();
//     };

//     const handleFileChangeEvent = (event) => {
//         setUserFormDataObject((prevData) => ({
//             ...prevData,
//             photo: event.target.files[0],
//         }));
//         if (event.target.files[0] != null) {
//             setUserHasChangePhoto(true);
//             photoFileToDataURL(event.target.files[0], setPhotoSrc);
//         }
//     };

//     const handleInputText = (event) => {
//         const { name, value } = event.target;
//         setUserFormDataObject((prevData) => ({ ...prevData, [name]: value }));
//     };

//     const getPageTitle = () => {
//         let title = "";
//         if (isReadOnly) {
//             title = "عرض بيانات";
//         } else {
//             if (userID > 0) {
//                 title = "تعديل بيانات";
//             } else {
//                 title = "إضافة بيانات";
//             }
//         }

//         if (isStaff) {
//             title += " مشرف الحافلة";
//         } else {
//             title += " ولي الأمر";
//         }
//         return title;
//     };

//     return (
//         <>
//             <div className="w-4/5 lg:w-3/5 m-auto h-5/6 p-6 shadow-xl text-center">
//                 {/* <img src={logo} alt="not found" className="h-1/5" /> */}

//                 <h2 className="text-center">{getPageTitle()}</h2>
//                 <form
//                     // className="grid grid-cols-1 space-x-10 lg:grid-cols-2"
//                     className="flex flex-col justify-center items-center space-x-10 w-full"
//                     onSubmit={onFormSubmit}
//                 >
//                     <div className="w-full lg:row-span-3">
//                         <img
//                             className="w-1/2 bg-gray-100 rounded-tl-lg rounded-tr-lg m-auto"
//                             src={
//                                 userHasChangePhoto
//                                     ? photoSrc
//                                     : userHasPhoto
//                                     ? import.meta.env.MODE === "development"
//                                         ? httpToHttps(userFormDataObject.photo)
//                                         : userFormDataObject.photo
//                                     : teamImage
//                             }
//                             alt="user-img"
//                         />
//                         {isReadOnly ? (
//                             <></>
//                         ) : (
//                             <div className="w-fullr">
//                                 <button
//                                     className="bg-slate-400 text-white w-1/2 h-12 rounded-br-md rounded-bl-md mx-auto"
//                                     onClick={handleButtonClickEvent}
//                                 >
//                                     اختيار الصورة
//                                 </button>
//                             </div>
//                         )}
//                         <input
//                             name="photo"
//                             ref={fileButtonRef}
//                             onChange={handleFileChangeEvent}
//                             className="hidden"
//                             type="file"
//                         />
//                         <div className="w-1/2 m-auto text-right">
//                             <MyLabel text="رقم الهوية او الاقامة" />
//                             <InputField
//                                 name="id_doc"
//                                 value={userFormDataObject.id_doc}
//                                 onChange={handleInputText}
//                                 type="number"
//                                 placeholder="1234"
//                                 isReadOnly={isReadOnly}
//                             />
//                         </div>
//                         <div className="m-auto w-1/2 text-right">
//                             <MyLabel text="رقم الجوال" />
//                             <InputField
//                                 name="phone_number"
//                                 value={userFormDataObject.phone_number}
//                                 onChange={handleInputText}
//                                 type="phone"
//                                 placeholder="00996"
//                                 isReadOnly={isReadOnly}
//                             />
//                         </div>
//                         <div className="m-auto w-1/2 text-right">
//                             <MyLabel text="اسم المستخدم" />
//                             <InputField
//                                 name="username"
//                                 value={userFormDataObject.username}
//                                 onChange={handleInputText}
//                                 type="username"
//                                 placeholder="اسم المستخدم"
//                                 isReadOnly={isReadOnly}
//                             />
//                         </div>
//                         <div className="m-auto w-1/2 text-right">
//                             <MyLabel text="الاسم الاول" />
//                             <InputField
//                                 name="first_name"
//                                 value={userFormDataObject.first_name}
//                                 onChange={handleInputText}
//                                 type="text"
//                                 placeholder="الاسم الاول"
//                                 isReadOnly={isReadOnly}
//                             />
//                         </div>
//                         <div className="m-auto w-1/2 text-right">
//                             <MyLabel text="الاسم الاخير" />
//                             <InputField
//                                 value={userFormDataObject.last_name}
//                                 name="last_name"
//                                 onChange={handleInputText}
//                                 type="text"
//                                 placeholder="اللقب"
//                                 isReadOnly={isReadOnly}
//                             />
//                         </div>
//                         <div className="w-1/2 m-auto text-right">
//                             <MyLabel text="الايميل" />
//                             <InputField
//                                 name="email"
//                                 value={userFormDataObject.email}
//                                 onChange={handleInputText}
//                                 type="email"
//                                 placeholder="ex@mail.com"
//                                 isReadOnly={isReadOnly}
//                             />
//                         </div>
//                         <div className="w-1/2 m-auto text-right">
//                             <MyLabel text="الجنسية" />
//                             <InputField
//                                 name="nationality"
//                                 value={userFormDataObject.nationality}
//                                 onChange={handleInputText}
//                                 type="text"
//                                 placeholder="nationality"
//                                 isReadOnly={isReadOnly}
//                             />
//                         </div>
//                         <div className="m-auto w-1/2 text-right">
//                             <MyLabel text="العنوان" />
//                             <InputField
//                                 name="home_address"
//                                 value={userFormDataObject.home_address}
//                                 onChange={handleInputText}
//                                 type="text"
//                                 placeholder="address"
//                                 isReadOnly={isReadOnly}
//                             />
//                         </div>
//                         {isReadOnly ? (
//                             <></>
//                         ) : (
//                             <div className="m-auto w-1/2 text-right">
//                                 <CustomButton
//                                     type="submit"
//                                     text={userID == 0 ? "اضافة" : "تعديل"}
//                                 />
//                             </div>
//                         )}
//                     </div>
//                 </form>
//             </div>
//         </>
//     );
// }

// UserForm.propTypes = {
//     userID: PropTypes.number.isRequired,
//     isStaff: PropTypes.bool.isRequired,
//     isReadOnly: PropTypes.bool.isRequired,
// };

import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { SystemAxios } from "../../utils/custom_axios";
import getCookie from "../../utils/get_cookie";
import MyLabel from "../widget/my_label";
import InputField from "../widget/input_field";
import CustomButton from "../widget/custom_button";
import {
    httpToHttps,
    objectToFormData,
    photoFileToDataURL,
} from "../../utils/converters";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import teamImage from "../../assets/img/team-3.jpg";

export default function UserForm({ userID, isStaff, isReadOnly }) {
    const [userFormDataObject, setUserFormDataObject] = useState({
        photo: null,
        username: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        home_address: "",
        id_doc: "",
        email: "",
        nationality: "",
        is_staff: isStaff,
        is_superuser: false,
    });
    const [userHasPhoto, setUserHasPhoto] = useState(false);
    const [userHasChangePhoto, setUserHasChangePhoto] = useState(false);
    const [photoSrc, setPhotoSrc] = useState(null);
    const navigate = useNavigate();
    const fileButtonRef = useRef();
    const defaultPassword = "00000000";

    const onFormSubmit = (event) => {
        event.preventDefault();
        userID > 0 ? updateUserData() : saveNewUserData();
    };

    const getUserData = async () => {
        try {
            const response = await SystemAxios.get(`/users/${userID}/`, {
                withCredentials: true,
                headers: {
                    "X-CSRFToken": getCookie("csrftoken"),
                },
            });
            if (response.status === 200) {
                setUserFormDataObject((prevData) => ({
                    ...prevData,
                    ...response.data,
                }));
                setUserHasPhoto(!!response.data.photo);
            }
        } catch (error) {
            console.error(error.response);
        }
    };

    useEffect(() => {
        if (!getCookie("csrftoken")) {
            navigate("/");
        }
        if (userID > 0) {
            getUserData();
        }
    }, []);

    const saveNewUserData = async () => {
        try {
            let tempData = userFormDataObject;
            tempData.password = defaultPassword;

            console.log(tempData);
            const formData = objectToFormData(userFormDataObject);
            const response = await SystemAxios.post(
                userHasChangePhoto ? "/users/create/" : "users/create-data/",
                userHasChangePhoto ? formData : tempData,
                {
                    withCredentials: true,
                    headers: userHasChangePhoto
                        ? {
                              "Content-Type": "multipart/form-data",
                              "X-CSRFToken": getCookie("csrftoken"),
                          }
                        : { "X-CSRFToken": getCookie("csrftoken") },
                }
            );

            if (response.status === 200 || response.status == 201) {
                toast("تم إنشاء حساب المستخدم بنجاح");
            }
        } catch (error) {
            console.error(error.response);
        }
    };

    const updateUserData = async () => {
        try {
            const formData = objectToFormData(userFormDataObject);
            const response = await SystemAxios.put(
                userHasChangePhoto
                    ? `/users/update/${userID}/`
                    : `/users/update-data/${userID}/`,
                userHasChangePhoto ? formData : userFormDataObject,
                {
                    withCredentials: true,
                    headers: userHasChangePhoto
                        ? {
                              "Content-Type": "multipart/form-data",
                              "X-CSRFToken": getCookie("csrftoken"),
                          }
                        : { "X-CSRFToken": getCookie("csrftoken") },
                }
            );

            if (response.status === 200 || response.status==201) {
                toast("تم تعديل حساب المستخدم بنجاح");
            }
        } catch (error) {
            console.error(error.response.data);
        }
    };

    const handleButtonClickEvent = (event) => {
        event.preventDefault();
        fileButtonRef.current.click();
    };

    const handleFileChangeEvent = (event) => {
        const file = event.target.files[0];
        setUserFormDataObject((prevData) => ({
            ...prevData,
            photo: file,
        }));
        if (file) {
            setUserHasChangePhoto(true);
            photoFileToDataURL(file, setPhotoSrc);
        }
    };

    const handleInputText = (event) => {
        const { name, value } = event.target;
        setUserFormDataObject((prevData) => ({ ...prevData, [name]: value }));
    };

    const getPageTitle = () => {
        let title = isReadOnly
            ? "عرض بيانات"
            : userID > 0
            ? "تعديل بيانات"
            : "إضافة بيانات";
        return title + (isStaff ? " مشرف الحافلة" : " ولي الأمر");
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-xl">
            <h2 className="text-center text-xl font-bold mb-4">
                {getPageTitle()}
            </h2>
            <form
                className="flex flex-col items-center space-y-4"
                onSubmit={onFormSubmit}
            >
                <div className="flex flex-col items-center w-full">
                    <img
                        className="w-1/2 md:w-1/3 lg:w-1/4 bg-gray-100 rounded-lg"
                        src={
                            userHasChangePhoto
                                ? photoSrc
                                : userHasPhoto
                                ? import.meta.env.MODE === "development"
                                    ? httpToHttps(userFormDataObject.photo)
                                    : userFormDataObject.photo
                                : teamImage
                        }
                        alt="user-img"
                    />
                    {!isReadOnly && (
                        <button
                            className="bg-slate-400 text-white w-1/2 h-12 rounded-md mt-2"
                            onClick={handleButtonClickEvent}
                        >
                            اختيار الصورة
                        </button>
                    )}
                    <input
                        name="photo"
                        ref={fileButtonRef}
                        onChange={handleFileChangeEvent}
                        className="hidden"
                        type="file"
                    />
                </div>
                {[
                    {
                        label: "رقم الهوية او الاقامة",
                        name: "id_doc",
                        type: "number",
                    },
                    { label: "رقم الجوال", name: "phone_number", type: "tel" },
                    { label: "اسم المستخدم", name: "username", type: "text" },
                    { label: "الاسم الاول", name: "first_name", type: "text" },
                    { label: "الاسم الاخير", name: "last_name", type: "text" },
                    { label: "الايميل", name: "email", type: "email" },
                    { label: "الجنسية", name: "nationality", type: "text" },
                    { label: "العنوان", name: "home_address", type: "text" },
                ].map(({ label, name, type }) => (
                    <div key={name} className="w-full max-w-lg">
                        <MyLabel text={label} />
                        <InputField
                            name={name}
                            value={userFormDataObject[name]}
                            onChange={handleInputText}
                            type={type}
                            placeholder={label}
                            isReadOnly={isReadOnly}
                        />
                    </div>
                ))}
                {!isReadOnly && (
                    <div className="w-full max-w-lg">
                        <CustomButton
                            type="submit"
                            text={userID === 0 ? "اضافة" : "تعديل"}
                        />
                    </div>
                )}
            </form>
        </div>
    );
}

UserForm.propTypes = {
    userID: PropTypes.number.isRequired,
    isStaff: PropTypes.bool.isRequired,
    isReadOnly: PropTypes.bool.isRequired,
};
