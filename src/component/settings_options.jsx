import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEdit, faLock } from "@fortawesome/free-solid-svg-icons";

const SettingsOptions = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center md:text-4xl ">
                الاعدادات
            </h1>
            <div className="space-y-4 w-full max-w-xs md:max-w-md">
                <Link
                    to="view-profile"
                    state={{
                        id: parseInt(localStorage.getItem("id")),
                        staff: false,
                        readOnly: true,
                    }}
                >
                    <button className="w-full px-4 py-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300 flex items-center justify-center space-x-4">
                        <FontAwesomeIcon className="ml-2" icon={faUser} />
                        <span>عرض الملف الشخصي</span>
                    </button>
                </Link>

                {localStorage.getItem("is_superuser") !== "true" ? (
                    <Link
                        to="edit-profile"
                        state={{
                            id: parseInt(localStorage.getItem("id")),
                            staff: false,
                            readOnly: false,
                        }}
                    >
                        <button className="w-full px-4 py-4 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition duration-300 flex items-center justify-center space-x-2">
                            <FontAwesomeIcon className="ml-2" icon={faEdit} />
                            <span>تعديل الملف الشخصي</span>
                        </button>
                    </Link>
                ) : (
                    <></>
                )}
                <Link to="change-password">
                    <button className="w-full px-4 py-4 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition duration-300 flex items-center justify-center space-x-4">
                        <FontAwesomeIcon className="ml-2" icon={faLock} />
                        <span>تغيير كلمة المرور</span>
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default SettingsOptions;
