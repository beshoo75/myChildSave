// import { useEffect, useRef, useState } from "react";
// import { SystemAxios } from "../../utils/custom_axios";
// import getCookie from "../../utils/get_cookie";
// import { Link, useNavigate } from "react-router-dom";
// import { useGeolocation } from "../../utils/location_context";

// function NavBar() {
//     const { stopNotificationsUpdateService } = useGeolocation();

//     const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu visibility

//     const buttonRef = useRef(null);
//     const navigate = useNavigate();

//     const logoutRequest = async () => {
//         await SystemAxios.post(
//             "/users/logout/",
//             {},
//             {
//                 withCredentials: true,
//                 headers: {
//                     "X-CSRFToken": getCookie("csrftoken"),
//                 },
//             }
//         )
//             .then((response) => {
//                 console.log(response.status);
//                 if (response.status === 200) {
//                     stopNotificationsUpdateService();
//                     localStorage.clear();
//                     navigate("/");
//                 }
//             })
//             .catch((error) => console.error(error.response));
//     };

//     const handleClickEvent = (event) => {
//         event.preventDefault();
//         logoutRequest();
//     };

//     useEffect(() => {
//         const buttonElement = buttonRef.current;

//         if (buttonElement) {
//             buttonElement.addEventListener("click", handleClickEvent);
//         }

//         // Cleanup the event listener on component unmount
//         return () => {
//             if (buttonElement) {
//                 buttonElement.removeEventListener("click", handleClickEvent);
//             }
//         };
//     }, []);
//     const toggleMenu = () => {
//         setIsMenuOpen((prev) => !prev);
//     };

//     return (
//         <div className="container sticky top-0 z-sticky ">
//             <div className="flex flex-wrap -mx-3">
//                 <div className="w-full max-w-full px-3 flex-0">
//                     <nav className="absolute mb-10 shadow-lg top-0 left-0 right-0 z-30 flex flex-wrap items-start px-4 py-2 mx-6 my-4 shadow-soft-2xl rounded-blur bg-white/80 backdrop-blur-2xl backdrop-saturate-200 lg:flex-nowrap lg:justify-around">
//                         <div className="flex items-center justify-between w-full p-0 pl-6 mx-auto flex-wrap-inherit">
//                             <button
//                                 onClick={toggleMenu}
//                                 className="px-3 py-1 ml-2 leading-none transition-all bg-transparent border border-transparent border-solid rounded-lg shadow-none cursor-pointer text-lg ease-soft-in-out lg:hidden"
//                                 type="button"
//                                 aria-controls="navigation"
//                                 aria-expanded={isMenuOpen}
//                                 aria-label="Toggle navigation"
//                             >
//                                 <span className="inline-block mt-2 align-middle bg-center bg-no-repeat bg-cover w-6 h-6 bg-none">
//                                     <span className="w-5.5 rounded-xs mt-1.75 relative my-0 mx-auto block h-px bg-gray-600 transition-all duration-300"></span>
//                                 </span>
//                             </button>
//                             <Link
//                                 className="py-2.375 text-sm  md:me-4 whitespace-nowrap sm:text-xl md:text-xl font-bold text-slate-700 lg:ml-0 hover:text-green-300"
//                                 to="HomeParent"
//                             >
//                                 {" "}
//                                 MY CHILD SAFE{" "}
//                             </Link>

