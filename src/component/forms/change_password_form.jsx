// import { useRef, useState } from "react";
// import { SystemAxios } from "../../utils/custom_axios";
// import getCookie from "../../utils/get_cookie";
// import { toast, ToastContainer } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const ChangePasswordForm = () => {
//     const coNewPasswordRef = useRef();
//     const [formData, setFormData] = useState({
//         old_password: "",
//         new_password: "",
//     });
//     const navigate = useNavigate();

//     const hanldeInputChangeEvent = (event) => {
//         const { name, value } = event.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleFormSubmitEvent = async (event) => {
//         event.preventDefault();
//         if (formData.new_password === coNewPasswordRef.current.value) {
//             await changeUserPasswordRequest();
//         } else {
//             toast("تأكد من كتابة كلمة المرور الجديدة");
//         }
//     };

//     const changeUserPasswordRequest = async () => {
//         try {
//             const response = await SystemAxios.put(
//                 "/users/profile/change-password/",
//                 formData,
//                 {
//                     withCredentials: true,
//                     headers: {
//                         "X-CSRFToken": getCookie("csrftoken"),
//                     },
//                 }
//             );

//             if (response.status == 200) {
//                 console.log("done");
//                 toast("تم تغيير كلمة المرور بنجاح");
//                 navigate(-1);
//             }
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <>
//             <ToastContainer />
//             <div>
//                 <h1>تغيير كلمة المرور</h1>
//                 <form onSubmit={handleFormSubmitEvent}>
//                     <input
//                         type="password"
//                         onChange={hanldeInputChangeEvent}
//                         name="old_password"
//                         value={formData.old_password}
//                         placeholder="كلمة المرور الحالية"
//                     />
//                     <input
//                         type="password"
//                         value={formData.new_password}
//                         onChange={hanldeInputChangeEvent}
//                         name="new_password"
//                         placeholder="كلمة المرور الجديدة"
//                     />
//                     <input
//                         type="password"
//                         ref={coNewPasswordRef}
//                         name="co_new_password"
//                         placeholder="تأكيد كلمة المرور الجديدة"
//                     />
//                     <button type="submit">تغيير</button>
//                 </form>
//             </div>
//         </>
//     );
// };

// export default ChangePasswordForm;

import { useRef, useState } from "react";
import { SystemAxios } from "../../utils/custom_axios";
import getCookie from "../../utils/get_cookie";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { faLock, faRecycle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ChangePasswordForm = () => {
    const color = "blue";
    const coNewPasswordRef = useRef();
    const [formData, setFormData] = useState({
        old_password: "",
        new_password: "",
    });
    const navigate = useNavigate();

    const handleInputChangeEvent = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmitEvent = async (event) => {
        event.preventDefault();
        if (formData.new_password === coNewPasswordRef.current.value) {
            await changeUserPasswordRequest();
        } else {
            toast("تأكد من كتابة كلمة المرور الجديدة");
        }
    };

    const changeUserPasswordRequest = async () => {
        try {
            const response = await SystemAxios.put(
                "/users/profile/change-password/",
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "X-CSRFToken": getCookie("csrftoken"),
                    },
                }
            );

            if (response.status === 200) {
                toast("تم تغيير كلمة المرور بنجاح");
                navigate(-1);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="max-screen h-screen flex flex-col items-center justify-center">
                <div className="flex flex-col justify-center items-center w-11/12 md:w-3/5 lg:w-1/3 p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
                    <div className={`text-9xl text-${color}-500 mb-16 lg:mb-12 relative flex justify-center items-center`}>
                        <FontAwesomeIcon
                            icon={faRecycle}
                            className="text-7xl text-white absolute top-14 right-5"
                        />
                        <FontAwesomeIcon icon={faLock} className="" />
                    </div>
                    <h1 className="text-3xl font-semibold text-center mb-6">
                        تغيير كلمة المرور
                    </h1>
                    <form
                        onSubmit={handleFormSubmitEvent}
                        className="space-y-4"
                    >
                        <input
                            type="password"
                            onChange={handleInputChangeEvent}
                            name="old_password"
                            value={formData.old_password}
                            placeholder="كلمة المرور الحالية"
                            className={`w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-${color}-500`}
                            required
                        />
                        <input
                            type="password"
                            value={formData.new_password}
                            onChange={handleInputChangeEvent}
                            name="new_password"
                            placeholder="كلمة المرور الجديدة"
                            className={`w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-${color}-500`}
                            required
                        />
                        <input
                            type="password"
                            ref={coNewPasswordRef}
                            name="co_new_password"
                            placeholder="تأكيد كلمة المرور الجديدة"
                            className={`w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-${color}-500`}
                            required
                        />
                        <button
                            type="submit"
                            className={`w-full p-3 bg-${color}-500 text-white rounded hover:bg-${color}-600 transition`}
                        >
                            تغيير
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ChangePasswordForm;
