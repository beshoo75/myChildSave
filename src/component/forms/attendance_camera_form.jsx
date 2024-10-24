// // import { useEffect, useState } from "react";
// // import getCookie from "../../data/control/setCookie";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import { COOKIE_NAME, SystemAxios } from "../../utils/custom_axios";
// // import { SCHOOL_GRADES } from "../../data/static/constants";

// // const AttendanceForm = () => {
// // 	const navigate = useNavigate();
// // 	const location = useLocation();

// // 	const [attendanceFormData, setAtttendanceFormData] = useState({
// // 		student: 1,
// // 		check_type: true,
// // 		shift_type: true,
// // 		gender: true,
// // 		check_date: '',
// // 		check_time: '',
// // 		attendance: true, // Initialize as empty string for no parent selected
// // 		user: 1, // Initialize as empty string for no bus selected
// // 		reason: ''
// // 	});

// // 	const [attendanceData, setAttendanceData] = useState([]);
// // 	const [studentData, setStudentData] = useState([]);

// // 	const getStudentData = async () => {
// // 		try {
// // 			const response = await SystemAxios.get('/students/names/', {}, {
// // 				withCredentials: true,
// // 				headers: {
// // 					COOKIE_HEADER_NAME: getCookie(COOKIE_NAME)
// // 				}
// // 			});
// // 			if (response.status === 200) {
// // 				// const data = response.data;
// // 				setStudentData(response.data)
// // 				// setAtttendanceFormData(prevData => ({
// // 				//     ...prevData,
// // 				//     ...data,
// // 				//     student: data.id, // Safeguard for parent
// // 				// }));
// // 			}
// // 		} catch (error) {
// // 			console.error(error.response);
// // 		}
// // 	};

// // 	useEffect(() => {
// // 		if (!getCookie('csrftoken')) {
// // 			navigate('/');   // back to the login page if user have not logged in
// // 			// return;
// // 		}

// // 		getBusesData()
// // 		getStudentData();

// // 		if (location.state && location.state.id) {
// // 			getAttendanceData()
// // 		} else {
// // 			const date = new Date().toISOString().split('T')[0];
// // 			const time = new Date().toISOString().split('T')[1]
// // 			setAtttendanceFormData(prevData => ({
// // 				...prevData,
// // 				check_date: date,
// // 				check_time: time
// // 			}));
// // 		}
// // 	}, []);

// // 	const handleInput = (event) => {
// // 		const { name, value } = event.target;
// // 		setAtttendanceFormData(prevData => ({ ...prevData, [name]: value }));
// // 	};

// // 	const handleInputNumber = (event) => {
// // 		const { name, value } = event.target;
// // 		// 10 to 10th number system
// // 		// [name] export string to object key
// // 		setAtttendanceFormData(prevData => ({ ...prevData, [name]: parseInt(value, 10) }));
// // 	};

// // 	const handleRadioInput = (event) => {
// // 		const { value } = event.target;
// // 		// if value is male returns true else false
// // 		setAtttendanceFormData(prevData => ({ ...prevData, gender: value === 'male' }));
// // 	};

// // 	const saveNewAttendanceData = async () => {
// // 		try {
// // 			const response = await SystemAxios.post('/students/attendance/create/', attendanceFormData, {
// // 				withCredentials: true,
// // 				headers: {
// // 					'X-CSRFToken': getCookie('csrftoken')
// // 				}
// // 			});
// // 			if (response.status === 201) {
// // 				console.log('Attendance added');
// // 				navigate(-1);
// // 			}
// // 		} catch (error) {
// // 			console.error(error.response);
// // 		}
// // 	};

// // 	const updateAttendanceData = async () => {
// // 		try {
// // 			const response = await SystemAxios.put(`/students/attendance/update/${location.state.id}/`, attendanceFormData, {
// // 				withCredentials: true,
// // 				headers: {
// // 					'X-CSRFToken': getCookie('csrftoken')
// // 				}
// // 			});
// // 			if (response.status === 200) {
// // 				console.log('Attendance updated');
// // 				navigate(-1);
// // 			}
// // 		} catch (error) {
// // 			console.error(error);
// // 		}
// // 	};