//                             <div
//                                 className={`items-center flex-grow overflow-hidden transition-all duration-500 ease-soft lg-max:max-h-0 basis-full lg:flex lg:basis-auto ${
//                                     isMenuOpen ? "max-h-screen" : "max-h-0"
//                                 } lg:max-h-full`}
//                             >
//                                 <ul className="flex flex-col pl-0 mx-auto mb-0 list-none lg:flex-row xl:ml-auto">
//                                     <li>
//                                         <Link
//                                             className="flex items-center px-4 py-2 mr-2 font-normal hover:bg-green-100 rounded transition-all lg:max:opacity-100 duration-250 ease-soft-in-out text-slate-700 lg:px-2"
//                                             aria-current="page"
//                                             to="HomeParent"
//                                         >
//                                             <i className="mr-1 fa fa-chart-pie opacity-60"></i>
//                                             الرئسية
//                                         </Link>
//                                     </li>
//                                     <li>
//                                         <Link
//                                             className="block px-4 py-2 mr-2 font-normal hover:bg-green-100 rounded transition-all lg:max:opacity-100 duration-250 ease-soft-in-out text-slate-700 lg:px-2"
//                                             to="ParentsProfile"
//                                         >
//                                             <i className="mr-1 fa fa-user opacity-60"></i>
//                                             الشخصية
//                                         </Link>
//                                     </li>
//                                     <li>
//                                         <Link
//                                             className="block px-4 py-2 mr-2 font-normal hover:bg-green-100 rounded transition-all lg:max:opacity-100 duration-250 ease-soft-in-out text-slate-700 lg:px-2"
//                                             to="HomeParent"
//                                         >
//                                             <i className="mr-1 fas fa-user-circle opacity-60"></i>
//                                             من نحن
//                                         </Link>
//                                     </li>
//                                     <li>
//                                         <Link
//                                             className="block px-4 py-2 mr-2 font-normal hover:bg-green-100 rounded transition-all lg:max:opacity-100 duration-250 ease-soft-in-out text-slate-700 lg:px-2"
//                                             to="TrackBus"
//                                         >
//                                             <i className="mr-1 fas fa-key opacity-60"></i>
//                                             الخريطة
//                                         </Link>
//                                     </li>
//                                     <li>
//                                         <Link
//                                             className="block px-4 py-2 mr-2 font-normal hover:bg-green-100 rounded transition-all lg:max:opacity-100 duration-250 ease-soft-in-out text-slate-700 lg:px-2"
//                                             to="chat-contacts"
//                                         >
//                                             <i className="mr-1 fas fa-key opacity-60"></i>
//                                             الدردشة
//                                         </Link>
//                                     </li>
//                                     <li>
//                                         <Link
//                                             className="block px-4 py-2 mr-2 font-normal hover:bg-green-100 rounded transition-all lg:max:opacity-100 duration-250 ease-soft-in-out text-slate-700 lg:px-2"
//                                             to="NotificationPage"
//                                         >
//                                             <i className="mr-1 fas fa-key opacity-60"></i>
//                                             الاشعارات
//                                         </Link>
//                                     </li>
//                                 </ul>

