import {Button, IconButton, Paper, styled, useMediaQuery, useTheme} from "@mui/material";
import {grey} from "@mui/material/colors";
import {NavLink} from "react-router-dom";
import {IconMap} from "../../utils/IconMap.jsx";

const StyledTextButton = styled(Button)(() => ({
    color: grey["800"],
    fontWeight: "bold",
    fontSize: "0.8rem"
}));

const StyledContainedButton = styled(Button)(() => ({
    fontWeight: "bold",
    fontSize: "0.8rem"
}));

const StyledOutlinedButton = styled(Button)(() => ({
    fontWeight: "bold",
    fontSize: "0.8rem"
}));

const StyledNavLinkButton = styled(Button)(({theme}) => ({
    fontWeight: "bold",
    fontSize: "0.8rem",
    color: theme.palette.defaultBlack.main
}));

const StyledContainedNavLinkButton = styled(Button)(() => ({
    fontWeight: "bold",
    fontSize: "0.8rem"
}));

export function TextButton({text, onClickHandler}) {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <StyledTextButton variant={"text"} onClick={onClickHandler} size={matches ? "small" : "medium"}>
            {text}
        </StyledTextButton>
    );
}

export function ContainedButton({text, onClickHandler}) {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <StyledContainedButton variant={"contained"} onClick={onClickHandler} size={matches ? "small" : "medium"}>
            {text}
        </StyledContainedButton>
    );
}

export function OutlinedButton({text, onClickHandler}) {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <StyledOutlinedButton variant={"outlined"} onClick={onClickHandler} size={matches ? "small" : "medium"}>
            {text}
        </StyledOutlinedButton>
    );
}

export function NavLinkButton({text, link}) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <NavLink to={link}>
            <StyledNavLinkButton variant={"text"} size={matches ? "small" : "medium"}>
                {text}
            </StyledNavLinkButton>
        </NavLink>
    );
}

export function ContainedNavLinkButton({text, link}) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <NavLink to={link}>
            <StyledContainedNavLinkButton variant={"contained"} size={matches ? "small" : "medium"}>
                {text}
            </StyledContainedNavLinkButton>
        </NavLink>
    );
}


export function PaperOkButton({onClickHandler, disabled}) {
    return (
        <Paper sx={{overflow: "hidden"}}>
            <IconButton
                size={"small"}
                disableFocusRipple
                disableTouchRipple
                sx={{borderRadius: "0"}}
                onClick={onClickHandler}
                disabled={disabled}
            >
                {IconMap['save']}
            </IconButton>
        </Paper>
    );
}

export function PaperCancelButton({onClickHandler, disabled}) {
    return (
        <Paper sx={{overflow: "hidden"}}>
            <IconButton
                size={"small"}
                disableFocusRipple
                disableTouchRipple
                sx={{borderRadius: "0"}}
                onClick={onClickHandler}
                disabled={disabled}
            >
                {IconMap['close']}
            </IconButton>
        </Paper>
    );
}