// // 	const onFormSubmit = (event) => {
// // 		event.preventDefault();
// // 		if (location.state && location.state.id) {
// // 			updateAttendanceData();
// // 		} else {
// // 			saveNewAttendanceData();
// // 		}
// // 	};

// // 	const getAttendanceData = async () => {
// // 		try {
// // 			const response = await SystemAxios.get(`/students/attendance/${location.state.id}`, {}, {
// // 				withCredentials: true,
// // 				headers: {
// // 					COOKIE_HEADER_NAME: getCookie(COOKIE_NAME)
// // 				}
// // 			});
// // 			if (response.status === 200) {
// // 				setAttendanceData((prevData) => ({
// // 					...prevData,
// // 					...response.data,
// // 				}));
// // 			}
// // 		} catch (error) {
// // 			console.error(error.response);
// // 		}
// // 	};

// // 	const getBusesData = async () => {
// // 		try {
// // 			const response = await SystemAxios.get('/buses/buses-names/', {}, {
// // 				withCredentials: true,
// // 				headers: {
// // 					COOKIE_HEADER_NAME: getCookie(COOKIE_NAME)
// // 				}
// // 			});
// // 			if (response.status === 200) {
// // 				setStudentData(response.data);
// // 			}
// // 		} catch (error) {
// // 			console.error(error.response);
// // 		}
// // 	};

