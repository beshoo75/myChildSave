import { useEffect, useState } from "react";
import getCookie from "../../data/control/set_cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { COOKIE_NAME, SystemAxios } from "../../utils/custom_axios";
// import { SCHOOL_GRADES } from "../../data/static/constants";

const BusForm = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [busFormData, setBusFormData] = useState({
        driver_name: '',
        bus_number: '',
        license_plate: '',
        contact_info: '',
        bus_capacity: 1,
        bus_routes: '',
        bus_details: '',
        supervisor: null
    });

    const [supervisorData, setSupervisorData] = useState([])

    const getBusData = async () => {
        try {
            const response = await SystemAxios.get(`/buses/${location.state?.id}/`, {}, {
                withCredentials: true,
                headers: {
                    'X-CSRFToken': getCookie('csrftoken')
                }
            });
            if (response.status === 200) {
                const data = response.data;
                setBusFormData(prevData => ({
                    ...prevData,
                    ...data,
                    supervisor: data.supervisor
                }));
            }
        } catch (error) {
            console.error(error.response);
        }
    };

    useEffect(() => {
        if (!getCookie('csrftoken')) {
            navigate('/');   // back to the login page if user have not logged in
            // return;
        }
        getSupervisorsData()
        if (location.state && location.state?.id) {
            getBusData();
        } else {
            setBusFormData(prevData => ({
                ...prevData,
            }));
        }
    }, []);

    const handleInput = (event) => {
        const { name, value } = event.target;
        setBusFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleInputNumber = (event) => {
        const { name, value } = event.target;
        // 10 to 10th number system
        // [name] export string to object key
        setBusFormData(prevData => ({ ...prevData, [name]: parseInt(value, 10) }));
    };

    // const handleRadioInput = (event) => {
    //     const { value } = event.target;
    //     // if value is male returns true else false
    //     setBusFormData(prevData => ({ ...prevData, gender: value === 'male' }));
    // };

    const saveNewBusData = async () => {
        try {
            const response = await SystemAxios.post('/buses/create/', busFormData, {
                withCredentials: true,
                headers: {
                    'X-CSRFToken': getCookie('csrftoken')
                }
            });
            if (response.status === 201) {
                console.log('Bus Created');
                navigate(-1);
            }
        } catch (error) {
            console.error(error.response);
        }
    };

    const updateBusData = async () => {
        try {
            const response = await SystemAxios.put(`/buses/update/${location.state?.id}/`, busFormData, {
                withCredentials: true,
                headers: {
                    'X-CSRFToken': getCookie('csrftoken')
                }
            });
            if (response.status === 200) {
                console.log('Bus updated');
                navigate(-1);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        if (location.state && location.state?.id) {
            updateBusData();
        } else {
            console.log(busFormData)
            saveNewBusData();
        }
    };

    const getSupervisorsData = async () => {
        try {
            const response = await SystemAxios.get('/users/users-names?type=0', {}, {
                withCredentials: true,
                headers: {
                    COOKIE_HEADER_NAME: getCookie(COOKIE_NAME)
                }
            });
            if (response.status === 200) {
                setSupervisorData(response.data);
            }
        } catch (error) {
            console.error(error.response);
        }
    };

    return (
        <div className="w-auto m-auto p-4 shadow-lg shadow-green-200">
            {supervisorData.length === 0 ? (
                <h1>لايوجد مشرفي حافلات الرجاء الاضافة اولا</h1>
            ) : (
                <>
                    <div className="text-3xl font-bold py-4 mx-4 mb-4 text-green-500">
                        <h1>{location.state?.title || 'Student Form'}</h1>
                    </div>
                    <div className="w-auto m-auto px-4">
                        <form className="w-1/2 m-auto flex flex-col justify-evenly items-center space-y-2" onSubmit={onFormSubmit}>
                            <input
                                className="border-none w-full px-2 py-4 outline-none bg-green-50 rounded-md focus:bg-green-100"
                                onChange={handleInput}
                                type="text"
                                name="bus_number"
                                placeholder="رقم الحافلة"
                                disabled={location.state?.isReadOnly}
                                value={busFormData.bus_number}
                            />
                            <input
                                className="border-none w-full px-2 py-4 outline-none bg-green-50 rounded-md focus:bg-green-100"
                                onChange={handleInput}
                                type="text"
                                name="driver_name"
                                placeholder="اسم السائق"
                                disabled={location.state?.isReadOnly}
                                value={busFormData.driver_name}
                            />
                            <input
                                className="border-none w-full px-2 py-4 outline-none bg-green-50 rounded-md focus:bg-green-100"
                                onChange={handleInput}
                                type="text"
                                name="license_plate"
                                placeholder="لوحة ترخيص الحافلة"
                                disabled={location.state?.isReadOnly}
                                value={busFormData.license_plate}
                            />
                            <input
                                className="border-none w-full px-2 py-4 outline-none bg-green-50 rounded-md focus:bg-green-100"
                                onChange={handleInput}
                                type="text"
                                name="contact_info"
                                placeholder="معلومات التواصل"
                                disabled={location.state?.isReadOnly}
                                value={busFormData.contact_info}
                            />
                            <input
                                className="border-none w-full px-2 py-4 outline-none rounded-md bg-green-50 focus:bg-green-100"
                                onChange={handleInputNumber}
                                type="number"
                                name="bus_capacity"
                                disabled={location.state?.isReadOnly}
                                placeholder="سعة الحافلة"
                                value={busFormData.bus_capacity}
                            />
                            <textarea
                                onChange={handleInput}
                                value={busFormData.bus_details}
                                className="w-full px-2 py-4 outline-none bg-green-50 rounded-md border-none focus:bg-green-100"
                                rows={4}
                                name="bus_details"
                                placeholder="معلومات الحافله"
                                disabled={location.state?.isReadOnly}
                            />
                            <textarea
                                onChange={handleInput}
                                value={busFormData.bus_routes}
                                className="w-full px-2 py-4 outline-none bg-green-50 rounded-md border-none focus:bg-green-100"
                                rows={4}
                                name="bus_routes"
                                placeholder="مسار الحافله"
                                disabled={location.state?.isReadOnly}
                            />
                            <div className="w-full px-2 py-4 flex justify-start items-center">
                                <label className="ltr:mr-4 rtl:ml-4 w-1/2 text-xl text-start">مشرف الحافله (مستخدم)</label>
                                <select
                                    onChange={handleInputNumber}
                                    name="supervisor"
                                    className="border p-4 flex-auto"
                                    value={busFormData.supervisor || ''}
                                    disabled={location.state?.isReadOnly}
                                >
                                    <option value="">اختر مشرف الحافلة</option>
                                    {supervisorData.map((supervisor, index) => (
                                        <option key={index} value={supervisor.id}>{supervisor.username}</option>
                                    ))}
                                </select>
                            </div>
                            {!location.state?.isReadOnly && (
                                <button
                                    type="submit"
                                    className="w-full text-xl font-bold rounded text-green-500 py-4 border-2 border-green-100 hover:bg-green-500 hover:text-white"
                                >
                                    {location.state?.id ? 'تعديل' : 'إضافة'}
                                </button>
                            )}
                        </form>
                    </div>
                </>
            )}
        </div>
    );
};

export default BusForm;