// import { useEffect, useState } from "react";
// import {
//     BooleanSelector,
//     StudentNamesSelector,
// } from "../widget/attendance_selectors";
// import { SystemAxios } from "../../utils/custom_axios";
// import getCookie from "../../utils/get_cookie";
// import { useLocation } from "react-router-dom";

// const AttendanceForm = () => {
//     // const navigation = useNavigation();
//     const location = useLocation();
//     const [studentNamesList, setStudentNamesList] = useState([]);
//     const [attendanceDataObject, setAttendanceDataObject] = useState({
//         shift_type: true,
//         check_type: true,
//         student: 0,
//         user: parseInt(localStorage.getItem("id")),
//         attendance: true,
//         reason: "",
//     });

//     const handleBooleanSelectorChange = (event) => {
//         const { name, value } = event.target;

//         setAttendanceDataObject((prevData) => ({
//             ...prevData,
//             [name]: value == "true",
//         }));
//     };

//     const handleTextInputChange = (event) => {
//         const { name, value } = event.target;

//         setAttendanceDataObject((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     const handleNumberSelectorChange = (event) => {
//         const { name, value } = event.target;

//         setAttendanceDataObject((prevData) => ({
//             ...prevData,
//             [name]: parseInt(value),
//         }));
//     };

//     const fetchStudentNames = async () => {
//         try {
//             const response = await SystemAxios.get(
//                 `/students/names?bus=${location.state?.bus_id}`,
//                 {
//                     withCredentials: true,
//                     headers: {
//                         "X-CSRFToken": getCookie("csrftoken"),
//                     },
//                 }
//             );

//             if (response.status === 200) {
//                 setStudentNamesList(() => [...response.data]);
//             }
//         } catch (error) {
//             console.error("Error fetching student names:", error);
//         }
//     };

//     const fetchAttendance = async () => {
//         try {
//             const response = await SystemAxios.get(
//                 `/students/attendance/${location.state?.id}/`,
//                 {
//                     withCredentials: true,
//                     headers: {
//                         "X-CSRFToken": getCookie("csrftoken"),
//                     },
//                 }
//             );

//             if (response.status === 200) {
//                 setAttendanceDataObject(() => [...response.data]);
//             }
//         } catch (error) {
//             console.error("Error fetching student names:", error);
//         }
//     };

//     useEffect(() => {
//         fetchStudentNames();
//         if (location.state?.id != 0) {
//             fetchAttendance();
//         }
//     }, []);

//     const handleAddAttenaceRequest = async () => {
//         try {
//             const response = await SystemAxios.post(
//                 "/students/attendance/create/",
//                 attendanceDataObject,
//                 {
//                     withCredentials: true,
//                     headers: {
//                         "X-CSRFToken": getCookie("csrftoken"),
//                     },
//                 }
//             );
//             return response.status === 201;
//         } catch (error) {
//             console.error("Error adding attendance:", error);
//             return false;
//         }
//     };

//     const handleUpdateAttendanceRequest = async () => {
//         try {
//             const response = await SystemAxios.put(
//                 `/students/attendance/update/${location.state?.id}/`,
//                 attendanceDataObject,
//                 {
//                     withCredentials: true,
//                     headers: {
//                         "X-CSRFToken": getCookie("csrftoken"),
//                     },
//                 }
//             );
//             if (response.status == 200) {
//                 // navigation(-1);
//             }
//             // return response.status === 200;
//         } catch (error) {
//             console.error("Error updating attendance:", error);
//             return false;
//         }
//     };

//     const handleAttendanceEvent = async (event) => {
//         event.preventDefault();

//         if (location.state?.id == 0) {
//             handleAddAttenaceRequest();
//         } else {
//             handleUpdateAttendanceRequest();
//         }
//         // const result =
//         //     studentNamesObject && studentHasChangePhoto
//         //         ? await handleUpdatePhotoRequest(formData)
//         //         : await handleAddPhotoRequest(formData);
//     };

