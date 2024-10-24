// import InputFiled from "./widget/input_field";
// import MyLable from "./widget/my_label";
// import logo from '../assets/img//logos/logo.png'
// import getCookie from "../data/control/set_cookie";
// import CustomButton from "./widget/custom_button";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import axios from "axios";
// export default function RegisterParent() {

//     const [userName, setUserName] = useState('');
//     const handleUserNameChange = (event) => {
//         setUserName(event.target.value);
//     };
//     const [email, setEmail] = useState('');
//     const handleEmailChange = (event) => {
//         setEmail(event.target.value);
//     };
//     const [Password, setPassword] = useState('');
//     const handlePasswordChange = (event) => {
//         setPassword(event.target.value);
//     };
//     const [phone, setPhone] = useState('');
//     const handlePhoneChange = (event) => {
//         setPhone(event.target.value);
//     };
//     const [iqamaNumber, setIqamaNumber] = useState('');
//     const handleIqamaNumberChange = (event) => {
//         setIqamaNumber(event.target.value);
//     };
//     const [fristName, setFristName] = useState('');
//     const handleFristNameChange = (event) => {
//         setFristName(event.target.value);
//     };
//     const [lastName, setLastName] = useState('');
//     const handleLastNameChange = (event) => {
//         setLastName(event.target.value);
//     };
//     const [nationality, setNationality] = useState('');
//     const handleNationalityChange = (event) => {
//         setNationality(event.target.value);
//     };
//     const [addrees, setAddrees] = useState('');
//     const handleAddreesChange = (event) => {
//         setAddrees(event.target.value);
//     };

//     const onSubmitAdd = async (event) => {
//         event.preventDefault();
//         await axios
//             .post("http://localhost:8000/users/create/", {
//                 username: userName,
//                 id_doc: iqamaNumber,
//                 email: email,
//                 phone_number: phone,
//                 first_name: fristName,
//                 last_name: lastName,
//                 nationality: nationality,
//                 home_address: addrees,
//                 password: Password,
//                 is_staff: false,
//                 is_superuser: false

//             }, {

//                 withCredentials: true,
//                 headers: {
//                     'X-CSRFToken': getCookie('csrftoken'),
//                 }
//             })
//             .then((res) => {
//                 if (res.status == 200) {
//                     // console.log(res.data)
//                     toast("تم اضافة ولي الامر بنجاح");
//                     navigate('Parents')
//                 }
//             })
//             .catch((error) => {
//                 console.log(error);
//                 // alert('UserName Or PassWord are Incorrect!')
//                 toast('خطا في اضافة ولي الامر');
//             });
//         // console.log("Welcome")
//     };
//     const navigate = useNavigate()

//     return (
//         <>
//             <ToastContainer />
//             <div dir="rtl" class="flex p-6  m-auto shadow-xl text-right">

//                 <div className="m-auto">
//                     <div style={{
//                         backgroundColor: "#c7f9cc"
//                     }} className="text-center p-2 rounded-sm"> <h2>اصافة ولي امر</h2></div>
//                     <form role="form" onSubmit={onSubmitAdd}>
//                         <MyLable text="رقم الهوية او الاقامة" />
//                         <InputFiled value={iqamaNumber} onChange={handleIqamaNumberChange} type="number" placeholder="IQAMA" />
//                         <MyLable text="رقم الجوال" />
//                         <InputFiled value={phone} onChange={handlePhoneChange} type="phone" placeholder="00996" />
//                         <MyLable text="اسم المستخدم" />
//                         <InputFiled value={userName} onChange={handleUserNameChange} type="username" placeholder="username" />
//                         <MyLable text="الاسم الاول" />
//                         <InputFiled value={fristName} onChange={handleFristNameChange} type="text" placeholder="frist name" />
//                         <MyLable text="الاسم الاخير" />
//                         <InputFiled value={lastName} onChange={handleLastNameChange} type="text" placeholder="last name" />
//                         <MyLable text="الايميل" />
//                         <InputFiled value={email} onChange={handleEmailChange} type="email" placeholder="ex@gmail.com" />
//                         <MyLable text="كلمة سر" />
//                         <InputFiled value={Password} onChange={handlePasswordChange} type="password" placeholder="ex@gmail.com" />
//                         <MyLable text="الجنسية" />
//                         <InputFiled value={nationality} onChange={handleNationalityChange} type="text" placeholder="nationality" />
//                         <MyLable text="العنوان" />
//                         <InputFiled value={addrees} onChange={handleAddreesChange} type="text" placeholder="address" />
//                         <CustomButton type="submit" text="اضافة ولي امر" />
//                     </form>
//                 </div>
//             </div>
//         </>
//     )

// }


