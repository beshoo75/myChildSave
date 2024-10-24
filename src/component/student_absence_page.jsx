import { useEffect, useState } from "react";
// import { StudentNamesSelector } from "../widget/attendance_selectors";
import { toast } from "react-toastify";
import { SystemAxios } from "../utils/custom_axios";
import getCookie from "../utils/get_cookie";
import { StudentNamesSelector } from "./widget/attendance_selectors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSlash } from "@fortawesome/free-solid-svg-icons";
export default function StudentAbsencePage() {
    const [formDataObject, setFormDataObject] = useState({
        user: parseInt(localStorage.getItem("id")),
        student: 0,
        start_date: new Date().toISOString().split("T")[0], // Today's date in YYYY-MM-DD format
        end_date: new Date().toISOString().split("T")[0], // Today's date in YYYY-MM-DD format
        reason: "",
    });
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchStudentNames();
    }, []);

    const fetchStudentNames = async () => {
        try {
            const response = await SystemAxios.get(
                `/students/names?parent=${localStorage.getItem("id")}`,
                {
                    withCredentials: true,
                    headers: {
                        "X-CSRFToken": getCookie("csrftoken"),
                    },
                }
            );

            if (response.status === 200) {
                setStudents(() => response.data);
            }
        } catch (error) {
            console.error("Error fetching student names:", error);
        }
    };

    const handleTextInputChange = (event) => {
        const { name, value } = event.target;
        setFormDataObject((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleNumberSelectorChange = (event) => {
        const { name, value } = event.target;
        setFormDataObject((prevData) => ({
            ...prevData,
            [name]: parseInt(value),
        }));
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        // console.log(formDataObject);
        try {
            const response = await SystemAxios.post(
                "/students/absence/create/",
                formDataObject,
                {
                    withCredentials: true,
                    headers: {
                        "X-CSRFToken": getCookie("csrftoken"),
                    },
                }
            );

            if (response.status === 201) {
                toast("تم تأكيد غياب الطالب");
            }
        } catch (error) {
            console.error("Error fetching student names:", error);
        }
    };
    return (
        <div className="w-4/5 lg:w-7/12 m-auto shadow-xl mt-10 rounded">
            <FontAwesomeIcon
                className="m-auto w-full text-7xl mb-5 mr-3 mt-3 text-green-500"
                icon={faUserSlash}
            />
            <h1 className="text-center text-2xl font-bold">اضافة عذر غياب</h1>
            <form className="py-4" onSubmit={handleFormSubmit}>
                <div className="w-full lg:w-6/12 m-auto flex justify-center items-center mb-3">
                    <label className="block text-center  ml-2">
                        اسم الطالب
                    </label>
                    <StudentNamesSelector
                        changeEventHandler={handleNumberSelectorChange}
                        selectorName="student"
                        value={formDataObject.student}
                        studentNames={students}
                        isReadOnly={false}
                        styleClasses="border-2 border-black w-2/3 outlined-none rounded p-2"
                    />
                </div>
                <div className="w-full lg:w-6/12 m-auto flex justify-center items-center">
                    <label className="block text-center ml-1">سبب الغياب</label>
                    <textarea
                        name="reason"
                        rows={1}
                        value={formDataObject.reason}
                        onChange={handleTextInputChange}
                        className="border-2 border-black w-2/3 outlined-none rounded p-2"
                    />
                </div>
                <div className="w-full lg:w-6/12 m-auto flex justify-center items-center mt-2">
                    <label className="block text-center ml-3" htmlFor="date">
                        من تاريخ
                    </label>
                    <input
                        onChange={handleTextInputChange}
                        value={formDataObject.start_date}
                        className="border-2 border-black w-2/3 outlined-none rounded p-2"
                        id="date"
                        type="date"
                        name="start_date"
                        required
                    />
                </div>
                <div className="w-full lg:w-6/12 m-auto flex justify-center items-center mt-2 mb-4">
                    <label className="block text-center  ml-2" htmlFor="date">
                        الى تاريخ
                    </label>
                    <input
                        onChange={handleTextInputChange}
                        value={formDataObject.end_date}
                        className="border-2 border-black w-2/3 outlined-none rounded p-2"
                        id="date"
                        type="date"
                        name="end_date"
                        required
                    />
                </div>

                <div className="w-16 m-auto mb-4">
                    <button
                        type="submit"
                        className=" leading-pro ease-soft-in text-black-500 border-green-500 tracking-tight-soft bg-150 bg-x-25 rounded-3.5xl hover:border-green-500 hover:scale-102 hover:text-fuchsia-500 active:hover:border-fuchsia-500 active:hover:scale-102 active:hover:text-fuchsia-500 active:opacity-85 active:shadow-soft-xs active:bg-fuchsia-500 active:border-fuchsia-500 mr-2 mb-0 inline-block cursor-pointer border border-solid bg-transparent py-2 px-8 text-center align-middle font-bold uppercase shadow-none transition-all hover:bg-transparent hover:opacity-75 hover:shadow-none active:scale-100 active:text-white active:hover:bg-transparent active:hover:opacity-75 active:hover:shadow-none"
                    >
                        تسجيـل
                    </button>
                </div>
            </form>
        </div>
    );
}