//     return (
//         <div>
//             <form onSubmit={handleAttendanceEvent}>
//                 <div>
//                     <label>اسم الطالب</label>
//                     <StudentNamesSelector
//                         changeEventHandler={handleNumberSelectorChange}
//                         selectorName="student"
//                         defaultValue={attendanceDataObject.student}
//                         stundentNames={studentNamesList}
//                         readOnly={location.state?.isReadOnly}
//                     />
//                 </div>
//                 <div>
//                     <label>الفترة</label>
//                     <BooleanSelector
//                         selectorName="shift_type"
//                         trueValueText="صباحية"
//                         falseValueText="مسائية"
//                         defaultValue={attendanceDataObject.shift_type}
//                         changeEventHandler={handleBooleanSelectorChange}
//                         readOnly={location.state?.isReadOnly}
//                     />
//                 </div>
//                 <div>
//                     <label>الحالة</label>
//                     <BooleanSelector
//                         selectorName="check_type"
//                         trueValueText="صعود"
//                         falseValueText="نزول"
//                         defaultValue={attendanceDataObject.check_type}
//                         changeEventHandler={handleBooleanSelectorChange}
//                         readOnly={location.state?.isReadOnly}
//                     />
//                 </div>
//                 <div>
//                     <label>الحضور</label>
//                     <BooleanSelector
//                         selectorName="attendance"
//                         trueValueText="نعم"
//                         falseValueText="لا"
//                         defaultValue={attendanceDataObject.attendance}
//                         changeEventHandler={handleBooleanSelectorChange}
//                         readOnly={location.state?.isReadOnly}
//                     />
//                 </div>
//                 {attendanceDataObject.attendance ? (
//                     <div>
//                         <label>سبب الغياب</label>
//                         <textarea
//                             name="reason"
//                             value={attendanceDataObject.reason}
//                             onChange={handleTextInputChange}
//                             readOnly={location.state?.isReadOnly}
//                         ></textarea>
//                     </div>
//                 ) : null}
//                 {location.state?.isReadOnly ? (
//                     <button
//                         className={location.state?.isReadOnly ? "hidden" : ""}
//                         type="submit"
//                     >
//                         {location.state?.id > 0 ? "تعديل" : "حفظ"}
//                     </button>
//                 ) : null}
//             </form>
//         </div>
//     );
// };

// export default AttendanceForm;

import { useEffect, useState } from "react";
import {
    BooleanSelector,
    StudentNamesSelector,
} from "../widget/attendance_selectors";
import { SystemAxios } from "../../utils/custom_axios";
import getCookie from "../../utils/get_cookie";
import { useLocation, useNavigate } from "react-router-dom";

const AttendanceForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [studentNamesList, setStudentNamesList] = useState([]);
    const [attendanceDataObject, setAttendanceDataObject] = useState({
        shift_type: true,
        check_type: true,
        student: 0,
        user: parseInt(localStorage.getItem("id")),
        attendance: true,
        reason: "",
        check_date: new Date().toISOString().split("T")[0],
    });

    const [busData, setBusData] = useState({});

    const fetchStudentNames = async (id) => {
        try {
            // console.log(busData);
            const response = await SystemAxios.get(
                `/students/names?bus=${id}`,
                {
                    withCredentials: true,
                    headers: {
                        "X-CSRFToken": getCookie("csrftoken"),
                    },
                }
            );

            if (response.status === 200) {
                setStudentNamesList(response.data);
            }
        } catch (error) {
            console.error("Error fetching student names:", error);
        }
    };

    const fetchAttendance = async () => {
        try {
            const response = await SystemAxios.get(
                `/students/attendance/${location.state?.id}/`,

                {
                    withCredentials: true,
                    headers: {
                        "X-CSRFToken": getCookie("csrftoken"),
                    },
                }
            );

            if (response.status === 200) {
                setAttendanceDataObject({ ...response.data });
            }
        } catch (error) {
            console.error("Error fetching attendance data:", error);
        }
    };

    const getBusData = async () => {
        try {
            // console.log("start");
            const response = await SystemAxios.get(
                `/buses/names?supervisor=${localStorage.getItem("id")}`,
                {
                    withCredentials: true,
                    headers: {
                        "X-CSRFToken": getCookie("csrftoken"),
                    },
                }
            );
            if (response.status === 200 && response.data.length > 0) {
                setBusData(response.data[0]);
                // console.log(response.data[0])
                fetchStudentNames(response.data[0].id);
            } else {
                console.error("No bus data found.");
            }
        } catch (error) {
            console.error("Error fetching student names:", error);
        }
    };

    const handleBooleanSelectorChange = (event) => {
        const { name, value } = event.target;
        console.log(typeof value)
        setAttendanceDataObject((prevData) => ({
            ...prevData,
            [name]: value === "true" ? true : false,
        }));
    };

    const handleTextInputChange = (event) => {
        const { name, value } = event.target;
        setAttendanceDataObject((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleNumberSelectorChange = (event) => {
        const { name, value } = event.target;
        setAttendanceDataObject((prevData) => ({
            ...prevData,
            [name]: parseInt(value),
        }));
    };

    const prepareData = async () => {
        await getBusData();
        // await fetchStudentNames();
        // console.log("welcome");
        if (busData.id) {
            await fetchAttendance();
        }
    };

    useEffect(() => {
        prepareData();
    }, []);

    const handleAttendanceEvent = async (event) => {
        event.preventDefault();
        const isNewAttendance = location.state?.id === 0;

        const request = isNewAttendance
            ? SystemAxios.post(
                  "/students/attendance/create/",
                  attendanceDataObject,
                  {
                      withCredentials: true,
                      headers: {
                          "X-CSRFToken": getCookie("csrftoken"),
                      },
                  }
              )
            : SystemAxios.put(
                  `/students/attendance/update/${location.state?.id}/`,
                  attendanceDataObject,
                  {
                      withCredentials: true,
                      headers: {
                          "X-CSRFToken": getCookie("csrftoken"),
                      },
                  }
              );

        try {
            const response = await request;
            if (response.status === (isNewAttendance ? 201 : 200)) {
                navigate(-1); // Navigate back after successful update or creation
            }
        } catch (error) {
            console.error("Error submitting attendance:", error);
        }
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="w-3/4 h-2/3 lg:w-1/3 bg-white drop-shadow-2xl rounded-2xl">
                <div
                    className={`h-1/6 flex justify-center items-center ${
                        location.state?.id == 0
                            ? "bg-green-500 text-white"
                            : location.state?.isReadOnly
                            ? "bg-blue-500 text-white"
                            : "bg-yellow-500"
                    } rounded-tr-2xl rounded-tl-2xl`}
                >
                    <h1 className="text-center text-2xl font-bold">
                        {location.state?.title}
                    </h1>
                </div>
                <form
                    onSubmit={handleAttendanceEvent}
                    className="h-5/6 p-4 flex flex-col justify-evenly items-center"
                >
                    <div className="w-full flex justify-between items-center">
                        <label>اسم الطالب</label>
                        <StudentNamesSelector
                            changeEventHandler={handleNumberSelectorChange}
                            selectorName="student"
                            value={attendanceDataObject.student}
                            studentNames={studentNamesList}
                            isReadOnly={location.state?.isReadOnly}
                            styleClasses="border-2 border-black w-2/3 outlined-none rounded p-2"
                        />
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <label>الفترة</label>
                        <BooleanSelector
                            selectorName="shift_type"
                            trueValueText="صباحية"
                            falseValueText="مسائية"
                            value={attendanceDataObject.shift_type}
                            changeEventHandler={handleBooleanSelectorChange}
                            isReadOnly={location.state?.isReadOnly}
                            styleClasses="border-2 border-black w-2/3 outlined-none rounded p-2"
                        />
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <label>الحالة</label>
                        <BooleanSelector
                            selectorName="check_type"
                            trueValueText="صعود"
                            falseValueText="نزول"
                            value={attendanceDataObject.check_type}
                            changeEventHandler={handleBooleanSelectorChange}
                            isReadOnly={location.state?.isReadOnly}
                            styleClasses="border-2 border-black w-2/3 outlined-none rounded p-2"
                        />
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <label>الحضور</label>
                        <BooleanSelector
                            selectorName="attendance"
                            trueValueText="نعم"
                            falseValueText="لا"
                            value={attendanceDataObject.attendance}
                            changeEventHandler={handleBooleanSelectorChange}
                            isReadOnly={location.state?.isReadOnly}
                            styleClasses="border-2 border-black w-2/3 outlined-none rounded p-2"
                        />
                    </div>
                    {!attendanceDataObject.attendance && (
                        <div className="w-full flex justify-between items-start">
                            <label>سبب الغياب</label>
                            <textarea
                                name="reason"
                                rows={2}
                                value={attendanceDataObject.reason}
                                onChange={handleTextInputChange}
                                disabled={location.state?.isReadOnly}
                                className="border-2 border-black w-2/3 outlined-none rounded p-2"
                            />
                        </div>
                    )}
                    {!location.state?.isReadOnly && (
                        <button
                            className={`w-full self-end ${
                                location.state?.id == 0
                                    ? "bg-green-500 text-white"
                                    : "bg-yellow-500"
                            } font-bold rounded p-2`}
                            type="submit"
                        >
                            {location.state?.id > 0 ? "تعديل" : "حفظ"}
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default AttendanceForm;
