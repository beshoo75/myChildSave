// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Link } from "react-router-dom";
// import PropTypes from "prop-types";

// export const HomeButton = ({ icon, text, pointer }) => {
//     return (
//         <button
//             ref={pointer}
//             className="shadow-md shadow-gray-400 m-2 rounded-xl h-32 w-24 p-2 hover:text-green-600 hover:bg-green-100 flex flex-col justify-evenly items-center text-center"
//         >
//             <FontAwesomeIcon size="3x" icon={icon} />
//             <h3>{text}</h3>
//         </button>
//     );
// };

// HomeButton.propTypes = {
//     messages: PropTypes.arrayOf(
//         PropTypes.shape({
//             icon: FontAwesomeIcon.prototype.isRequired,
//             text: PropTypes.string.isRequired,
//             pointer: PropTypes.nominalTypeHack,
//         })
//     ),
// };

// export const HomeLink = ({ path, icon, text, pointer }) => {
//     return (
//         <Link to={path}>
//             <HomeButton icon={icon} text={text} />
//         </Link>
//     );
// };

// HomeLink.propTypes = {
//     messages: PropTypes.arrayOf(
//         PropTypes.shape({
//             path: PropTypes.string.isRequired,
//             icon: FontAwesomeIcon.prototype.isRequired,
//             text: PropTypes.string.isRequired,
//             pointer: PropTypes.nominalTypeHack,
//         })
//     ),
// };


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const HomeButton = ({ icon, text, pointer }) => {
    return (
        <button
            ref={pointer}
            className="shadow-md shadow-gray-400 m-2 rounded-xl h-32 w-24 p-2 hover:text-green-600 hover:bg-green-100 flex flex-col justify-evenly items-center text-center"
        >
            <FontAwesomeIcon size="3x" icon={icon} />
            <h3>{text}</h3>
        </button>
    );
};

// Corrected propTypes for HomeButton
HomeButton.propTypes = {
    icon: PropTypes.object.isRequired, // FontAwesomeIcon uses an object for the icon
    text: PropTypes.string.isRequired,
    pointer: PropTypes.shape({ current: PropTypes.instanceOf(Element) }), // More accurate type for refs
};

export const HomeLink = ({ path, icon, text, pointer }) => {
    return (
        <Link to={path}>
            <HomeButton icon={icon} text={text} pointer={pointer} />
        </Link>
    );
};

// Corrected propTypes for HomeLink
HomeLink.propTypes = {
    path: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired, // FontAwesomeIcon uses an object for the icon
    text: PropTypes.string.isRequired,
    pointer: PropTypes.shape({ current: PropTypes.instanceOf(Element) }), // More accurate type for refs
};