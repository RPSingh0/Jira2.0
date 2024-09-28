import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import {Provider} from "react-redux";
import store from "./store.js";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {ThemeProvider} from "@mui/material";
import customTheme from "../customTheme.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={customTheme}>
                <App/>
                <ToastContainer theme="colored" position={"bottom-left"} pauseOnFocusLoss={false}/>
            </ThemeProvider>
        </Provider>
    </StrictMode>,
)
