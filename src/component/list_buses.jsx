// import React, { useEffect, useState, useMemo } from 'react';
// import { useEffect, useState, useMemo } from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { COOKIE_NAME, SystemAxios } from "../utils/custom_axios.js";
import getCookie from "../utils/get_cookie.js";
import {
    faAdd,
    faEdit,
    faInfoCircle,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ListBuses = () => {
    const [busesData, setBusesData] = useState([]);
    // const [genderFilter, setGenderFilter] = useState(0);
    // const [gradeFilter, setGradeFilter] = useState(0);
    const [showDeleteValidation, setShowDeleteValidation] = useState(false);
    const [busID, setBusID] = useState(null);
    const navigate = useNavigate();

    // const filteredBuses = useMemo(() => {
    //     return busesData.filter(student => {
    //         const genderMatches = genderFilter === 0 || student.gender === (genderFilter === 1);
    //         const gradeMatches = gradeFilter === 0 || student.grade === gradeFilter;
    //         return genderMatches && gradeMatches;
    //     });
    // }, [busesData, genderFilter, gradeFilter]);
    // const filteredBuses = useMemo(() => {
    //     return busesData
    // }, );

    const editButtonEventHandler = (id) => {
        navigate("bus-form", {
            state: { id, title: "تعديل بيانات الحافله", isReadOnly: false },
        });
    };

    // const filterChangeHandle = (event) => {
    //     const { name, value } = event.target;
    //     if (name === 'gender_filter') {
    //         setGenderFilter(parseInt(value));
    //     }
    //     if (name === 'grade_filter') {
    //         setGradeFilter(parseInt(value));
    //     }
    // };

    const addButtonEventHandler = () => {
        navigate("bus-form", {
            state: { id: 0, title: "إضافة حافله جديد", isReadOnly: false },
        });
    };

    const viewButtonEventHandler = (id) => {
        navigate("bus-form", {
            state: { id, title: "بيانات الحافله", isReadOnly: true },
        });
    };

    const deleteButtonEventHandler = (id) => {
        setBusID(id);
        setShowDeleteValidation(true);
    };

    const deleteStudentRequest = async () => {
        try {
            const response = await SystemAxios.delete(
                `/buses/delete/${busID}/`,
                {
                    withCredentials: true,
                    headers: {
                        COOKIE_HEADER_NAME: getCookie(COOKIE_NAME),
                    },
                }
            );
            if (response.status === 204) {
                setBusesData((prev) =>
                    prev.filter((student) => student.id !== busID)
                );
                setShowDeleteValidation(false);
                setBusID(null);
            }
        } catch (error) {
            console.error("Error deleting student:", error.response);
            alert("حدث خطأ أثناء حذف الطالب."); // User feedback for errors
        }
    };

    const requestBusesData = async () => {
        try {
            const response = await SystemAxios.get("/buses/", {
                withCredentials: true,
                headers: {
                    COOKIE_HEADER_NAME: getCookie(COOKIE_NAME),
                },
            });
            if (response.status === 200) {
                console.log(response.data);
                setBusesData(response.data);
            }
        } catch (error) {
            console.error("Error fetching students data:", error);
            // alert('حدث خطأ أثناء استرجاع بيانات الطلاب.'); // User feedback for errors
        }
    };

    useEffect(() => {
        requestBusesData();
    }, []);

    return (
        <div className="m-auto w-11/12 p-2 lg:p-4 shadow-lg shadow-green-200">
            <div className="w-full flex justify-between items-center mb-2">
                <h1 className="text-4xl font-bold">الحافلات</h1>
                <button
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 shadow"
                    onClick={addButtonEventHandler}
                >
                    <FontAwesomeIcon icon={faAdd} />
                </button>
            </div>
            {busesData.length === 0 ? (
                <h1>لا يوجد اي بيانات</h1>
            ) : (
                <div className="w-full mt-4">
                    {busesData.length === 0 ? (
                        <h1>لا يوجد طلاب حسب الاختيارات التي حددتها</h1>
                    ) : (
                        <div className="w-full overflow-scroll shadow">
                            <table className="w-full">
                                <thead>
                                    <tr style={{ backgroundColor: "#a3b18a" }}>
                                        <th className="py-2 px-4">
                                            رقم الحافله
                                        </th>
                                        <th className="py-2 px-4">
                                            اسم السائق
                                        </th>
                                        <th className="py-2 px-4">
                                            لوحة رخصه الحافله
                                        </th>
                                        <th className="py-2 px-4">
                                            مسار الحافله
                                        </th>
                                        <th className="py-2 px-4"></th>
                                        <th className="py-2 px-4"></th>
                                        <th className="py-2 px-4"></th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {busesData.map((bus, index) => (
                                        <tr
                                            key={bus.id}
                                            className="hover:bg-gray-100"
                                        >
                                            <td className="py-2 px-4">
                                                {index + 1}
                                            </td>
                                            <td className="py-2 px-4">
                                                {bus.driver_name}
                                            </td>
                                            <td className="py-2 px-4">
                                                {bus.license_plate}
                                            </td>
                                            <td className="py-2 px-4">
                                                {bus.bus_routes}
                                            </td>
                                            <td className="py-2 px-4">
                                                <button
                                                    onClick={() =>
                                                        viewButtonEventHandler(
                                                            bus.id
                                                        )
                                                    }
                                                    className="bg-blue-400 text-white py-1 px-3 rounded ml-2 hover:bg-blue-600"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faInfoCircle}
                                                    />
                                                </button>
                                            </td>
                                            <td className="py-2 px-4">
                                                <button
                                                    onClick={() =>
                                                        editButtonEventHandler(
                                                            bus.id
                                                        )
                                                    }
                                                    className="bg-yellow-400 text-white py-1 px-3 rounded ml-2 hover:bg-yellow-600"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faEdit}
                                                    />
                                                </button>
                                            </td>
                                            <td className="py-2 px-4">
                                                <button
                                                    onClick={() =>
                                                        deleteButtonEventHandler(
                                                            bus.id
                                                        )
                                                    }
                                                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faTrash}
                                                    />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {showDeleteValidation && (
                                <div className="z-10 fixed top-0 left-0 w-screen h-screen bg-black flex justify-center items-center">
                                    <div className="bg-white w-4/5 h-2/5 lg:w-2/5 lg:h-2/5 rounded-md flex flex-col justify-between items-center">
                                        <h2 className="p-4 text-2xl">
                                            تأكيد الحذف
                                        </h2>
                                        <div className="p-4 text-start">
                                            <p>
                                                هل أنت متأكد من أنك تريد حذف
                                                بيانات هذه الحافله؟
                                            </p>
                                            <p>
                                                حالما يتم حذف بيانات هذه الحافلة
                                                فإنه لن يمكنك أستعادة بياناتها
                                                بشكل نهائي.
                                            </p>
                                            {busesData.find(
                                                (bus) => bus.id === busID
                                            ) && (
                                                <div className="mt-2">
                                                    <p>
                                                        رقم الحافله:{" "}
                                                        <strong>
                                                            {
                                                                busesData.find(
                                                                    (bus) =>
                                                                        bus.id ===
                                                                        busID
                                                                ).bus_number
                                                            }
                                                        </strong>
                                                    </p>
                                                    {/* <p>المرحلة الدراسية: <strong>{SCHOOL_GRADES[busesData.find(student => student.id === busID).grade - 1]}</strong></p> */}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex justify-end m-1">
                                            <button
                                                className="w-20 bg-red-500 m-1 rounded h-10 font-bold text-white shadow"
                                                onClick={deleteStudentRequest}
                                            >
                                                حذف
                                            </button>
                                            <button
                                                className="w-20 bg-green-500 m-1 rounded h-10 font-bold text-white shadow"
                                                onClick={() =>
                                                    setShowDeleteValidation(
                                                        false
                                                    )
                                                }
                                            >
                                                الغاء
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ListBuses;
