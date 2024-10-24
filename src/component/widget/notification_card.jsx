// import PropTypes from "prop-types";
// function NotificationCard({ notification }) {
//     return (
//         <div className="bg-white shadow-md rounded-lg p-4 mb-4">
//             <h3 className="text-xl font-bold">{notification.title}</h3>
//             <p className="text-green-600 font-semibold">
//                 {notification.message}
//             </p>
//             <p className="text-gray-500">
//                 {new Date(notification.notif_timestamp).toLocaleString()}
//             </p>
//             <div className="flex justify-around my-2">
//                 <button className="border border-green-300 rounded p-2 hover:bg-green-100">
//                     تعين كمقروة
//                 </button>
//                 <button className="border border-red-300 rounded p-2 hover:bg-red-200">
//                     الغاء
//                 </button>
//             </div>
//         </div>
//     );
// }

// NotificationCard.propTypes = {
//     notification: PropTypes.object(
//         PropTypes.shape({
//             id: PropTypes.number.isRequired,
//             title: PropTypes.string.isRequired,
//             message: PropTypes.string.isRequired,
//             notif_timestamp: PropTypes.string.isRequired,
//             read: PropTypes.bool,
//             user: PropTypes.number,
//         })
//     ),
// };

// export default NotificationCard;

import PropTypes from "prop-types";
import { useGeolocation } from "../../utils/location_context";

function NotificationCard({ notification }) {
    const { updateNotificationsState } = useGeolocation();

    const buttonEventHandler = (event, id) => {
        event.preventDefault();
        updateNotificationsState(id);
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
            <h3 className="text-xl font-bold">{notification.title}</h3>
            <p className="text-green-600 font-semibold">
                {notification.message}
            </p>
            <p className="text-gray-500">
                {new Date(notification.notif_timestamp).toLocaleString()}
            </p>
            <div className="flex justify-around my-2">
                <button
                    onClick={(event) => buttonEventHandler(event, notification.id)}
                    className="border border-green-300 rounded p-2 hover:bg-green-100"
                >
                    تعين كمقروة
                </button>
                <button className="border border-red-300 rounded p-2 hover:bg-red-200">
                    الغاء
                </button>
            </div>
        </div>
    );
}

NotificationCard.propTypes = {
    notification: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        notif_timestamp: PropTypes.string.isRequired,
        read: PropTypes.bool,
        user: PropTypes.number,
    }).isRequired, // Ensure notification prop is required
};

export default NotificationCard;
