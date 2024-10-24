import InputFiled from "./widget/input_field";
import MyLable from "./widget/my_label";
import getCookie from "../data/control/set_cookie";
import CustomButton from "./widget/custom_button";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import React, { useContext } from 'react';
import { AppContext } from "../utils/context";
import { useNavigate } from "react-router-dom";
export default function EditParent() {
    const navigate = useNavigate();
    const { sharedVariable } = useContext(AppContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState('');
    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
    };
    const [iqamaNumber, setIqamaNumber] = useState('');
    const handleIqamaNumberChange = (event) => {
        setIqamaNumber(event.target.value);
    };
    const [fristName, setFristName] = useState('');
    const handleFristNameChange = (event) => {
        setFristName(event.target.value);
    };
    const [lastName, setLastName] = useState('');
    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };
    const [phone, setPhone] = useState('');
    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };
    const [nationality, setNationality] = useState('');
    const handleNationalityChange = (event) => {
        setNationality(event.target.value);
    };
    const [addrees, setAddrees] = useState('');
    const handleAddreesChange = (event) => {
        setAddrees(event.target.value);
    };
    const [email, setEmail] = useState('');
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const [Password, setPassword] = useState('');
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await axios.get(`http://localhost:8000/users/${sharedVariable}`, {
                    withCredentials: true,
                    headers: {
                        'X-CSRFToken': getCookie('csrftoken'),
                    },
                }) // Replace with your API endpoint
                setData(response.data);
                setUserName(response.data.username),
                    setIqamaNumber(response.data.id_doc),
                    setFristName(response.data.first_name),
                    setLastName(response.data.last_name),
                    setPhone(response.data.phone_number),
                    setEmail(response.data.email),
                    setPassword(response.data.password),
                    setNationality(response.data.nationality),
                    setAddrees(response.data.home_address)

                setLoading(false);


            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    const onSubmitEdit = async (event) => {
        event.preventDefault();
        await axios
            .put(`http://localhost:8000/users/update/${sharedVariable}/`, {
                username: userName,
                id_doc: iqamaNumber,
                email: email,
                phone_number: phone,
                first_name: fristName,
                last_name: lastName,
                nationality: nationality,
                home_address: addrees,
                password: Password,
                is_staff: false,
                is_superuser: false

            }, {

                withCredentials: true,
                headers: {
                    'X-CSRFToken': getCookie('csrftoken'),
                }
            })
            .then((res) => {
                if (res.status == 200) {
                    // console.log(res.data)
                    toast("تم تعديل ولي الامر بنجاح");
                    navigate(-1)
                }
            })
            .catch((error) => {
                console.log(error);
                // alert('UserName Or PassWord are Incorrect!')
                toast('خطا في تعديل ولي الامر');
            });
        // console.log("Welcome")
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!data) {
        return <div>No data found</div>;
    }
    return (
        <>
            <ToastContainer />
            <div dir="rtl" class="flex p-6  m-auto shadow-xl text-right">
                {/* <img src={logo} alt="not found" className="h-1/5" /> */}
                <div className="m-auto">
                    <div className="m-auto text-center"><h2 className="text-lg">تعديل مشرفٍ {data.first_name}</h2></div>
                    <form role="form" onSubmit={onSubmitEdit}>
                        <MyLable text="رقم الهوية او الاقامة" />
                        <InputFiled value={iqamaNumber} onChange={handleIqamaNumberChange} type="number" placeholder="IQAMA" />
                        <MyLable text="اسم المستخدم" />
                        <InputFiled value={userName} onChange={handleUserNameChange} type="username" placeholder="username" />
                        <MyLable text="رقم الجوال" />
                        <InputFiled value={phone} onChange={handlePhoneChange} type="phone" placeholder="00996" />
                        <MyLable text="الاسم الاول" />
                        <InputFiled value={fristName} onChange={handleFristNameChange} type="text" placeholder="frist name" />
                        <MyLable text="الاسم الاخير" />
                        <InputFiled value={lastName} onChange={handleLastNameChange} type="text" placeholder="last name" />
                        <MyLable text="الايميل" />
                        <InputFiled value={email} onChange={handleEmailChange} type="email" placeholder="ex@gmail.com" />
                        <MyLable text="كلمة سر" />
                        <InputFiled value={Password} onChange={handlePasswordChange} type="password" placeholder="ex@gmail.com" />
                        <MyLable text="الجنسية" />
                        <InputFiled value={nationality} onChange={handleNationalityChange} type="text" placeholder="nationality" />
                        <MyLable text="العنوان" />
                        <InputFiled value={addrees} onChange={handleAddreesChange} type="text" placeholder="address" />
                        <CustomButton type="submit" text="حفظ التعديل" />
                    </form>
                </div>
            </div>
        </>
    )
}

