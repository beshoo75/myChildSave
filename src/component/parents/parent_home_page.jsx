import teacherIcon from "../../assets/img/teacher.svg";
import Navbar from "../widget/navbar";
import chat from "../../assets/img/chatt.svg";
import tracking from "../../assets/img/tracking.svg";
import Footer from "../widget/Footer";
import { useGeolocation } from "../../utils/location_context";
export default function ParentHomePage() {
    const { notifCount, startNotificationsUpdateService } = useGeolocation();
    startNotificationsUpdateService();
    console.log(notifCount);
    return (
        <>
            <Navbar />
            <div className="w-auto p-5 flex items-center justify-around mx-4 mt-20">
                <h1 className=" text-xl text-right">
                    سلامة الحافلات المدرسية
                    <br />
                    مراقبة الأطفال
                    <br />
                    التتبع في الوقت الفعلي
                    <br />
                    التعرف على الوجوه
                    <br />
                    التواصل مع أولياء الأمور
                    <br />
                    كفاءة النقل
                    <br />
                </h1>
                <img
                    src={teacherIcon}
                    alt="no image"
                    className=" w-1/2 text-left p-3"
                />
            </div>
            <div className="w-10/12 p-5 flex items-center justify-between mx-4 mt-20">
                <img
                    src={chat}
                    alt="no image"
                    className="text-green-200 w-1/2 text-center p-3"
                />
                <h1 className=" text-xl text-center">
                    في عالم التطبيقات الحديثة، أصبحت ميزات الشات جزءًا لا يتجزأ
                    من العديد من التطبيقات،
                    <br /> سواء كانت تطبيقات اجتماعية، تعليمية، أو حتى تطبيقات
                    الأعمال.
                    <br />
                    إضافة ميزة الشات يمكن أن تعزز من تجربة المستخدم وتضيف قيمة
                    كبيرة للتطبيق. في هذه التطبيق
                    <br />
                    قمنا في دمج الشات لسهوله التواصل بين اعضاء التطبيق
                </h1>
            </div>
            <div className="w-auto p-5 flex items-center justify-center mx-4 mt-20">
                <h1
                    className="text-black-900 text-xl text-right"
                    style={{ fontFamily: "nucleo.ttf" }}
                >
                    في العصر الرقمي الحالي، أصبحت تطبيقات التتبع جزءًا لا يتجزأ
                    من حياتنا اليومية.
                    <br />
                    سواء كنت ترغب في تتبع موقع أحبائك، أو إدارة أسطول من
                    المركبات،
                    <br />
                    أو حتى تتبع نشاطاتك الرياضية، فإن خاصية التتبع عبر جوجل ماب
                    توفر لك الحل الأمثل.
                    <br />
                    في هذه التطبيق اضفنا التتبع عبر الخريطة لتاكد من امان طفلك .
                    <br />
                </h1>
                <img
                    src={tracking}
                    alt="no image"
                    className="text-green-200 w-1/2 text-left p-3"
                />
            </div>
            <Footer />
        </>
    );
}
