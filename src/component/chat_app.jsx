// import { useEffect, useState } from "react";
// import MessageList from "./widget/MessageList";
// import MessageInput from "./widget/MessageInput";
// import { useLocation } from "react-router-dom";

// const ChatApp = () => {
//     const [allMessages, setAllMessages] = useState([]);
//     const location = useLocation();
//     const socketConnection = () => {
//         socket.onmessage = (event) => {
//             const data = JSON.parse(event.data);
//             if (data.messages) {
//                 setAllMessages(data.messages);
//             } else {
//                 setAllMessages((prevData) => [
//                     ...prevData,
//                     {
//                         user: data.user,
//                         message_text: data.message_text,
//                         room_name: data.room_name,
//                     },
//                 ]);
//             }
//             console.log(data)
//         };
//         return () => {
//             socket.close();
//         };
//     };

//     useEffect(() => {
//         // setRoomName(location.state?.roomName);
//         socketConnection();
//     }, []);

//     let socket = new WebSocket(
//         `ws://localhost:8000/ws/chat/${location.state?.roomName}/`
//     );

//     const sendMessage = (text) => {
//         // console.log(text);
//         if (socket && text) {
//             socket.send(
//                 JSON.stringify({
//                     message_text: text,
//                     user: localStorage.getItem('id'),
//                 })
//             );
//         }
//         // setMessage(text);
//     };

//     return (
//         <div className="w-screen h-screen flex flex-col p-4 bg-gray-100">
//             <h1 className="text-2xl h-auto font-bold text-center mb-4">
//                 التحدث مع
//             </h1>
//             <MessageList messages={allMessages} />
//             <MessageInput addMessage={sendMessage} />
//         </div>
//     );
// };

// export default ChatApp;

// import { useEffect, useState } from "react";
// import MessageList from "./widget/message_list";
// import MessageInput from "./widget/MessageInput";
// import { useLocation } from "react-router-dom";

// const ChatApp = () => {
//     const [allMessages, setAllMessages] = useState([]);
//     const location = useLocation();
//     const roomName = location.state?.roomName;
//     const socket = new WebSocket(`ws://localhost:8000/ws/chat/${roomName}/`);

//     useEffect(() => {
//         socket.onmessage = (event) => {
//             const data = JSON.parse(event.data);
//             if (data.messages) {
//                 setAllMessages(data.messages);
//             } else {
//                 setAllMessages((prevData) => [
//                     ...prevData,
//                     {
//                         user: data.user,
//                         message_text: data.message_text,
//                         room_name: data.room_name,
//                     },
//                 ]);
//             }
//             // console.log(data);
//         };

//         socket.onerror = (error) => {
//             console.error("WebSocket error:", error);
//         };

//         return () => {
//             socket.close();
//         };
//     }, []);

//     const sendMessage = (text) => {
//         if (text) {
//             const message = {
//                 message_text: text,
//                 user: localStorage.getItem("id"),
//             };
//             socket.send(JSON.stringify(message));
//         }
//     };

//     return (
//         <div className="w-screen h-screen flex flex-col bg-gray-100">
//             <div className="w-full text-center p-2 shadow flex flex-col justify-evenly items-center bg-white">
//                 <h1 className="text-2xl font-bold ">
//                     {location.state?.contact[0]}
//                     <p className="text-gray-400 text-sm">
//                         {location.state?.contact[1]}{" "}
//                         {location.state?.contact[2]}
//                     </p>
//                 </h1>
//             </div>
//             <MessageList messages={allMessages} />
//             <MessageInput addMessage={sendMessage} />
//         </div>
//     );
// };

// export default ChatApp;

import { useEffect, useState } from "react";
import MessageList from "./widget/message_list";
import MessageInput from "./widget/message_input";
import { useLocation } from "react-router-dom";

const ChatApp = () => {
    const [allMessages, setAllMessages] = useState([]);
    const location = useLocation();
    const roomName = location.state?.roomName;
    const socket = new WebSocket(
        `wss://${window.location.hostname}/ws/chat/${roomName}/`
    );

    useEffect(() => {
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.messages) {
                setAllMessages(data.messages);
            } else {
                setAllMessages((prevData) => [
                    ...prevData,
                    {
                        user: parseInt(data.user),
                        message_text: data.message_text,
                        room_name: data.room_name,
                    },
                ]);
            }
        };

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        return () => {
            socket.close();
        };
    }, []);

    const sendMessage = (text) => {
        if (text) {
            const message = {
                message_text: text,
                user: parseInt(localStorage.getItem("id")),
            };
            socket.send(JSON.stringify(message));
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="w-full text-center p-4 shadow-lg bg-gradient-to-r from-blue-500 to-blue-400 text-white">
                <h1 className="text-3xl font-bold">
                    {location.state?.contact[0]}
                </h1>
                <p className="text-gray-200 text-sm">
                    {location.state?.contact[1]} {location.state?.contact[2]}
                </p>
            </div>
            <div className="flex-grow overflow-y-auto p-4">
                <MessageList messages={allMessages} />
            </div>
            <div className="p-4 bg-white shadow-md">
                <MessageInput addMessage={sendMessage} />
            </div>
        </div>
    );
};

export default ChatApp;
