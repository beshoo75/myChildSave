import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import getCookie from "../utils/get_cookie";
import { AppContext } from "../utils/context";
import { SystemAxios } from "../utils/custom_axios";
import { httpToHttps } from "../utils/converters";
const Profile = () => {
    const [userData, setUserData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const userId = localStorage.getItem("id");
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(userId);
                const response = await SystemAxios.get(`/users/${userId}/`, {
                    withCredentials: true,
                    headers: {
                        "X-CSRFToken": getCookie("csrftoken"),
                    },
                });
                setUserData(response.data);
                setFormData(response.data); // Initialize formData for editing
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                // يمكنك إضافة رسالة خطأ هنا إذا لزم الأمر
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = async () => {
        try {
            await SystemAxios.put("/users/", formData); // Replace with your API endpoint
            setUserData(formData);
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating data:", error);
        }
    };

    return isLoading ? (
        <div>is loading</div>
    ) : (
        <div className="max-w-md mx-auto p-6 border rounded-lg shadow-lg bg-white">
            <h1 className="text-2xl font-bold text-green-600 mb-4">
                User Profile
            </h1>
            <div className="flex items-center mb-4">
                <img
                    src={httpToHttps(userData.photo)}
                    alt="Profile"
                    className="w-24 h-24 rounded-full mr-4"
                />
                <div>
                    <h2 className="text-xl">{userData.username}</h2>
                    <p>{userData.email}</p>
                </div>
            </div>
            <div>
                {Object.keys(userData).map(
                    (key) =>
                        key !== "photo" && (
                            <div className="mb-2" key={key}>
                                <label className="block text-gray-700 capitalize">
                                    {key}
                                </label>
                                <input
                                    type={key === "email" ? "email" : "text"}
                                    name={key}
                                    value={formData[key]}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`mt-1 block w-full border rounded-md p-2 ${
                                        isEditing
                                            ? "border-gray-300"
                                            : "bg-gray-100"
                                    }`}
                                />
                            </div>
                        )
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

export default Profile;
