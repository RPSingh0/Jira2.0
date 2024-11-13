import {PaperCancelButton, PaperOkButton} from "./Buttons.jsx";
import {Box, styled} from "@mui/material";

export const StyledOkCancelPaperButtonBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "row",
    gap: "0.5rem",
    position: "absolute",
    bottom: "-2rem",
    right: 0,
    zIndex: 1000
}));

function PaperOkAndCancelGroup({isUpdating, setIsEditing, okClickHandler}) {

    function handleClickCancel() {
        setIsEditing(false);
    }

    return (
        <StyledOkCancelPaperButtonBox>
            <PaperOkButton onClickHandler={okClickHandler} disabled={isUpdating}/>
            <PaperCancelButton onClickHandler={handleClickCancel} disabled={isUpdating}/>
        </StyledOkCancelPaperButtonBox>
    );
}

export default PaperOkAndCancelGroup;