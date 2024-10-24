// import "./App.css";
// import SignInForm from "./component/signIn.jsx";
// import EditSuper from "./component/EditSupervisor.jsx";
// import { Route, Routes } from "react-router-dom";
// import NoMachFound from "./component/NoMatchfound.jsx";
// import RegisterSuper from "./component/RgisterSuper.jsx";
// import AdminHomePage from "./component/AdminHomePage.jsx";
// import ChatApp from "./component/chatApp.jsx";
// import ListSupervisor from "./component/ListSpuervisor.jsx";
// import ListStudent from "./component/listStudent.jsx";
// // import ListOfBuses from './component/BuseList.jsx'
// import StudentForm from "./component/forms/student_form.jsx";
// import ListBuses from "./component/list_buses.jsx";
// import BusForm from "./component/forms/bus_form.jsx";
// import Parents from "./component/Parents.jsx";
// import RegisterParent from "./component/RegisterParent.jsx";
// import EditParent from "./component/EditParent.jsx";
// import AttendanceList from "./component/attendance_list.jsx";
// import AttendanceForm from "./component/forms/attendance_form.jsx";
// import ChatContacts from "./component/chat_contacts.jsx";
// import StudentPhotoForm from "./component/forms/student_photo_form.jsx";

// function App() {
//     return (
//         <Routes>
//             <Route path="/" element={<SignInForm />} />
//             <Route path="AdminHomePage" element={<AdminHomePage />} />
//             <Route path="ListStudent/student-form" element={<StudentForm />} />
//             <Route
//                 path="ListStudent/student-photo-form"
//                 element={<StudentPhotoForm />}
//             />
//             <Route path="ListOfBuses/bus-form" element={<BusForm />} />
//             <Route path="ListSupervisor" element={<ListSupervisor />} />
//             <Route path="ListStudent" element={<ListStudent />} />
//             <Route path="attendance-list" element={<AttendanceList />} />
//             <Route path="ListOfBuses" element={<ListBuses />} />
//             <Route path="RegisterSuper" element={<RegisterSuper />} />
//             <Route path="EditSuper" element={<EditSuper />} />
//             <Route path="Parents" element={<Parents />} />
//             <Route path="RegisterParent" element={<RegisterParent />} />
//             <Route path="EditParent" element={<EditParent />} />
//             <Route path="chat-contacts" element={<ChatContacts />} />
//             <Route path="chat-contacts/ChatApp" element={<ChatApp />} />
//             {/* <Route path="attendance-list" element={<AttendanceList />} /> */}
//             {/* </Route> */}
//             <Route
//                 path="attendance-list/attendance-form"
//                 element={<AttendanceForm />}
//             />
//             <Route path="*" element={<NoMachFound />} />
//         </Routes>
//     );
// }

// export default App;

import "./App.css";
import LoginPage from "./component/login.jsx";
import EditSupervisor from "./component/edit_supervisor.jsx"; // Fixed naming
import { Route, Routes } from "react-router-dom";
import NoMatchFound from "./component/no_match_found.jsx"; // Fixed naming
import RegisterSupervisor from "./component/user_form_page.jsx"; // Fixed naming
import AdminHomePage from "./component/admin_home_page.jsx";
import ChatApp from "./component/chat_app.jsx";
import SupervisorPage from "./component/supervisor_page.jsx"; // Fixed naming
import StudentsPage from "./component/students_page.jsx";
import StudentForm from "./component/forms/student_form.jsx";
import ListBuses from "./component/list_buses.jsx";
import BusForm from "./component/forms/bus_form.jsx";
import ParentsPage from "./component/parents_page.jsx";
import RegisterParent from "./component/register_parent.jsx";
import EditParent from "./component/edit_parent.jsx";
import AttendanceList from "./component/attendance_list.jsx";
import ChatContacts from "./component/chat_contacts.jsx";
import StudentPhotoForm from "./component/forms/student_photo_form.jsx";
// import { AppProvider } from "./utils/context.jsx";
import Profile from "./component/profile.jsx";
import SettingsPage from "./component/setting_page.jsx";
import NotificationPage from "./component/notification_page.jsx";
import SuperHomePage from "./component/supervisor/SuperHomePage.jsx";
import ParentHomePage from "./component/parents/parent_home_page.jsx";
import ParentsProfile from "./component/parents/parent_profile.jsx";
import ParentTrackBus from "./component/parents/parent_track_bus.jsx";
import ReportPage from "./component/report_page.jsx";
import BuseReport from "./component/bus_report.jsx";
import AttendanceForm from "./component/forms/attedance_form.jsx";
import { GeolocationProvider } from "./utils/location_context.jsx";
import BusReport from "./component/bus_report.jsx";
import ChangePasswordForm from "./component/forms/change_password_form.jsx";
import AttendanceCameraForm from "./component/forms/attendance_camera_form.jsx";
import SettingsOptions from "./component/settings_options.jsx";
import UserFormPage from "./component/user_form_page.jsx";
import StudentAbsencePage from "./component/student_absence_page.jsx";

