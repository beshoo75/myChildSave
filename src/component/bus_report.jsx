import { useEffect, useState } from "react";
import student from "../data/static/user_data";

import { useGeolocation } from "../utils/location_context";
import { SystemAxios } from "../utils/custom_axios";
import getCookie from "../utils/get_cookie";


function BusReport() {
    const [busData_Location, setBusData_Location] = useState({});
    const [studentsHomeLocations, setStudentsHomeLocations] = useState([]);
    // const [supervisorBus, setSupervisorBus] = useState({});
    const [data, setData] = useState([]);
    const [buseNumber, setbuseNumber] = useState();
    const [buseCount, setbuseCount] = useState();
    const { geolocation } = useGeolocation();
    useEffect(() => {
        getSupervisorBusRequest();

        const intervalId = setInterval(() => {
            console.log(geolocation);
            console.log("student", studentsHomeLocations);
        }, 10000);

        return () => {
            // socket.close();
            clearInterval(intervalId);
            console.log("closed");
        };
    }, []);

    const getSupervisorBusRequest = async () => {
        try {
            const id = parseInt(localStorage.getItem("id"));
            const response = await SystemAxios.get(
                `/students/traffic-supervisor?supervisor=${id}`,
                {
                    withCredentials: true,
                    headers: { "X-CSRFToken": getCookie("csrftoken") },
                }
            );

            if (response.status === 200 && response.data.length > 0) {
                setBusData_Location((prevData) => ({
                    location: prevData.location,
                    data: { ...response.data[0] },
                }));
                console.log(response.data);
                setData(response.data);
                setbuseNumber(response.data[0].bus_number)
                setbuseCount(response.data[0].bus)
                // setID(response.data.id);
                console.log("data fetched");
                console.log(response.data[0].bus_number)
                console.log(response.data[0].bus)

            }
        } catch (error) {
            console.error("Error fetching home location:", error.response);
        }
    };


    return (
        <>
            <h1
                style={{ backgroundColor: "#dad7cd" }}
                className="text-black p-4 text-center m-10 rounded text-3xl"
            >
                التقرير الحالي للباص رقم:{" "}
                <span className="text-green-800">{ buseNumber}</span>
            </h1>
            <div className="w-10/12 m-auto shadow-lg rounded my-5 p-4 flex justify-around">
                <h1 className="text-black text-3xl">
                    المشرف: <span className="text-green-800">{localStorage.getItem("first_name")+" "+localStorage.getItem("last_name") }</span>
                </h1>
                <h1 className="text-black text-3xl">
                    عدد الطلاب في الباص:{" "}
                  
                       <span className="text-green-800">{buseCount}</span>
                   
                </h1>
            </div>

            <div className="w-10/12 m-auto shadow-lg rounded">
                <table className="w-full mt-5">
                    <thead>
                        <tr className="border-b rounded p-2 border-green-500 text-center">

                            <th className="px-4 py-2">الاسم</th>
                            <th className="px-4 py-2">رقم الباص</th>
                            <th className="px-4 py-2">ولي الامر</th>

                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {data.map((data, index) => (
                            <tr key={index}>
                                
                                <td className="border-b border-gray-200 px-4 py-2">
                                    {data.student_name}
                                </td>
                                <td className="border-b border-gray-200 px-4 py-2">
                                    {data.bus_number}
                                </td>
                                <td className="border-b border-gray-200 px-4 py-2">
                                    {data.parent}
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
export default BusReport;

