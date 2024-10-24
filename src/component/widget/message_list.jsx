import PropTypes from "prop-types";

const MessageList = ({ messages }) => {
    return messages.length === 0 ? (
        <div className="h-full overflow-y-auto w-full flex flex-col items-center justify-center">لا يوجد رسائل</div>
    ) : (
        <div className="h-full overflow-y-auto w-full flex flex-col items-start justify-start p-4">
            {messages.map((msg, index) => (
                <div
                    key={index}
                    className={`h-auto break-words max-w-64 border-none rounded-lg my-1
                        p-2
                            ${
                                msg.user == localStorage.getItem("id")
                                    ? "bg-green-200"
                                    : "bg-yellow-200 self-end"
                            }`}
                >
                    <div
                        // className={`h-auto break-words max-w-64 border-none rounded-lg my-1
                        // p-2
                        //     ${
                        //         msg.user == localStorage.getItem("id")
                        //             ? "bg-green-200 place-content-end"
                        //             : "bg-yellow-200"
                        //     }`}
                    >
                        {msg.message_text}
                        {/* <small>{msg.timestamp}</small> */}
                    </div>
                </div>
            ))}
        </div>
    );
};

MessageList.propTypes = {
    messages: PropTypes.arrayOf(
        PropTypes.shape({
            user: PropTypes.number.isRequired,
            message_text: PropTypes.string.isRequired,
            timestamp: PropTypes.string,
        })
    ),
};

export default MessageList;