// import InputFiled from "./widget/input_field";
// import MyLable from "./widget/my_label";
// // import logo from '../assets/img//logos/logo.png'
// import getCookie from "../data/control/set_cookie";
// import CustomButton from "./widget/custom_button";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import { SystemAxios } from "../utils/custom_axios";
// export default function RegisterSuper() {
//     const [userName, setUserName] = useState('');
//     const handleUserNameChange = (event) => {
//         setUserName(event.target.value);
//     };
//     const [email, setEmail] = useState('');
//     const handleEmailChange = (event) => {
//         setEmail(event.target.value);
//     };
//     const [password, setPassword] = useState('');
//     const handlePasswordChange = (event) => {
//         setPassword(event.target.value);
//     };
//     const [phone, setPhone] = useState('');
//     const handlePhoneChange = (event) => {
//         setPhone(event.target.value);
//     };
//     const [iqamaNumber, setIqamaNumber] = useState('');
//     const handleIqamaNumberChange = (event) => {
//         setIqamaNumber(event.target.value);
//     };
//     const [firstName, setFristName] = useState('');
//     const handleFristNameChange = (event) => {
//         setFristName(event.target.value);
//     };
//     const [lastName, setLastName] = useState('');
//     const handleLastNameChange = (event) => {
//         setLastName(event.target.value);
//     };
//     const [nationality, setNationality] = useState('');
//     const handleNationalityChange = (event) => {
//         setNationality(event.target.value);
//     };
//     const [addrees, setAddrees] = useState('');
//     const handleAddreesChange = (event) => {
//         setAddrees(event.target.value);
//     };

import { useLocation } from "react-router-dom"
import UserForm from "./forms/user_form"

//     const onSubmitAdd = async (event) => {
//         event.preventDefault();
//         const response = await SystemAxios.post("/users/create/", {
//             username: userName,
//             id_doc: iqamaNumber,
//             email: email,
//             phone_number: phone,
//             first_name: firstName,
//             last_name: lastName,
//             nationality: nationality,
//             home_address: addrees,
//             password: password,
//             is_staff: true,
//             is_superuser: false
//         }, {

//             withCredentials: true,
//             headers: {
//                 'X-CSRFToken': getCookie('csrftoken'),
//             }
//         })
//             .then((res) => {
//                 if (res.status == 200) {
//                     // console.log(res.data)
//                     toast("تم اضافة المشرف بنجاح");
//                     navigate('ListSupervisor')
//                 }
//             })
//             .catch((error) => {
//                 console.log(error);
//                 // alert('UserName Or PassWord are Incorrect!')
//                 toast('خطا في اضافة المشرف');
//             });
//         // console.log("Welcome")
//     };
//     const navigate = useNavigate()

//     return (
//         <>
//             <ToastContainer />
//             <div dir="rtl" className="flex p-6  m-auto shadow-xl text-right">
//                 {/* <img src={logo} alt="not found" className="h-1/5" /> */}
//                 <div className="m-auto">

//                     <form role="form" onSubmit={onSubmitAdd}>
//                         <MyLable text="رقم الهوية او الاقامة" />
//                         <InputFiled value={iqamaNumber} onChange={handleIqamaNumberChange} type="number" placeholder="IQAMA" />
//                         <MyLable text="رقم الجوال" />
//                         <InputFiled value={phone} onChange={handlePhoneChange} type="phone" placeholder="00996" />
//                         <MyLable text="اسم المستخدم" />
//                         <InputFiled value={userName} onChange={handleUserNameChange} type="username" placeholder="username" />
//                         <MyLable text="الاسم الاول" />
//                         <InputFiled value={firstName} onChange={handleFristNameChange} type="text" placeholder="frist name" />
//                         <MyLable text="الاسم الاخير" />
//                         <InputFiled value={lastName} onChange={handleLastNameChange} type="text" placeholder="last name" />
//                         <MyLable text="الايميل" />
//                         <InputFiled value={email} onChange={handleEmailChange} type="email" placeholder="ex@gmail.com" />
//                         <MyLable text="كلمة سر" />
//                         <InputFiled value={password} onChange={handlePasswordChange} type="password" placeholder="ex@gmail.com" />
//                         <MyLable text="الجنسية" />
//                         <InputFiled value={nationality} onChange={handleNationalityChange} type="text" placeholder="nationality" />
//                         <MyLable text="العنوان" />
//                         <InputFiled value={addrees} onChange={handleAddreesChange} type="text" placeholder="address" />
//                         <CustomButton type="submit" text="اضافة مشرف" />
//                     </form>
//                 </div>
//             </div>
//         </>
//     )
// }

const RegisterParent = ()=>{
    const location = useLocation()

    return (
        <UserForm userID={location.state?.id} isStaff={location.state?.staff} isReadOnly={location.state?.readOnly} />
    )
}

export default RegisterParent