import { useEffect, useState } from "react";
import getCookie from "../../data/control/setCookie";
import { useLocation, useNavigate } from "react-router-dom";
import { COOKIE_HEADER_NAME, COOKIE_NAME,SystemAxios } from "../../utils/custom_axios";
import { SCHOOL_GRADES } from "../../data/static/constants";

const RelationForm = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [relationFormData, setRelationFormData] = useState({
        bus: 1,
        supervisor: 1,
        student: 1,
        parent: 1,
    });

    const [parentsData, setParentsData] = useState([]);
    const [supervisorsData, setSupervisorsData] = useState([]);
    const [busesData, setBusesData] = useState([]);
    const [studentsData, setStudentsData] = useState([]);

    const getStudentData = async () => {
        try {
            const response = await SystemAxios.get(`/students/${location.state.id}/`,{}, {
                withCredentials: true,
                headers: {
                    COOKIE_HEADER_NAME: getCookie(COOKIE_NAME)
                }
            });
            if (response.status === 200) {
                const data = response.data;
                setRelationFormData(prevData => ({
                    ...prevData,
                    ...data,
                    parent: data.parent.id, // Safeguard for parent
                }));
            }
        } catch (error) {
            console.error(error.response);
        }
    };

    const getBusesData = async () => {
        try {
            const response = await SystemAxios.get(`/students//`,{}, {
                withCredentials: true,
                headers: {
                    COOKIE_HEADER_NAME: getCookie(COOKIE_NAME)
                }
            });
            if (response.status === 200) {
                const data = response.data;
                setRelationFormData(prevData => ({
                    ...prevData,
                    ...data,
                    parent: data.parent.id, // Safeguard for parent
                }));
            }
        } catch (error) {
            console.error(error.response);
        }
    };

    const getSupervisorsData = async () => {
        try {
            const response = await SystemAxios.get(`/users/`,{}, {
                withCredentials: true,
                headers: {
                    COOKIE_HEADER_NAME: getCookie(COOKIE_NAME)
                }
            });
            if (response.status === 200) {
                const data = response.data;
                setRelationFormData(prevData => ({
                    ...prevData,
                    ...data,
                    parent: data.parent.id, // Safeguard for parent
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

        getParentsData();

        if (location.state && location.state.id) {
            getStudentData();
        } else {
            const date = new Date(2000, 0, 1).toISOString().split('T')[0];
            setRelationFormData(prevData => ({
                ...prevData,
                date_of_birth: date,
            }));
        }
    }, [location.state, navigate]);

    const handleInput = (event) => {
        const { name, value } = event.target;
        setRelationFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleInputNumber = (event) => {
        const { name, value } = event.target;
        // 10 to 10th number system
        // [name] export string to object key
        setRelationFormData(prevData => ({ ...prevData, [name]: parseInt(value, 10) }));
    };

    const handleRadioInput = (event) => {
        const { value } = event.target;
        // if value is male returns true else false
        setRelationFormData(prevData => ({ ...prevData, gender: value === 'male' }));
    };

    const saveNewStudentData = async () => {
        try {
            const response = await SystemAxios.post('/students/create/', relationFormData,  {
                withCredentials: true,
                headers: {
                    'X-CSRFToken': getCookie('csrftoken')
                }
            });
            if (response.status === 201) {
                console.log('Student Created');
                navigate(-1);
            }
        } catch (error) {
            console.error(error.response);
        }
    };

    const updateStudentData = async () => {
        console.log('')
        try {
            const response = await SystemAxios.put(`/students/update/${location.state.id}/`, relationFormData, {
                withCredentials: true,
                headers: {
                    'X-CSRFToken': getCookie('csrftoken')
                }
            });
            if (response.status === 200) {
                console.log('Student updated');
                navigate(-1);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        if (location.state && location.state.id) {
            updateStudentData();
        } else {
            saveNewStudentData();
        }
    };

    const getParentsData = async () => {
        try {
            const response = await SystemAxios.get('/users/parent-names/',{}, {
                withCredentials: true,
                headers: {
                    COOKIE_HEADER_NAME: getCookie(COOKIE_NAME)
                }
            });
            if (response.status === 200) {
                setParentsData(response.data);
            }
        } catch (error) {
            console.error(error.response);
        }
    };

    return (
        <div className="w-screen h-screen">
            {parentsData.length === 0 ? (
                <h1>لايوجد أولياء أمر الرجاء الاضافة اولا</h1>
            ) : (
                <>
                    <div className="text-3xl font-bold py-4 mx-4 mb-4 text-blue-500">
                        <h1>{location.state?.title || 'Student Form'}</h1>
                    </div>
                    <div className="w-full px-4">
                        <form className="w-full flex flex-col justify-evenly items-center space-y-2" onSubmit={onFormSubmit}>
                            <input
                                className="border-none w-full px-2 py-4 outline-none bg-blue-50 rounded-md focus:bg-blue-100"
                                onChange={handleInput}
                                type="text"
                                name="student_name"
                                placeholder="الاسم"
                                disabled={location.state?.isReadOnly}
                                value={relationFormData.student_name}
                            />
                            <input
                                className="border-none w-full px-2 py-4 outline-none rounded-md bg-blue-50 focus:bg-blue-100"
                                onChange={handleInputNumber}
                                type="number"
                                name="age"
                                disabled={location.state?.isReadOnly}
                                placeholder="العمر"
                                value={relationFormData.age}
                            />
                            <div className="w-full px-2 py-4 flex justify-start items-center">
                                <label className="ltr:mr-8 rtl:ml-8 text-xl flex-1">الجنس</label>
                                <div className="flex-auto">
                                    <input
                                        onChange={handleRadioInput}
                                        checked={relationFormData.gender}
                                        value="male"
                                        className="ltr:mr-2 rtl:ml-2"
                                        id="male"
                                        disabled={location.state?.isReadOnly}
                                        type='radio'
                                        name="gender"
                                    />
                                    <label htmlFor="male" className="text-xl">ذكر</label>
                                </div>
                                <div className="flex-auto">
                                    <input
                                        onChange={handleRadioInput}
                                        checked={!relationFormData.gender}
                                        value="female"
                                        className="ltr:mr-2 rtl:ml-2"
                                        readOnly={location.state?.isReadOnly}
                                        id="female"
                                        type='radio'
                                        name="gender"
                                        disabled={location.state.isReadOnly}
                                    />
                                    <label htmlFor="female" className="text-xl">أنثى</label>
                                </div>
                            </div>
                            <div className="w-full px-2 py-4 flex justify-start items-center">
                                <label className="ltr:mr-4 rtl:ml-4 w-1/2 text-xl text-start">المرحلة الدراسية</label>
                                <select
                                    onChange={handleInputNumber}
                                    name="grade"
                                    className="border p-4 flex-auto"
                                    value={relationFormData.grade || ''}
                                    disabled={location.state.isReadOnly}
                                >
                                    {SCHOOL_GRADES.map((grade, index) => (
                                        <option key={index} value={index + 1}>{grade}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-full px-2 py-4 flex justify-start items-center">
                                <label className="ltr:mr-4 rtl:ml-4 w-1/2 text-xl text-start">ولي الأمر (مستخدم)</label>
                                <select
                                    onChange={handleInputNumber}
                                    name="parent"
                                    className="border p-4 flex-auto"
                                    value={relationFormData.parent || ''}
                                    disabled={location.state.isReadOnly}
                                >
                                    <option value="">اختر ولي الأمر</option>
                                    {parentsData.map((parent) => (
                                        <option key={parent.id} value={parent.id}>{parent.username}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-full px-2 py-4 flex justify-start items-center">
                                <label className="ltr:mr-4 rtl:ml-4 w-1/2 text-start text-xl" htmlFor="date">تاريخ الميلاد</label>
                                <input
                                    onChange={handleInput}
                                    value={relationFormData.date_of_birth}
                                    className="border p-4 flex-auto"
                                    id="date"
                                    type="date"
                                    name="date_of_birth"
                                    disabled={location.state.isReadOnly}
                                />
                            </div>
                            <textarea
                                onChange={handleInput}
                                value={relationFormData.health_state}
                                className="w-full px-2 py-4 outline-none bg-blue-50 rounded-md border-none focus:bg-blue-100"
                                rows={4}
                                name="health_state"
                                placeholder="الحالة الصحية"
                                disabled={location.state.isReadOnly}
                            />
                            <textarea
                                onChange={handleInput}
                                value={relationFormData.contact_information}
                                className="w-full px-2 py-4 outline-none bg-blue-50 rounded-md border-none focus:bg-blue-100"
                                rows={4}
                                name="contact_information"
                                placeholder="معلومات التواصل"
                                disabled={location.state.isReadOnly}
                            />
                            {!location.state?.isReadOnly && (
                                <button
                                    type="submit"
                                    className="w-full text-xl font-bold rounded text-blue-500 py-4 border-2 border-blue-100 hover:bg-blue-500 hover:text-white"
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

export default RelationForm;