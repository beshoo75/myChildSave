import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/img/logos/logo.png";
import { SystemAxios } from "../utils/custom_axios";
import getCookie from "../utils/get_cookie";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LoginPage() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const validateForm = () => {
        if (!username || !password) {
            toast.error("يرجى ملء جميع الحقول!"); // Use toast.error for better clarity
            return false;
        }
        return true;
    };

    const onSubmitLogin = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await SystemAxios.post(
                "/users/login/",
                { username, password },
                { withCredentials: true }
            );

            if (response.status === 200) {
                // Store user data in local storage
                const { id, email, first_name, last_name, is_superuser, is_staff } = response.data;
                localStorage.setItem("id", id);
                localStorage.setItem("username", username);
                localStorage.setItem("email", email);
                localStorage.setItem("first_name", first_name);
                localStorage.setItem("last_name", last_name);
                localStorage.setItem("is_superuser", is_superuser);
                localStorage.setItem("is_staff", is_staff);

                // Navigate based on user role
                if (is_superuser) {
                    navigate("AdminHomePage");
                } else if (is_staff) {
                    navigate("SuperHomePage");
                } else {
                    navigate("HomeParent");
                }
            }
        } catch (error) {
            console.error(error);
            toast.error("اسم المستخدم أو كلمة السر غير صحيحة!");
        }
    };

    const checkLoginIsValid = async () => {
        try {
            const response = await SystemAxios.get("/users/check-auth/", {
                withCredentials: true,
                headers: {
                    "X-CSRFToken": getCookie("csrftoken"),
                },
            });

            if (response.status === 200) {
                const { is_superuser, is_staff } = response.data;
                if (is_superuser) {
                    navigate("AdminHomePage");
                } else if (is_staff) {
                    navigate("SuperHomePage");
                } else {
                    navigate("HomeParent");
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (getCookie("csrftoken") && localStorage.getItem("id")) {
            checkLoginIsValid();
        }
    }, []);

    return (
        <>
            <ToastContainer /> {/* Ensure the ToastContainer is visible */}
            <main className="w-screen h-screen flex justify-center items-center bg-gray-100 p-4">
                <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                    <img
                        src={logo}
                        alt="Logo"
                        className="mx-auto w-32 sm:w-40 md:w-48"
                    />
                    <h3 className="text-2xl font-bold text-center mt-4 text-gradient">
                        اهلا بعودتك
                    </h3>
                    <p className="text-center mb-4">
                        ادخل اسم المستخدم وكلمة السر لتسجيل الدخول
                    </p>
                    <form onSubmit={onSubmitLogin}>
                        <div className="mb-4 flex items-center border border-gray-300 rounded-lg overflow-hidden">
                            <label className="p-2 bg-gray-200">
                                <FontAwesomeIcon icon={faUser} />
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                                className="flex-1 p-2 focus:outline-none"
                                placeholder="اسم المستخدم"
                                required
                            />
                        </div>
                        <div className="mb-4 flex items-center border border-gray-300 rounded-lg overflow-hidden">
                            <label className="p-2 bg-gray-200">
                                <FontAwesomeIcon icon={faKey} />
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="flex-1 p-2 focus:outline-none"
                                placeholder="كلمة المرور"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg transition duration-200 hover:bg-blue-700"
                        >
                            تسجيل الدخول
                        </button>
                    </form>
                </div>
            </main>
        </>
    );
}

export default LoginPage;