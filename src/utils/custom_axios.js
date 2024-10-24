// import axios from "axios";
// import getCookie from "./get_cookie";

// export const COOKIE_NAME = "csrftoken";
// export const COOKIE_HEADER_NAME = "X-CSRFToken";

// axios.defaults.xsrfCookieName = COOKIE_NAME;
// axios.defaults.xsrfHeaderName = COOKIE_HEADER_NAME;
// axios.defaults.withCredentials = true; // Ensure cookies are sent with requests

// export const SystemAxios = axios.create({
//     // baseURL: `https://${window.location.hostname}:8000`,
//     // baseURL: 'https://127.0.0.1:8000',
//     // baseURL: 'https://localhost:8000',
//     baseURL: `https://${window.location.hostname}/api`,
//     // baseURL: 'https://localhost/api',
//     // baseURL: 'http://localhost:8000',
//     timeout: 100000,
// });

// export const getAxiosDefaultHeader = () => {
//     return {
//         withCredentials: true,
//     };
// };
// export const getAxiosSecureHeader = () => {
//     return {
//         withCredentials: true,
//         headers: {
//             COOKIE_HEADER_NAME: getCookie(COOKIE_NAME),
//         },
//     };
// };
// export const getAxiosFormHeader = () => {
//     return {
//         withCredentials: true,
//         headers: {
//             "Content-Type": "multipart/form-data",
//         },
//     };
// };
// export const getAxiosSecureFormHeader = () => {
//     return {
//         withCredentials: true,
//         headers: {
//             "Content-Type": "multipart/form-data",
//             COOKIE_HEADER_NAME: getCookie(COOKIE_NAME),
//         },
//     };
// };

import axios from "axios";
import getCookie from "./get_cookie";

export const COOKIE_NAME = "csrftoken";
export const COOKIE_HEADER_NAME = "X-CSRFToken";

// Set default axios properties
axios.defaults.xsrfCookieName = COOKIE_NAME;
axios.defaults.xsrfHeaderName = COOKIE_HEADER_NAME;
axios.defaults.withCredentials = true; // Ensure cookies are sent with requests

// Create an Axios instance
export const SystemAxios = axios.create({
    baseURL: `https://${window.location.hostname}/api`, // Adjust this depending on your environment
    timeout: 100000,
});

// Default header configuration
export const getAxiosDefaultHeader = () => {
    return {
        withCredentials: true,
    };
};

// Secure header configuration for requests that require CSRF token
export const getAxiosSecureHeader = () => {
    return {
        withCredentials: true,
        headers: {
            [COOKIE_HEADER_NAME]: getCookie(COOKIE_NAME), // Use bracket notation for dynamic key
        },
    };
};

// Header configuration for form data
export const getAxiosFormHeader = () => {
    return {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    };
};

// Secure form header configuration
export const getAxiosSecureFormHeader = () => {
    return {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
            [COOKIE_HEADER_NAME]: getCookie(COOKIE_NAME), // Use bracket notation for dynamic key
        },
    };
};

// Optional: Set up interceptors for logging or error handling
SystemAxios.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle error response
        console.error("Axios error:", error);
        return Promise.reject(error);
    }
);