// // 	return (
// // 		<div className="w-screen h-screen">
// // 			{attendanceData.length === 0 || studentData.length === 0 ? (
// // 				<h1>لايوجد بيانات أولياء أمور الطلاب أو الحافلات الرجاء التحقق من إضافتها اولاً</h1>
// // 			) : (
// // 				<>
// // 					<div className="text-3xl font-bold py-4 mx-4 mb-4 text-blue-500">
// // 						<h1>{location.state?.title || 'Student Form'}</h1>
// // 					</div>
// // 					<div className="w-full px-4">
// // 						<form className="w-full flex flex-col justify-evenly items-center space-y-2" onSubmit={onFormSubmit}>
// // 							<input
// // 								className="border-none w-full px-2 py-4 outline-none bg-blue-50 rounded-md focus:bg-blue-100"
// // 								onChange={handleInput}
// // 								type="text"
// // 								name="student_name"
// // 								placeholder="الاسم"
// // 								disabled={location.state?.isReadOnly}
// // 								value={attendanceFormData.student_name}
// // 							/>
// // 							<input
// // 								className="border-none w-full px-2 py-4 outline-none rounded-md bg-blue-50 focus:bg-blue-100"
// // 								onChange={handleInputNumber}
// // 								type="number"
// // 								name="age"
// // 								disabled={location.state?.isReadOnly}
// // 								placeholder="العمر"
// // 								value={attendanceFormData.age}
// // 							/>
// // 							<div className="w-full px-2 py-4 flex justify-start items-center">
// // 								<label className="ltr:mr-8 rtl:ml-8 text-xl flex-1">الجنس</label>
// // 								<div className="flex-auto">
// // 									<input
// // 										onChange={handleRadioInput}
// // 										checked={attendanceFormData.gender}
// // 										value="male"
// // 										className="ltr:mr-2 rtl:ml-2"
// // 										id="male"
// // 										disabled={location.state?.isReadOnly}
// // 										type='radio'
// // 										name="gender"
// // 									/>
// // 									<label htmlFor="male" className="text-xl">ذكر</label>
// // 								</div>
// // 								<div className="flex-auto">
// // 									<input
// // 										onChange={handleRadioInput}
// // 										checked={!attendanceFormData.gender}
// // 										value="female"
// // 										className="ltr:mr-2 rtl:ml-2"
// // 										readOnly={location.state?.isReadOnly}
// // 										id="female"
// // 										type='radio'
// // 										name="gender"
// // 										disabled={location.state.isReadOnly}
// // 									/>
// // 									<label htmlFor="female" className="text-xl">أنثى</label>
// // 								</div>
// // 							</div>
// // 							<div className="w-full px-2 py-4 flex justify-start items-center">
// // 								<label className="ltr:mr-4 rtl:ml-4 w-1/2 text-xl text-start">المرحلة الدراسية</label>
// // 								<select
// // 									onChange={handleInputNumber}
// // 									name="grade"
// // 									className="border p-4 flex-auto"
// // 									value={attendanceFormData.grade || ''}
// // 									disabled={location.state.isReadOnly}
// // 								>
// // 									{SCHOOL_GRADES.map((grade, index) => (
// // 										<option key={index} value={index + 1}>{grade}</option>
// // 									))}
// // 								</select>
// // 							</div>
// // 							<div className="w-full px-2 py-4 flex justify-start items-center">
// // 								<label className="ltr:mr-4 rtl:ml-4 w-1/2 text-xl text-start">ولي الأمر (مستخدم)</label>
// // 								<select
// // 									onChange={handleInputNumber}
// // 									name="parent"
// // 									className="border p-4 flex-auto"
// // 									value={attendanceFormData.parent || ''}
// // 									disabled={location.state.isReadOnly}
// // 								>
// // 									<option value="">اختر ولي الأمر</option>
// // 									{attendanceData.map((parent) => (
// // 										<option key={parent.id} value={parent.id}>{parent.username}</option>
// // 									))}
// // 								</select>
// // 							</div>
// // 							<div className="w-full px-2 py-4 flex justify-start items-center">
// // 								<label className="ltr:mr-4 rtl:ml-4 w-1/2 text-xl text-start">الحافلة</label>
// // 								<select
// // 									onChange={handleInputNumber}
// // 									name="bus"
// // 									className="border p-4 flex-auto"
// // 									value={attendanceFormData.bus || ''}
// // 									disabled={location.state.isReadOnly}
// // 								>
// // 									<option value="">اختر ولي الأمر</option>
// // 									{studentData.map((bus, index) => (
// // 										<option key={index} value={bus.id}>{bus.bus_number}</option>
// // 									))}
// // 								</select>
// // 							</div>
// // 							<div className="w-full px-2 py-4 flex justify-start items-center">
// // 								<label className="ltr:mr-4 rtl:ml-4 w-1/2 text-start text-xl" htmlFor="date">تاريخ الميلاد</label>
// // 								<input
// // 									onChange={handleInput}
// // 									value={attendanceFormData.date_of_birth}
// // 									className="border p-4 flex-auto"
// // 									id="date"
// // 									type="date"
// // 									name="date_of_birth"
// // 									disabled={location.state.isReadOnly}
// // 								/>
// // 							</div>
// // 							<textarea
// // 								onChange={handleInput}
// // 								value={attendanceFormData.health_state}
// // 								className="w-full px-2 py-4 outline-none bg-blue-50 rounded-md border-none focus:bg-blue-100"
// // 								rows={4}
// // 								name="health_state"
// // 								placeholder="الحالة الصحية"
// // 								disabled={location.state.isReadOnly}
// // 							/>
// // 							<textarea
// // 								onChange={handleInput}
// // 								value={attendanceFormData.contact_information}
// // 								className="w-full px-2 py-4 outline-none bg-blue-50 rounded-md border-none focus:bg-blue-100"
// // 								rows={4}
// // 								name="contact_information"
// // 								placeholder="معلومات التواصل"
// // 								disabled={location.state.isReadOnly}
// // 							/>
// // 							{!location.state?.isReadOnly && (
// // 								<button
// // 									type="submit"
// // 									className="w-full text-xl font-bold rounded text-blue-500 py-4 border-2 border-blue-100 hover:bg-blue-500 hover:text-white"
// // 								>
// // 									{location.state?.id ? 'تعديل' : 'إضافة'}
// // 								</button>
// // 							)}
// // 						</form>
// // 					</div>
// // 				</>
// // 			)}
// // 		</div>
// // 	);
// // };

