import logo from "../../assets/img/logos/logo.png";
import {
    faGear,
    faBell,
    faListCheck,
    faMessage,
    faMapLocation,
} from "@fortawesome/free-solid-svg-icons";
import { HomeLink } from "../widget/home_widgets";
import LogoutButton from "../widget/logout_button";
// import { useGeolocation } from "../../utils/location_context";
import { useEffect } from "react";

export default function SuperHomePage() {
    // const { startGeoLocationUpdates, startNotificationsUpdateService } =
    //     useGeolocation();
    const links = [
        [faListCheck, "الحضور", "/attendance-list"],
        [faGear, "الاعدادات", "/SettingsPage"],
        [faBell, "الاشعارات", "/NotificationPage"],
        [faMapLocation, "الخريطه", "reports"],
        [faMessage, "الدردشة", "/chat-contacts"],
        // [faUser, "الملف الشخصي", "/Profile"],
        // [faKey, "تغيير كلمة المرور", "change-password"],
    ];

   
    return (
        <>
            <div className=" sm:w-screen sm:h-screen flex justify-evenly items-center flex-col lg:flex-row">
                <div className="w-full h-2/5 lg:w-1/2 lg:h-full flex items-center flex-col justify-center text-center bg-slate-200">
                    <h3 className="text-orange-300 text-2xl font-semibold">
                        My Child Safe
                    </h3>
                    <div className="text-center">
                        <img
                            src={logo}
                            alt="Logo"
                            className="mx-auto w-40 md:w-52 lg:w-64"
                        />
                    </div>
                </div>

                <div className="w-5/6 h-3/5 lg:w-1/2 lg:h-full flex justify-center items-center">
                    <div className="w-auto h-auto grid grid-cols-3 lg:grid-cols-4 lg:grid-rows-3">
                        {links.map((link, index) => (
                            <HomeLink
                                key={index}
                                icon={link[0]}
                                text={link[1]}
                                path={link[2]}
                            />
                        ))}
                        <LogoutButton />
                    </div>
                </div>
            </div>
        </>
    );
}
