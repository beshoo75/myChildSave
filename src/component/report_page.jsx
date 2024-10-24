import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { COOKIE_NAME, SystemAxios } from '../utils/custom_axios.js';
import getCookie from '../utils/get_cookie.js';

export default function ReportPage() {
    const [busesData, setBusesData] = useState([]);
    const [showDeleteValidation, setShowDeleteValidation] = useState(false);
    const [busID, setBusID] = useState(null);
    const navigate = useNavigate();


    const viewButtonEventHandler = (id) => {
        navigate('/BuseReport', { state: { id, title: "بيانات الحافله", isReadOnly: true } });
    };



    const requestBusesData = async () => {
        try {
            const response = await SystemAxios.get('/buses/', {
                withCredentials: true,
                headers: {
                    COOKIE_HEADER_NAME: getCookie(COOKIE_NAME)
                }
            });
            if (response.status === 200) {
                console.log(response.data)
                setBusesData(response.data);
            }
        } catch (error) {
            console.error('Error fetching students data:', error);
            // alert('حدث خطأ أثناء استرجاع بيانات الطلاب.'); // User feedback for errors
        }
    };

    useEffect(() => {
        requestBusesData();
    }, []);

    return (
        <div className="m-auto w-11/12 mt-4  p-4 shadow-lg shadow-green-200">
            <div className='w-full flex justify-center mb-2'>
                <h1 className="text-3xl text-green-700 font-bold">الحافلات</h1>

            </div>
            {busesData.length === 0 ? (
                <h1>لا يوجد اي بيانات</h1>
            ) : (
                <div className='w-auto mt-4'>

                    {busesData.length === 0 ? (
                        <h1>لا يوجد طلاب حسب الاختيارات التي حددتها</h1>
                    ) : (
                        <div className='w-full shadow'>
                            <table className="w-full">
                                <thead>
                                    <tr style={{ backgroundColor: '#dad7cd' }}>
                                        <th className="py-2 px-4">رقم الحافله</th>
                                        <th className="py-2 px-4">اسم السائق</th>
                                        <th className="py-2 px-4">لوحة رخصه الحافله</th>
                                        <th className="py-2 px-4">مسار الحافله</th>
                                        <th className="py-2 px-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='text-center'>
                                    {busesData.map((bus, index) => (
                                        <tr key={bus.id} className="hover:bg-gray-100">
                                            <td className="py-2 px-4">{index + 1}</td>
                                            <td className="py-2 px-4">{bus.driver_name}</td>
                                            <td className="py-2 px-4">{bus.license_plate}</td>
                                            <td className="py-2 px-4">{bus.bus_routes}</td>
                                            <td className="py-2 px-4">
                                                <button onClick={() => viewButtonEventHandler(bus.id)} className="bg-yellow-500 text-white py-1 px-3 rounded ml-2 hover:bg-yellow-600">
                                                    عرض
                                                </button>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
