import {Button, styled} from "@mui/material";
import {grey} from "@mui/material/colors";

const StyledTextButton = styled(Button)(() => ({
    color: grey["800"],
}));

export function TextButton({text, onClickHandler}) {
    return (
        <StyledTextButton variant={"text"} onClick={onClickHandler}>
            {text}
        </StyledTextButton>
    );
}