// FloatingActionButton.js
import React from 'react';

const FloatingActionButton = ({ onClick, icon }) => {
    return (
        <button
            className="fixed bottom-4 right-4 w-20 h-20 rounded-full bg-green-400 text-white shadow-lg flex items-center justify-center hover:bg-green-700 transition-colors duration-200"
            onClick={onClick}
        >
            {icon}
        </button>
    );
};

export default FloatingActionButton;
