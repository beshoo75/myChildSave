import PropTypes from "prop-types";
export default function CustomButton({ type, text }) {
    return (
        <div className="text-center">
            <button
                type={type}
                className="inline-block w-full px-6 py-3 mt-6 mb-0 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25 bg-150 leading-pro ease-soft-in tracking-tight-soft bg-gradient-to-tl from-blue-600 to-cyan-400 hover:scale-102 hover:shadow-soft-xs active:opacity-85"
            >
                {text}
            </button>
        </div>
    );
}

CustomButton.propTypes = {
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};
