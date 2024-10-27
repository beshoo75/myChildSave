import logo from "../assets/img/logos/logo.png";
import {
    faGear,
    faBell,
    faFile,
    faBus,
    faUser,
    faListCheck,
    faMessage,
    faKey
} from "@fortawesome/free-solid-svg-icons";
import { HomeLink } from "./widget/home_widgets";
import LogoutButton from "./widget/logout_button";
// import { getLocation } from "../utils/get_location";
// import { useEffect, useState } from "react";

export default function AdminHomePage() {
    

    const links = [
        [faUser, "المشرفون", "ListSupervisor"],
        [faUser, "أولياء الأمور", "Parents"],
        [faBus, "الحافلات", "ListOfBuses"],
        [faUser, "الطلاب", "ListStudent"],
        [faListCheck, "الحضور", "attendance-list"],
        [faBus, "تتبع الحافلات", "ListOfBuses"],
        [faGear, "الاعدادات", "SettingsPage"],
        [faBell, "الاشعارات", "NotificationPage"],
        [faFile, "التقارير", "ReportPage"],
        [faMessage, "الدردشة", "chat-contacts"],
        // [faUser, "الملف الشخصي", "Profile"],
        // [faKey, "تغيير كلمة المرور", "change-password"],
    ];
    return (
        <>
            <div className="w-screen h-screen flex justify-evenly items-center flex-col lg:flex-row">
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
                    <div className="w-auto h-auto grid grid-cols-3   lg:grid-cols-4 lg:grid-rows-3">
                        {links.map((link, index) => {
                            if (
                                index >= 0 &&
                                index <= 4 &&
                                localStorage.getItem("is_superuser") === "false"
                            );
                            else if (
                                index >= 4 &&
                                index <= 5 &&
                                localStorage.getItem("is_staff") === "false"
                            );
                            else {
                                return (
                                    <HomeLink
                                        key={index}
                                        icon={link[0]}
                                        text={link[1]}
                                        path={link[2]}
                                    />
                                );
                            }
                        })}
                        <LogoutButton />
                    </div>
                </div>
            </div>
        </>
    );
}
