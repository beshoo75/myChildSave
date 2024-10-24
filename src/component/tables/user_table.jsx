import PropTypes from "prop-types";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import getCookie from "../../utils/get_cookie.js";
// import { AppContext } from "../utils/context.jsx";
import { SystemAxios } from "../../utils/custom_axios.js";
import { httpToHttps } from "../../utils/converters.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAdd,
    faEdit,
    faInfoCircle,
    faLockOpen,
    faRemove,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";

const UserTable = ({ type }) => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    // const { setSharedVariable } = useContext(AppContext);

    const handleDeleteButtonEvent = useCallback(async (e, user_Id) => {
        e.preventDefault();
        try {
            const response = await SystemAxios.delete(
                `/users/delete/${user_Id}/`,
                {
                    withCredentials: true,
                    headers: {
                        "X-CSRFToken": getCookie("csrftoken"),
                    },
                }
            );
            if (response.status == 204) {
                alert(`User deleted`);
                setData((prevData) =>
                    prevData.filter((user) => user.id !== user_Id)
                );
            }
        } catch (error) {
            console.error("Error deleting user. Please try again.");
            console.error("Error deleting user:", error);
        }
    }, []);

    const fetchData = async () => {
        try {
            const response = await SystemAxios.get(`/users?type=${type}`, {
                withCredentials: true,
                headers: {
                    "X-CSRFToken": getCookie("csrftoken"),
                },
            });
            if (response.status == 200) {
                setData(response.data);
            }
        } catch (error) {
            console.error("Error fetching data. Please try again later.");
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddButtonEvent = (event) => {
        event.preventDefault();
        navigate("/form/add", {
            state: {
                id: 0,
                staff: type == 1 ? true : false,
                readOnly: false,
            },
        });
    };

    const hanldeUnlockButtonEvent = async (event, id) => {
        event.preventDefault();

        await SystemAxios.post(
            "/users/reset-password/",
            { user_id: id, default_password: "00000000" },
            {
                withCredentials: true,
                headers: {
                    "X-CSRFToken": getCookie("csrftoken"),
                },
            }
        )
            .then((response) =>
                console.log("Password reseted successfully " + response.status)
            )
            .catch((error) => console.error(error.response));
    };

    const handleEditButtonEvent = (event, id) => {
        event.preventDefault();
        navigate("/form/edit", {
            state: {
                id: id,
                staff: type == 1 ? true : false,
                readOnly: false,
            },
        });
    };

    const handleViewButtonEvent = (event, id) => {
        event.preventDefault();
        navigate("/form/view", {
            state: {
                id: id,
                staff: type == 1 ? true : false,
                readOnly: true,
            },
        });
    };

    if (loading) {
        return <div className="text-center p-4">Loading...</div>;
    }

    return (
        <div className="p-4 shadow-xl w-11/12 m-auto">
            {/* {error && <div className="text-red-500 text-center">{error}</div>} */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-4xl font-bold">
                    {type === 1 ? "المشرفين" : "أولياء الأمور"}
                </h1>
                <button
                    onClick={handleAddButtonEvent}
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
                >
                    {/* اضافة {type === 1 ? "مشرف" : "ولي أمر"} */}
                    <FontAwesomeIcon icon={faAdd} />
                </button>
            </div>
            <div className="w-full overflow-auto">
                <table className="w-full m-auto min-w-fullbg-white border border-gray-300">
                    <thead className=" bg-gray-200">
                        <tr>
                            <th className="py-2 px-4 border">الصورة</th>
                            <th className="py-2 px-4 border">الاسم</th>
                            <th className="py-2 px-4 border">اللقب</th>
                            <th className="py-2 px-4 border">الجنسية</th>
                            <th className="py-2 px-4 border"></th>
                            <th className="py-2 px-4 border"></th>
                            <th className="py-2 px-4 border"></th>
                            <th className="py-2 px-4 border"></th>
                        </tr>
                    </thead>
                    <tbody className="text-center ">
                        {data.map((user) => (
                            <tr
                                key={user.id}
                                className="hover:bg-gray-100 transition"
                            >
                                <td className="py-2 px-4">
                                    <img
                                        alt={user.username}
                                        src={httpToHttps(user.photo)}
                                        // src={user.photo}
                                        className="w-12 h-12 rounded-full m-auto"
                                    />
                                </td>
                                <td className="py-2 px-4">{user.first_name}</td>
                                <td className="py-2 px-4">{user.last_name}</td>
                                <td className="py-2 px-4">
                                    {user.nationality}
                                </td>
                                <td className="">
                                    <button
                                        onClick={(e) =>
                                            handleViewButtonEvent(e, user.id)
                                        }
                                        className="bg-blue-400 text-white py-1 px-3 rounded hover:bg-blue-600 transition"
                                        aria-label={`Chat with ${user.first_name}`}
                                    >
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={(e) =>
                                            handleEditButtonEvent(e, user.id)
                                        }
                                        className="transitionborder-2 bg-yellow-400 py-1 px-3 rounded hover:bg-yellow-600 text-white transition"
                                        aria-label={`Edit ${user.first_name}`}
                                    >
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={(e) =>
                                            handleDeleteButtonEvent(e, user.id)
                                        }
                                        className="bg-red-400 text-white py-1 px-3 rounded hover:bg-red-600 transition"
                                        aria-label={`Delete ${user.first_name}`}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={(e) =>
                                            hanldeUnlockButtonEvent(e, user.id)
                                        }
                                        className="bg-gray-400 text-white py-1 px-3 rounded hover:bg-gray-600 transition"
                                        aria-label={`Delete ${user.first_name}`}
                                    >
                                        <FontAwesomeIcon icon={faLockOpen} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserTable;

UserTable.propTypes = {
    type: PropTypes.number.isRequired,
};
