// import { useEffect, useState } from "react";
// // import axios from "axios";
// import getCookie from "../../utils/get_cookie";
// import { SystemAxios } from "../../utils/custom_axios";
// import { httpToHttps } from "../../utils/converters";

// const ParentsProfile = () => {
//     const [userData, setUserData] = useState({});
//     const [isEditing, setIsEditing] = useState(false);
//     const [formData, setFormData] = useState({});
//     const userId = localStorage.getItem("id");

//     const fetchData = async () => {
//         try {
//             console.log(userId);
//             const response = await SystemAxios.get(
//                 `/users/profile/${userId}/`,
//                 {
//                     withCredentials: true,
//                     headers: {
//                         "X-CSRFToken": getCookie("csrftoken"),
//                     },
//                 }
//             );
//             setUserData(response.data);
//             setFormData(response.data); // Initialize formData for editing
//         } catch (error) {
//             console.error("Error fetching data:", error);
//             // يمكنك إضافة رسالة خطأ هنا إذا لزم الأمر
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     const handleEditToggle = () => {
//         setIsEditing(!isEditing);
//     };

//     const handleSave = async () => {
//         try {
//             await SystemAxios.put(`/users/profile/update/${userId}`, formData); // Replace with your API endpoint
//             setUserData(formData);
//             setIsEditing(false);
//         } catch (error) {
//             console.error("Error updating data:", error);
//         }
//     };

//     return (
//         <div className="max-w-md mx-auto p-6 border rounded-lg shadow-lg bg-white">
//             <h1 className="text-2xl text-center font-bold text-green-600 mb-4">
//                 {" "}
//                 {localStorage.getItem("first_name")}
//             </h1>
//             <div className="flex items-center mb-4">
//                 <img
//                     src={
//                         import.meta.env.MODE === "development"
//                             ? httpToHttps(userData.photo)
//                             : userData.photo
//                     }
//                     alt="Profile"
//                     className="w-24 h-24 rounded-full mr-4"
//                 />
//                 <div>
//                     <h2 className="text-xl">{userData.username}</h2>
//                     <p>{userData.email}</p>
//                 </div>
//             </div>
//             <div>
//                 {Object.keys(userData).map(
//                     (key) =>
//                         key !== "photo" &&
//                         key !== "password" && (
//                             <div className="mb-2" key={key}>
//                                 <label className="block text-gray-700 capitalize">
//                                     {key}
//                                 </label>
//                                 <input
//                                     type={key === "email" ? "email" : "text"}
//                                     name={key}
//                                     value={formData[key]}
//                                     onChange={handleChange}
//                                     disabled={!isEditing}
//                                     className={`mt-1 block w-full border rounded-md p-2 ${
//                                         isEditing
//                                             ? "border-gray-300"
//                                             : "bg-gray-100"
//                                     }`}
//                                 />
//                             </div>
//                         )
//                 )}
//             </div>
//             <div className="flex justify-between mt-4">
//                 <button
//                     onClick={handleEditToggle}
//                     className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//                 >
//                     {isEditing ? "Cancel" : "Edit"}
//                 </button>
//                 {isEditing && (
//                     <button
//                         onClick={handleSave}
//                         className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//                     >
//                         Save
//                     </button>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ParentsProfile;

import { useEffect, useState } from "react";
import getCookie from "../../utils/get_cookie";
import {
    getAxiosSecureFormHeader,
    SystemAxios,
} from "../../utils/custom_axios";
import { httpToHttps } from "../../utils/converters";
import { toast } from "react-toastify";

const ParentsProfile = () => {
    const [userData, setUserData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem("id");

    const fetchData = async () => {
        try {
            const response = await SystemAxios.get(
                `/users/profile/${userId}/`,
                // {
                //     withCredentials: true,
                //     headers: {
                //         "X-CSRFToken": getCookie("csrftoken"),
                //     },
                // }
                getAxiosSecureFormHeader()
            );
            setUserData(response.data);
            setFormData(response.data); // Initialize formData for editing
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Error fetching profile data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = async () => {
        try {
            let tempData = formData;
            delete tempData.photo;
            const response = await SystemAxios.put(
                `/users/profile/update/${userId}/`,
                tempData,
                getAxiosSecureFormHeader()
            );
            // setUserData(formData);
            if (response.status === 200) {
                setIsEditing(false);
                toast("تم تعديل البيانات بشكل صحيح");
            }
        } catch (error) {
            console.error("Error updating data:", error);
            setError("Error updating profile. Please try again.");
        }
    };

    const getProfileImageSrc = (photo) => {
        return import.meta.env.MODE === "development"
            ? httpToHttps(photo)
            : photo;
    };

    if (loading) {
        return <div>Loading...</div>; // Add a loading message or spinner
    }

    return (
        <div className="max-w-md mx-auto p-6 border rounded-lg shadow-lg bg-white">
            <h1 className="text-2xl text-center font-bold text-green-600 mb-4">
                {localStorage.getItem("first_name")}
            </h1>
            {error && <p className="text-red-500">{error}</p>}{" "}
            {/* Display error message */}
            <div className="flex items-center mb-4">
                <img
                    src={getProfileImageSrc(userData.photo)}
                    alt="Profile"
                    className="w-24 h-24 rounded-full mr-4"
                />
                <div>
                    <h2 className="text-xl">{userData.username}</h2>
                    <p>{userData.email}</p>
                </div>
            </div>
            <div>
                {Object.keys(userData).map((key) =>
                    key !== "photo" &&
                    key !== "password" &&
                    key !== "is_superuser" &&
                    key !== "is_staff" &&
                    key !== "id" ? (
                        <div className="mb-2" key={key}>
                            <label
                                className="block text-gray-700 capitalize"
                                htmlFor={key}
                            >
                                {key}
                            </label>
                            <input
                                type={key === "email" ? "email" : "text"}
                                name={key}
                                id={key}
                                value={formData[key] || ""}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`mt-1 block w-full border rounded-md p-2 ${
                                    isEditing
                                        ? "border-gray-300"
                                        : "bg-gray-100"
                                }`}
                            />
                        </div>
                    ) : null
                )}
            </div>
            <div className="flex justify-between mt-4">
                <button
                    onClick={handleEditToggle}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    {isEditing ? "Cancel" : "Edit"}
                </button>
                {isEditing && (
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Save
                    </button>
                )}
            </div>
        </div>
    );
};

export default ParentsProfile;
