import PropTypes from "prop-types";
import { forwardRef } from "react";

// BooleanSelector Component
export const BooleanSelector = forwardRef(
    (
        {
            selectorName,
            changeEventHandler,
            styleClasses,
            trueValueText,
            falseValueText,
            value,
            isReadOnly,
        },
        inputRef
    ) => {
        return (
            <select
                disabled={isReadOnly}
                value={value}
                ref={inputRef}
                name={selectorName}
                onChange={changeEventHandler}
                className={styleClasses}
            >
                <option value={true}>{trueValueText}</option>
                <option value={false}>{falseValueText}</option>
            </select>
        );
    }
);

BooleanSelector.propTypes = {
    selectorName: PropTypes.string.isRequired,
    changeEventHandler: PropTypes.func.isRequired,
    styleClasses: PropTypes.string,
    trueValueText: PropTypes.string.isRequired,
    falseValueText: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    isReadOnly: PropTypes.bool.isRequired,
};

// StudentNamesSelector Component
export const StudentNamesSelector = forwardRef(
    (
        {
            selectorName,
            changeEventHandler,
            styleClasses,
            studentNames,
            value,
            isReadOnly,
        },
        inputRef
    ) => {
        return (
            <select
                disabled={isReadOnly}
                value={value}
                name={selectorName}
                onChange={changeEventHandler}
                className={styleClasses}
                ref={inputRef}
            >
            <option key={0}>اختر طالب</option>
                {studentNames.map((student, index) => (
                    <option key={index + 1} value={student.id}>
                        {student.student_name}
                    </option>
                ))}
            </select>
        );
    }
);

StudentNamesSelector.propTypes = {
    selectorName: PropTypes.string.isRequired,
    studentNames: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            student_name: PropTypes.string.isRequired,
        })
    ).isRequired,
    changeEventHandler: PropTypes.func.isRequired,
    styleClasses: PropTypes.string,
    value: PropTypes.number.isRequired,
    isReadOnly: PropTypes.bool.isRequired,
};