//                                 <li className="flex items-center">
//                                     <button
//                                         onClick={handleClickEvent}
//                                         className="leading-pro ease-soft-in text-fuchsia-500 border-fuchsia-500 tracking-tight-soft bg-150 bg-x-25 rounded-3.5xl hover:border-fuchsia-500 hover:scale-102 hover:text-fuchsia-500 active:hover:border-fuchsia-500 active:hover:scale-102 active:hover:text-fuchsia-500 active:opacity-85 active:shadow-soft-xs active:bg-fuchsia-500 active:border-fuchsia-500 mr-2 mb-0 inline-block cursor-pointer border border-solid bg-transparent py-2 px-8 text-center align-middle font-bold uppercase shadow-none transition-all hover:bg-transparent hover:opacity-75 hover:shadow-none active:scale-100 active:text-white active:hover:bg-transparent active:hover:opacity-75 active:hover:shadow-none"
//                                     >
//                                         تسجيل الخروج
//                                     </button>
//                                 </li>
//                             </div>
//                         </div>
//                     </nav>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default NavBar;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { SystemAxios } from "../../utils/custom_axios";
import getCookie from "../../utils/get_cookie";
import { Link, useNavigate } from "react-router-dom";
import { faGear, faBell } from "@fortawesome/free-solid-svg-icons";
import { useGeolocation } from "../../utils/location_context";
function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu visibility
    const { notifCount } = useGeolocation();

    const buttonRef = useRef(null);
    const navigate = useNavigate();

    const logoutRequest = async () => {
        await SystemAxios.post(
            "/users/logout/",
            {},
            {
                withCredentials: true,
                headers: {
                    "X-CSRFToken": getCookie("csrftoken"),
                },
            }
        )
            .then((response) => {
                console.log(response.status);
                if (response.status === 200) {
                    localStorage.clear();
                    navigate("/");
                }
            })
            .catch((error) => console.error(error.response));
    };

    const handleClickEvent = (event) => {
        event.preventDefault();
        logoutRequest();
    };

    useEffect(() => {
        const buttonElement = buttonRef.current;

        if (buttonElement) {
            buttonElement.addEventListener("click", handleClickEvent);
        }

        // Cleanup the event listener on component unmount
        return () => {
            if (buttonElement) {
                buttonElement.removeEventListener("click", handleClickEvent);
            }
        };
    }, []);
    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <div className="container sticky top-0 z-sticky ">
            <div className="flex flex-wrap -mx-3">
                <div className="max-w-full px-3 flex-0">
                    <nav className="absolute mb-10 shadow-lg top-0 left-0 right-0 z-30 flex flex-wrap items-start px-4 py-2 mx-6 my-4 shadow-soft-2xl rounded-blur bg-white/80 backdrop-blur-2xl backdrop-saturate-200 lg:flex-nowrap lg:justify-around">
                        <div className="flex flex-col text-center lg:flex-row items-center justify-between w-full p-0 pl-6 flex-wrap-inherit">
                            <div className="flex justify-between items-center w-full lg:w-1/4 lg:justify-start">
                                <button
                                    onClick={toggleMenu}
                                    className="px-3 py-1 ml-2 leading-none transition-all bg-transparent border border-transparent border-solid rounded-lg shadow-none cursor-pointer text-lg ease-soft-in-out lg:hidden"
                                    type="button"
                                    aria-controls="navigation"
                                    aria-expanded={isMenuOpen}
                                    aria-label="Toggle navigation"
                                >
                                    <span className="inline-block mt-2 align-middle bg-center bg-no-repeat bg-cover w-6 h-6 bg-none">
                                        <span className="w-5.5 rounded-xs mt-1.75 relative my-0 mx-auto block h-px bg-gray-600 transition-all duration-300"></span>
                                    </span>
                                </button>
                                <Link
                                    className="py-2.375 text-sm  md:me-4 whitespace-nowrap sm:text-xl md:text-xl font-bold text-slate-700 lg:ml-0 hover:text-green-300"
                                    to=""
                                    replace={true}
                                >
                                    MY CHILD SAFE
                                </Link>
                            </div>

                            <div
                                className={`items-center flex-grow overflow-hidden transition-all duration-500 ease-soft lg-max:max-h-0 basis-full lg:flex lg:basis-auto ${
                                    isMenuOpen ? "max-h-screen" : "max-h-0"
                                } lg:max-h-full`}
                            >
                                <ul className="flex flex-col pl-0 mx-auto mb-0 list-none lg:flex-row xl:ml-auto">
                                    {/* <li>
                                        <Link
                                            className="flex items-center px-4 py-2 mr-2 font-normal hover:bg-green-100 rounded transition-all lg:max:opacity-100 duration-250 ease-soft-in-out text-slate-700 lg:px-2"
                                            aria-current="page"
                                            to=""
                                        >
                                            <i className="mr-1 fa fa-chart-pie opacity-60"></i>
                                            الرئسية
                                        </Link>
                                    </li> */}
                                    {/* <li>
                                        <Link
                                            className="block px-4 py-2 mr-2 font-normal hover:bg-green-100 rounded transition-all lg:max:opacity-100 duration-250 ease-soft-in-out text-slate-700 lg:px-2"
                                            to="ParentsProfile"
                                        >
                                            <i className="mr-1 fa fa-user opacity-60"></i>
                                            الشخصية
                                        </Link>
                                    </li> */}
                                    <li>
                                        <Link
                                            className="block px-4 py-2 mr-2 font-normal hover:bg-green-100 rounded transition-all lg:max:opacity-100 duration-250 ease-soft-in-out text-slate-700 lg:px-2"
                                            to="track-bus"
                                        >
                                            <i className="mr-1 fas fa-key opacity-60"></i>
                                            الخريطة
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="block px-4 py-2 mr-2 font-normal hover:bg-green-100 rounded transition-all lg:max:opacity-100 duration-250 ease-soft-in-out text-slate-700 lg:px-2"
                                            to="chat-contacts"
                                        >
                                            <i className="mr-1 fas fa-key opacity-60"></i>
                                            الدردشة
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="block px-4 py-2 mr-2 font-normal hover:bg-green-100 rounded transition-all lg:max:opacity-100 duration-250 ease-soft-in-out text-slate-700 lg:px-2"
                                            to="student-absence"
                                        >
                                            <i className="mr-1 fas fa-key opacity-60"></i>
                                            عذر الطالب
                                        </Link>
                                    </li>
                                    {/* <li>
                                        <Link
                                            className="block px-4 py-2 mr-2 font-normal hover:bg-green-100 rounded transition-all lg:max:opacity-100 duration-250 ease-soft-in-out text-slate-700 lg:px-2"
                                            to="HomeParent"
                                        >
                                            <i className="mr-1 fas fa-user-circle opacity-60"></i>
                                            من نحن
                                        </Link>
                                    </li> */}
                                </ul>
                                <li className="flex items-center">
                                    <Link
                                        className="block px-4 py-2 mr-2 font-normal hover:bg-green-100 rounded transition-all lg:max:opacity-100 duration-250 ease-soft-in-out text-slate-700 lg:px-2"
                                        to="SettingsPage"
                                    >
                                        <i>
                                            <FontAwesomeIcon
                                                size="1x"
                                                color="green"
                                                icon={faGear}
                                            />
                                        </i>
                                    </Link>
                                    <Link
                                        className="block px-4 py-2 mr-2 font-normal hover:bg-green-100 rounded transition-all lg:max:opacity-100 duration-250 ease-soft-in-out text-slate-700 lg:px-2"
                                        // className="block px-4 py-2 mr-2 font-normal hover:bg-green-100 rounded transition-all lg:max:opacity-100 duration-250 ease-soft-in-out text-slate-700 lg:px-2 justify-center items-center"
                                        to="NotificationPage"
                                    >
                                        <i>
                                            <FontAwesomeIcon
                                                size="1x"
                                                color="green"
                                                className="z-0"
                                                icon={faBell}
                                            />
                                            {notifCount > 0 ? (
                                                <small className="z-50">
                                                    {notifCount}
                                                </small>
                                            ) : (
                                                <></>
                                            )}
                                        </i>
                                    </Link>
                                </li>
                                <li className="flex items-center">
                                    <button
                                        onClick={handleClickEvent}
                                        className="leading-pro ease-soft-in text-fuchsia-500 border-fuchsia-500 tracking-tight-soft bg-150 bg-x-25 rounded-3.5xl hover:border-fuchsia-500 hover:scale-102 hover:text-fuchsia-500 active:hover:border-fuchsia-500 active:hover:scale-102 active:hover:text-fuchsia-500 active:opacity-85 active:shadow-soft-xs active:bg-fuchsia-500 active:border-fuchsia-500 mr-2 mb-0 inline-block cursor-pointer border border-solid bg-transparent py-2 px-8 text-center align-middle font-bold uppercase shadow-none transition-all hover:bg-transparent hover:opacity-75 hover:shadow-none active:scale-100 active:text-white active:hover:bg-transparent active:hover:opacity-75 active:hover:shadow-none"
                                    >
                                        تسجيل الخروج
                                    </button>
                                </li>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
