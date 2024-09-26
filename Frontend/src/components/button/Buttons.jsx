import {Button, styled, useMediaQuery, useTheme} from "@mui/material";
import {grey} from "@mui/material/colors";

const StyledTextButton = styled(Button)(() => ({
    color: grey["800"],
    fontWeight: "bold",
}));

const StyledContainedButton = styled(Button)(() => ({
    fontWeight: "bold",
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