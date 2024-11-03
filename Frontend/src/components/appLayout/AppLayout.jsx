import {Outlet} from "react-router-dom";
import Navbar from "../navbar/Navbar.jsx";
import {Box} from "@mui/material";
import ScrollToTop from "../../ScrollToTop.jsx";

function AppLayout() {
    return (
        <Box sx={{display: "flex", flexDirection: "column", minHeight: "100dvh"}}>
            <Navbar/>
            <ScrollToTop/>
            <Outlet/>
        </Box>
    );
}

export default AppLayout;