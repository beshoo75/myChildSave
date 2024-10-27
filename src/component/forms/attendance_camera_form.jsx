
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import getCookie from "../../data/control/set_cookie";
import { SystemAxios } from "../../utils/custom_axios";
import { toast } from "react-toastify";

const videoConstraints = {
    facingMode: { exact: "environment" }, // Use the back camera
};

const AttendanceCameraForm = () => {
    const webcamRef = useRef(null);
    const shiftTypeRef = useRef(null);
    const checkTypeRef = useRef(null);
    const [attendanceMessage, setAttendanceMessage] = useState("");
    const capture = useCallback(async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        if (!imageSrc) return;

        const formData = new FormData();
        const blob = await fetch(imageSrc).then((r) => r.blob());
        formData.append("face_image", blob, "face.png");
        formData.append("user", parseInt(localStorage.getItem("id")));
        // formData.append("attendance", true);
        if (checkTypeRef.current.value === "") {
            toast("يرجى تحديد حالة الطالب، يصعد أم ينزل من الحافلة");
            return;
        }
        if (shiftTypeRef.current.value === "") {
            toast("يرجى تحديد فترة التحضير، صباحية ام مسائية");
            return;
        }
        formData.append(
            "check_type",
            checkTypeRef.current.value == "true" ? true : false
        );
        formData.append(
            "shift_type",
            shiftTypeRef.current.value == "true" ? true : false
        );

        formData.append("check_date", new Date().toISOString().split("T")[0]);

        try {
            const response = await SystemAxios.post(
                "/students/attendance/camera/",
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "X-CSRFToken": getCookie("csrftoken"),
                        // COOKIE_HEADER_NAME: COOKIE_NAME,
                    },
                }
            );
            if (response.status === 201) {
                // setAttendanceMessage(`تسجيل حضور ${response.data}`);
                attendanceMessageSetter(`تسجيل حضور ${response.data}`);
                // setInterval(() => {
                //     setAttendanceMessage("")
                // }, 5)
            }
        } catch (error) {
            console.error(error.response);
            // console.error(error.response);
            // setAttendanceMessage("لم يتم التعرف على الوجه");
            toast("لم يتم التعرف على الوجه", { error: true });
        }
    }, []);

    const attendanceMessageSetter = (message) => {
        setAttendanceMessage(`تسجيل حضور ${message}`);
        setTimeout(() => {
            setAttendanceMessage("");
        }, 3000);
    };

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold -mt-20">نظام تحضير الطلاب</h1>
            <div className="w-full flex justify-evenly items-center my-2">
                {/* <div> */}
                {/* <label>الحالة</label> */}
                {/* </div> */}
                <select className="p-2 w-2/5" ref={checkTypeRef}>
                    <option value="">الحالة</option>
                    <option value={true}>صعود</option>
                    <option value={false}>نزول</option>
                </select>
                {/* <div> */}
                {/* <label>الفترة</label> */}
                {/* </div> */}
                <select className="p-2 w-2/5" ref={shiftTypeRef}>
                    <option value="">الفترة</option>
                    <option value={true}>صباحية</option>
                    <option value={false}>مسائية</option>
                </select>
            </div>
            <div>
                <p>{attendanceMessage}</p>
            </div>
            <Webcam
                className="w-5/6"
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"     
                videoConstraints={videoConstraints}
            />
            <button
                onClick={capture}
                className="mt-4 p-2 bg-blue-500 text-white rounded block w-full"
            >
                التحقق
            </button>
            {/* {attendanceMessage && (
                <p className="mt-2 text-red-500">{attendanceMessage}</p>
            )} */}
        </div>
    );
};

export default AttendanceCameraForm;
