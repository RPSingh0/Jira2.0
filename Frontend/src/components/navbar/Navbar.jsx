import {AppBar, Avatar, Box, Button, IconButton, Toolbar, Tooltip} from "@mui/material";
import Logo from "../logo/Logo.jsx";
import {TextButton} from "../button/Buttons.jsx";

function Navbar() {
    return (
        <AppBar position="static" color={"transparent"} elevation={1}>
            <Toolbar>
                {/* add logo here*/}
                <Logo imageName={"main"} containerPadding={"0"} imageHeight={"1.5rem"}/>
                <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}, gap:"1rem", padding: "0 1rem 0 1rem"}}>
                    <TextButton text={"Projects"}/>
                    <TextButton text={"Teams"}/>
                    <Button variant="contained">Create</Button>
                </Box>
                <Box sx={{flexGrow: 1}}/>
                <Box sx={{flexGrow: 0}}>
                    <Tooltip title="Account - To be done">
                        <IconButton onClick={() => console.log('To be done')} sx={{p: 0}}>
                            <Avatar alt="user-avatar" src=""/>
                        </IconButton>
                    </Tooltip>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;