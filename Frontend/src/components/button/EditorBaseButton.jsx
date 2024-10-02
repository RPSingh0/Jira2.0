import {IconButton, styled} from "@mui/material";
import {grey} from "@mui/material/colors";

const StyledBaseIconButton = styled(IconButton)(() => ({
    backgroundColor: grey[100],
    borderRadius: "20%",
    transition: "0.3 all ease-in-out",
    width: "1.5rem",
    height: "1.5rem",

    "&:hover": {
        backgroundColor: grey[200],
    }
}));

function EditorBaseButton({icon, clickHandler, disabled, children}) {
    return (
        <StyledBaseIconButton
            color="primary"
            onClick={clickHandler}
            disabled={disabled}
            disableRipple={true}
            size={"small"}
        >
            {icon}
            {children}
        </StyledBaseIconButton>
    );
}

export default EditorBaseButton;