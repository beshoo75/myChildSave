import PropTypes from "prop-types";
export default function MyLabel({ text }) {
    return (
        <label className="text-start self-right mb-2 font-bold text-xs text-slate-700">
            {text}
        </label>
    );
}

MyLabel.propTypes = {
    text: PropTypes.string.isRequired,
};
