import {StyledEditingSaveAndCancelBox} from "../../features/jira/detail/Styles.jsx";
import {ContainedButton, OutlinedButton} from "./Buttons.jsx";
import {Box, styled} from "@mui/material";

const StyledSaveOrCancelBox = styled(Box)(() => ({
    marginTop: "1rem",
    marginBottom: "1rem"
}));

function EditorContentSaveOrCancel({onSaveClick, onCancelClick, disableSave, disableCancel}) {

    return (
        <StyledSaveOrCancelBox>
            <StyledEditingSaveAndCancelBox>
                <ContainedButton text={"Save"} onClickHandler={onSaveClick} disabled={disableSave}/>
                <OutlinedButton text={"Cancel"} onClickHandler={onCancelClick} disabled={disableCancel}/>
            </StyledEditingSaveAndCancelBox>
        </StyledSaveOrCancelBox>
    );
}

export default EditorContentSaveOrCancel;