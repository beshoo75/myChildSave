import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import * as ServiceWorker from 'serviceWorker'

document.dir = "rtl";
document.title = "My Child Save"

createRoot(document.getElementById("root")).render(
    <>
        <BrowserRouter>
            <ToastContainer />
            <App></App>
        </BrowserRouter>
    </>
);

// ServiceWorker.register();
