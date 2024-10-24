import { useNavigate } from "react-router-dom";
import { SystemAxios } from "./custom_axios";
import getCookie from "./get_cookie";
// import LogoutButton from "../component/widget/logout_button";
import { useEffect } from "react";

const LogoutButtonEventHandler = (event) => {
    event.preventDefault;
    const navigate = useNavigate();

    const LogoutRequest = async () => {
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
                    navigate("/", { replace: true });
                }
            })
            .catch((error) => console.error(error.response));
    };

    useEffect(() => {
        LogoutRequest();
    }, []);
};

export default LogoutButtonEventHandler;