function App() {
    return (
        // <AppProvider>
        <GeolocationProvider>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="HomeParent" element={<ParentHomePage />} />
                <Route path="SuperHomePage" element={<SuperHomePage />} />
                <Route
                    path="SuperHomePage/change-password"
                    element={<ChangePasswordForm />}
                />
                <Route path="SuperHomePage/reports" element={<BusReport />} />
                <Route path="AdminHomePage" element={<AdminHomePage />} />
                <Route
                    path="AdminHomePage/change-password"
                    element={<ChangePasswordForm />}
                />
                <Route
                    path="AdminHomePage/NotificationPage"
                    element={<NotificationPage />}
                />
                <Route
                    path="AdminHomePage/SettingsPage"
                    element={<SettingsOptions />}
                />
                <Route
                    path="SettingsPage"
                    element={<SettingsOptions />}
                />
                <Route
                    path="AdminHomePage/ReportPage"
                    element={<AttendanceList />}
                />
                <Route
                    path="AdminHomePage/chat-contacts"
                    element={<ChatContacts />}
                />
                <Route
                    path="AdminHomePage/chat-contacts/ChatApp"
                    element={<ChatApp />}
                />
                <Route
                    path="HomeParent/chat-contacts"
                    element={<ChatContacts />}
                />
                <Route
                    path="HomeParent/chat-contacts/ChatApp"
                    element={<ChatApp />}
                />
                <Route
                    path="AdminHomePage/SettingsPage/view-profile"
                    element={<ParentsProfile />}
                />
                <Route
                    path="SettingsPage/view-profile"
                    element={<UserFormPage />}
                />
                <Route
                    path="SettingsPage/edit-profile"
                    element={<UserFormPage />}
                />
                <Route
                    path="AdminHomePage/SettingsPage/change-password"
                    element={<ChangePasswordForm />}
                />
                <Route
                    path="SettingsPage/change-password"
                    element={<ChangePasswordForm />}
                />
                <Route
                    path="AdminHomePage/ListStudent/student-form"
                    element={<StudentForm />}
                />
                <Route
                    path="AdminHomePage/ListStudent/student-photo-form"
                    element={<StudentPhotoForm />}
                />
                <Route
                    path="AdminHomePage/ListOfBuses/bus-form"
                    element={<BusForm />}
                />
                <Route
                    path="AdminHomePage/ListSupervisor"
                    element={<SupervisorPage />}
                />
                <Route
                    path="AdminHomePage/ListStudent"
                    element={<StudentsPage />}
                />
                <Route path="attendance-list" element={<AttendanceList />} />
                <Route
                    path="attendance-list/attendance-camera"
                    element={<AttendanceCameraForm />}
                />
                <Route
                    path="AdminHomePage/ListOfBuses"
                    element={<ListBuses />}
                />
                <Route path="form/*" element={<RegisterSupervisor />} />
                <Route path="EditSuper" element={<EditSupervisor />} />
                <Route path="AdminHomePage/Parents" element={<ParentsPage />} />
                <Route path="RegisterParent" element={<RegisterParent />} />
                <Route path="EditParent" element={<EditParent />} />
                <Route path="chat-contacts" element={<ChatContacts />} />
                <Route path="chat-contacts/ChatApp" element={<ChatApp />} />
                <Route
                    path="attendance-list/attendance-form"
                    element={<AttendanceForm />}
                />
                <Route path="Profile" element={<Profile />} />
                <Route path="ParentsProfile" element={<ParentsProfile />} />
                <Route
                    path="HomeParent/SettingsPage"
                    element={<SettingsOptions />}
                />
                <Route
                    path="HomeParent/SettingsPage/view-profile"
                    element={<UserFormPage />}
                />
                <Route
                    path="HomeParent/SettingsPage/edit-profile"
                    element={<UserFormPage />}
                />
                <Route
                    path="HomeParent/SettingsPage/change-password"
                    element={<ChangePasswordForm     />}
                />
                <Route path="NotificationPage" element={<NotificationPage />} />
                <Route
                    path="HomeParent/NotificationPage"
                    element={<NotificationPage />}
                />
                <Route
                    path="HomeParent/ParentsProfile"
                    element={<ParentsProfile />}
                />
                <Route
                    path="HomeParent/student-absence"
                    element={<StudentAbsencePage />}
                />
                <Route path="HomeParent/track-bus" element={<ParentTrackBus />} />
                <Route path="ReportPage" element={<ReportPage />} />
                <Route path="BuseReport" element={<BuseReport />} />
                <Route path="*" element={<NoMatchFound />} />
            </Routes>
        </GeolocationProvider>
        // </AppProvider>
    );
}

export default App;
