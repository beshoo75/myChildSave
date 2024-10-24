import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { AppContext } from '../utils/context';
const SettingsPage = () => {

    const { t, i18n } = useTranslation();

    const [showLanguagePopup, setShowLanguagePopup] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('English');


    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
        setShowLanguagePopup(false);
    };
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-4 text-green-600">Settings</h1>

            <div className="w-full max-w-md mb-4 p-4 bg-white shadow rounded-lg">
                <div className="flex justify-between items-center mb-3">
                    <span className="text-lg">Selected Language: {selectedLanguage}</span>
                    <button
                        className="text-green-500 underline"
                        onClick={() => setShowLanguagePopup(true)}
                    >
                        Change Language
                    </button>
                </div>

                <button
                    className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
                    onClick={() => { }}
                >
                    Go to Profile
                </button>

                <div className="flex items-center mt-4">
                    <input type="checkbox" id="notifications" className="mr-2" />
                    <label htmlFor="notifications" className="text-lg">{t('notfiy')}</label>
                </div>

                <div className="mt-4">
                    <label className="block text-lg mb-2">{t('theme')}</label>
                    <select className="border rounded p-2 w-full">
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                </div>

                <button onClick={() => {
                    navigate(-1)
                }}
                    className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition mt-4">
                    Save Changes
                </button>
            </div>

            {showLanguagePopup && (
                <LanguageSettings
                    onClose={() => setShowLanguagePopup(false)}
                    onLanguageChange={handleLanguageChange}
                />
            )}
        </div>
    );
};

const LanguageSettings = ({ onClose, onLanguageChange }) => {
    const languages = ['English', 'Arabic'];
    const { changeLanguage } = useContext(AppContext);
    const { t, i18n } = useTranslation();
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">{t('notfiy')}</h2>
                <ul className="space-y-2">
                    {languages.map((language) => (
                        <li key={language}>
                            <button
                                className="w-full text-left py-2 px-4 rounded hover:bg-green-100"
                                onClick={() => {
                                    onLanguageChange(language)
                                    language == 'English' ? changeLanguage('en') : changeLanguage('ar')

                                }

                                }
                            >
                                {language}
                            </button>
                        </li>
                    ))}
                </ul>
                <button
                    className="mt-4 w-full bg-gray-300 py-2 rounded hover:bg-gray-400"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default SettingsPage;
