import { useState } from "react";
import PropTypes from "prop-types";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MessageInput = ({ addMessage }) => {
    const [inputValue, setInputValue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // if (inputValue.trim()) {
        // }
        addMessage(inputValue);
        setInputValue("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex px-4 py-2 text-lg">
            <button
                type="submit"
                className="p-2 bg-blue-500 w-12 text-white rounded-r-lg hover:bg-blue-600"
                disabled={!inputValue.trim()} // Disable when input is empty
            >
                <FontAwesomeIcon icon={faPaperPlane} />
            </button>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="ارسل رسالتك"
                aria-label="Message input"
                className="flex-grow p-2 border outline-none border-gray-300 rounded-l-lg"
            />

        </form>
    );
};

// PropTypes for the component
MessageInput.propTypes = {
    addMessage: PropTypes.func.isRequired, // Define addMessage as a required function
};

export default MessageInput;
