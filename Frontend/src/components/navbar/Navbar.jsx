import {Avatar, Box, IconButton, styled, Toolbar, Tooltip, useMediaQuery, useTheme} from "@mui/material";
import Logo from "../logo/Logo.jsx";
import {ContainedButton, NavLinkButton, TextButton} from "../button/Buttons.jsx";
import {useState} from "react";
import {StyledAppBar} from "./NavBarStyles.jsx";
import CreateModal from "../../features/create/CreateModal.jsx";

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
    const [open, setOpen] = useState(false);

    return (
        <StyledAppBar>
            <Toolbar>
                <Logo imageName={matches ? "logo" : "main"} containerPadding={"0"} imageHeight={"1.5rem"}/>
                <StyledNavButtonBox>
                    <NavLinkButton text={"Projects"} link={"/project"}/>
                    <TextButton text={"Teams"}/>
                    <ContainedButton text={"Create"} onClickHandler={() => setOpen(true)}/>
                    {open && <CreateModal open={open} setOpen={setOpen}/>}
                </StyledNavButtonBox>
                <StyledEmptyContainer/>
                <StyledUserProfileBox>
                    <Tooltip title="Account - To be done">
                        <IconButton onClick={() => console.log('To be done')} sx={{p: 0}}>
                            <Avatar alt="user-avatar" src="https://avatar.iran.liara.run/public?username=Xenovia"/>
                        </IconButton>
                    </Tooltip>
                </StyledUserProfileBox>
            </Toolbar>
        </StyledAppBar>
    );
}

export default Navbar;