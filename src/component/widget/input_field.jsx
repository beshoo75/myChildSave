import PropTypes from "prop-types";

export default function InputField({
    name,
    type,
    value,
    onChange,
    placeholder,
    isReadOnly,
}) {
    return (
        <div className="mb-1 ">
            <input
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                // className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-96 appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                className="border-2 border-gray-200 p-3 focus:border-gray-400 outline-none leading-5.6 ease-soft"
                placeholder={placeholder}
                disabled={isReadOnly}
            />
        </div>
    );
}

InputField.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    isReadOnly: PropTypes.bool,
};
