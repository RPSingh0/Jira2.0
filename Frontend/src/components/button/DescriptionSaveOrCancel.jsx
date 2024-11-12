import {StyledEditingSaveAndCancelBox} from "../../features/jira/JiraDetailStyles.jsx";
import {ContainedButton, OutlinedButton} from "./Buttons.jsx";
import {Box, styled} from "@mui/material";

const StyledSaveOrCancelBox = styled(Box)(() => ({
    marginTop: "1rem",
    marginBottom: "1rem"
}));

function DescriptionSaveOrCancel({onSaveClick, onCancelClick}) {

    return (
        <StyledSaveOrCancelBox>
            <StyledEditingSaveAndCancelBox>
                <ContainedButton text={"Save"} onClickHandler={onSaveClick}/>
                <OutlinedButton text={"Cancel"} onClickHandler={onCancelClick}/>
            </StyledEditingSaveAndCancelBox>
        </StyledSaveOrCancelBox>
    );
}

export default DescriptionSaveOrCancel;