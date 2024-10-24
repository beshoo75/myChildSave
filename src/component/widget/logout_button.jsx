import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { HomeButton } from "./home_widgets";
import { useEffect, useRef } from "react";
import { SystemAxios } from "../../utils/custom_axios";
import getCookie from "../../utils/get_cookie";
import { useNavigate } from "react-router-dom";
import { useGeolocation } from "../../utils/location_context";

export default function LogoutButton() {
    const buttonRef = useRef(null);
    const navigate = useNavigate();
    const { stopGeoLocationUpdates } = useGeolocation();

    const logoutRequest = async () => {
        try {
            const response = await SystemAxios.post(
                "/users/logout/",
                {},
                {
                    withCredentials: true,
                    headers: {
                        "X-CSRFToken": getCookie("csrftoken"),
                    },
                }
            );
            if (response.status === 200) {
                // console.log(response.status);
                // if (localStorage.getItem("is_staff") == "true") {
                //     stopGeoLocationUpdates();
                // }
                stopGeoLocationUpdates();
                localStorage.clear();
                navigate("/");
            }
        } catch (error) {
            console.error(error);
        }
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

    return (
        <HomeButton
            text={"تسجيل الخروج"}
            icon={faSignOut}
            pointer={buttonRef}
        />
    );
}
