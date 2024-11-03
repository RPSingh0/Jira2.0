import {AppBar, Avatar, Box, IconButton, styled, Toolbar, Tooltip, useMediaQuery, useTheme} from "@mui/material";
import Logo from "../logo/Logo.jsx";
import {ContainedButton, NavLinkButton, TextButton} from "../button/Buttons.jsx";

const StyledNavButtonBox = styled(Box)(() => ({
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    padding: "0 1rem 0 1rem"
}));

const StyledEmptyContainer = styled(Box)(() => ({
    flexGrow: 1
}));

const StyledUserProfileBox = styled(Box)(() => ({
    flexGrow: 0
}));

function Navbar() {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <AppBar position="sticky" color={"default"} elevation={1}>
            <Toolbar>
                {/* Logo (based on screen size) */}
                <Logo
                    imageName={matches ? "logo" : "main"}
                    containerPadding={"0"}
                    imageHeight={"1.5rem"}
                />

                {/* Buttons on right side of Logo */}
                <StyledNavButtonBox>
                    <NavLinkButton text={"Projects"} link={"/project"}/>
                    <TextButton text={"Teams"}/>
                    <ContainedButton text={"Create"}/>
                </StyledNavButtonBox>

                {/* Empty container to take up remaining space */}
                <StyledEmptyContainer/>

                {/* User profile container and image */}
                <StyledUserProfileBox>
                    <Tooltip title="Account - To be done">
                        <IconButton onClick={() => console.log('To be done')} sx={{p: 0}}>
                            <Avatar alt="user-avatar" src=""/>
                        </IconButton>
                    </Tooltip>
                </StyledUserProfileBox>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;