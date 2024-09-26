import {Outlet} from "react-router-dom";
import Navbar from "../navbar/Navbar.jsx";

function AppLayout() {
    return (
        <>
            <Navbar/>
            <Outlet/>
        </>
    );
}

export default AppLayout;