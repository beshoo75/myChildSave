import InputFiled from "./widget/input_field";
import MyLable from "./widget/my_label";
import logo from '../assets/img/curved-images/curved1.jpg'
import CustomButton from "./widget/custom_button";
import { useNavigate } from "react-router-dom";
export default function Register() {
    const navigate = useNavigate()
    return (
        <>
            <div dir="rtl" class="flex-auto p-6 text-right ">
                <img src={logo} alt="not found" className="w-2/5 scroll-mr-44 mb-10" />
                <form role="form" className="scroll-mr-44">
                    <MyLable text="رقم الهوية او الاقامة" />
                    <InputFiled type="number" placeholder="IQAMA" />
                    <MyLable text="رقم الجوال" />
                    <InputFiled type="phone" placeholder="00996" />
                    <MyLable text="اسم المستخدم" />
                    <InputFiled type="username" placeholder="username" />
                    <MyLable text="الاسم الاول" />
                    <InputFiled type="text" placeholder="frist name" />
                    <MyLable text="الاسم الاخير" />
                    <InputFiled type="text" placeholder="last name" />
                    <MyLable text="الايميل" />
                    <InputFiled type="email" placeholder="ex@gmail.com" />
                    <MyLable text="الجنسية" />
                    <InputFiled type="text" placeholder="nationality" />
                    <MyLable text="العنوان" />
                    <InputFiled type="file" placeholder="address" />
                    <CustomButton text="اضافة مشرف" onClick={() => { navigate("TreckBus") }} />
                </form>
            </div>
        </>
    )
}