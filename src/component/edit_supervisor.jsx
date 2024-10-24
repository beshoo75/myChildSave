import InputField from "./widget/input_field";
import MyLabel from "./widget/my_label";
import getCookie from "../data/control/set_cookie";
import CustomButton from "./widget/custom_button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../utils/context";

export default function EditSuper() {
    const { sharedVariable } = useContext(AppContext);
    const [data, setData] = useState(null); // Initialize as null
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/users/${sharedVariable}`,
                    {
                        withCredentials: true,
                        headers: {
                            "X-CSRFToken": getCookie("csrftoken"),
                        },
                    }
                );
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("خطأ في تحميل البيانات");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [sharedVariable]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleInputNumberChange = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: parseInt(value, 10) }));
    };

    const onSubmitAdd = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.put(
                `http://localhost:8000/users/update/${sharedVariable}/`,
                data,
                {
                    withCredentials: true,
                    headers: {
                        "X-CSRFToken": getCookie("csrftoken"),
                    },
                }
            );
            if (res.status === 200) {
                toast.success("تم تعديل المشرف بنجاح");
                navigate(-1);
            }
        } catch (error) {
            console.error(error);
            toast.error("خطأ في تعديل المشرف");
        }
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
            <div dir="rtl" className="flex p-6 m-auto shadow-xl text-right">
                <div className="m-auto">
                    <div className="m-auto text-center">
                        <h2 className="text-lg">
                            تعديل مشرفٍ {data.first_name}
                        </h2>
                    </div>
                    <form role="form" onSubmit={onSubmitAdd}>
                        <MyLabel text="رقم الجوال" />
                        <InputField
                            value={data.phone_number || ""}
                            onChange={handleInputNumberChange}
                            type="tel"
                            placeholder="00996"
                            name="phone_number"
                        />
                        <MyLabel text="الاسم الاول" />
                        <InputField
                            value={data.first_name || ""}
                            onChange={handleInputChange}
                            type="text"
                            placeholder="first name"
                            name="first_name"
                        />
                        <MyLabel text="الاسم الاخير" />
                        <InputField
                            value={data.last_name || ""}
                            onChange={handleInputChange}
                            type="text"
                            placeholder="last name"
                            name="last_name"
                        />
                        <MyLabel text="الايميل" />
                        <InputField
                            value={data.email || ""}
                            onChange={handleInputChange}
                            type="email"
                            placeholder="ex@gmail.com"
                            name="email"
                        />
                        <MyLabel text="كلمة سر" />
                        <InputField
                            value={data.password || ""}
                            onChange={handleInputChange}
                            type="password"
                            placeholder="password"
                            name="password"
                        />
                        <MyLabel text="الجنسية" />
                        <InputField
                            value={data.nationality || ""}
                            onChange={handleInputChange}
                            type="text"
                            placeholder="nationality"
                            name="nationality"
                        />
                        <MyLabel text="العنوان" />
                        <InputField
                            value={data.home_address || ""}
                            onChange={handleInputChange}
                            type="text"
                            placeholder="address"
                            name="home_address"
                        />
                        <CustomButton type="submit" text="حفظ التعديل" />
                    </form>
                </div>
            </div>
        </>
    );
}
