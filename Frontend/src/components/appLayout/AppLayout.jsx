import {Outlet} from "react-router-dom";
import Navbar from "../navbar/Navbar.jsx";
import {Box} from "@mui/material";

function AppLayout() {
    return (
        <Box sx={{display: "flex", flexDirection: "column", minHeight: "100dvh"}}>
            <Navbar/>
            <Outlet/>
        </Box>
    );
}

export default AppLayout;