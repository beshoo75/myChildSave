// import { createContext, useState } from 'react';

// export const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//     const [sharedVariable, setSharedVariable] = useState(''); // Example variable

//     return (
//         <AppContext.Provider value={{ sharedVariable, setSharedVariable }}>
//             {children}
//         </AppContext.Provider>
//     );
// };


// import { createContext, useState, useMemo } from 'react';

// export const AppContext = createContext({
//     sharedVariable: '',
//     setSharedVariable: () => {}
// });

// export const AppProvider = ({ children }) => {
//     const [sharedVariable, setSharedVariable] = useState(''); // Example variable

//     const value = useMemo(() => ({ sharedVariable, setSharedVariable }), [sharedVariable]);

//     return (
//         <AppContext.Provider value={value}>
//             {children}
//         </AppContext.Provider>
//     );
// };
import { createContext, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
export const AppContext = createContext({
    sharedVariable: '',
    setSharedVariable: () => { },
    userId: null, // يجب أن يكون null إذا لم يكن لديك معرف إداري
    setUserId: () => { },
    language: 'ar',
    setLanguage: () => { }
});

export const AppProvider = ({ children }) => {
    const [sharedVariable, setSharedVariable] = useState(''); // مثال على المتغير
    const [userId, setUserId] = useState(1); // مثال على المتغير
    const { i18n } = useTranslation();
    const [language, setLanguage] = useState('ar');
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setLanguage(lng);
    };

    const value = useMemo(() => ({
        sharedVariable,
        setSharedVariable,
        userId,
        setUserId,
        language,
        changeLanguage
    }), [sharedVariable, userId, language]);

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};