// // export default AttendanceForm;

// import { useCallback, useRef } from "react";
// // import axios from "axios";
// import Webcam from "react-webcam";

// const videoConstraints = {
//     //   facingMode: "user"
//     facingMode: { exact: "environment" },
// };

// const AttendanceForm = () => {
//     // const videoRef = useRef(null);
//     // const [attendanceMessage, setAttendanceMessage] = useState("");

//     // const startVideo = () => {
//     //     navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
//     //         videoRef.current.srcObject = stream;
//     //     });
//     // };

//     // const captureAndSend = async () => {
//     //     const canvas = document.createElement("canvas");
//     //     const context = canvas.getContext("2d");
//     //     canvas.width = videoRef.current.videoWidth;
//     //     canvas.height = videoRef.current.videoHeight;
//     //     context.drawImage(videoRef.current, 0, 0);

//     //     canvas.toBlob(async (blob) => {
//     //         const formData = new FormData();
//     //         formData.append("face_image", blob, "face.png");

//     //         try {
//     //             const response = await axios.post(
//     //                 "http://localhost:8000/api/attendance/",
//     //                 formData,
//     //                 {
//     //                     headers: {
//     //                         "Content-Type": "multipart/form-data",
//     //                     },
//     //                 }
//     //             );
//     //             setAttendanceMessage(response.data.message);
//     //         } catch (error) {
//     //             setAttendanceMessage(
//     //                 error.response.data.error || "Error marking attendance"
//     //             );
//     //         }
//     //     });
//     // };

//     const webcamRef = useRef(null);

//     const capture = useCallback(() => {
//         //   const imageSrc =  webcamRef.current.getScreenshot();
//         //   setImageUrl(imageSrc)
//         //   setShowCamera(false)
//     }, [webcamRef]);

//     return (
//         // <div>
//         //     <h1>Student Attendance System</h1>
//         //     <video ref={videoRef} autoPlay></video>
//         //     <button onClick={startVideo}>Start Video</button>
//         //     <button onClick={captureAndSend}>Capture and Send</button>
//         //     <p>{attendanceMessage}</p>
//         // </div>
//         <div
//             style={{
//                 display: "flex",
//                 flexDirection: "row",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 gap: "2rem",
//             }}
//         >
//             <div
//                 style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     gap: "4px",
//                 }}
//             >
//                 <Webcam
//                     audio={false}
//                     height={500}
//                     ref={webcamRef}
//                     screenshotFormat="image/jpeg"
//                     width={500}
//                     videoConstraints={videoConstraints}
//                 />
//                 <button onClick={capture}>Capture photo</button>
//             </div>
//         </div>
//     );
// };

// export default AttendanceForm;

import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import getCookie from "../../data/control/set_cookie";
import { SystemAxios } from "../../utils/custom_axios";
import { toast } from "react-toastify";

const videoConstraints = {
    // facingMode: { exact: "user" }, // Use the back camera
    facingMode: { exact: "environment" }, // Use the back camera
};

const AttendanceCameraForm = () => {
    // const location = useLocation();
    const webcamRef = useRef(null);
    const shiftTypeRef = useRef(null);
    const checkTypeRef = useRef(null);
    const [attendanceMessage, setAttendanceMessage] = useState("");

    // const [deviceId, setDeviceId] = useState({});
    // const [devices, setDevices] = useState([]);

    // const handleDevices = useCallback(
    //     (mediaDevices) =>
    //         setDevices(
    //             mediaDevices.filter(({ kind }) => kind === "videoinput")
    //         ),
    //     [setDevices]
    // );

    // useEffect(() => {
    //     // navigator.mediaDevices.enumerateDevices().then(handleDevices);
    //     // alert(deviceId);
    // }, []);

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
                // height={300}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                // width={300}
                videoConstraints={videoConstraints}
                // mirrored={true}
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
