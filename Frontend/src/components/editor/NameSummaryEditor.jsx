import {Box, styled, TextField} from "@mui/material";
import PaperOkAndCancelGroup from "../button/PaperOkAndCancelGroup.jsx";
import StaticNameSummary from "../text/StaticNameSummary.jsx";
import {getSlotPropsForInput} from "../../utils/utils.js";

const StyledNameBox = styled(Box)(() => ({
    position: "relative"
}));

function NameSummaryEditor({
                               isEditing, setIsEditing, isUpdating, value, setValue, text, multiline, rows,
                               okClickHandler
                           }) {

    const slotProps = getSlotPropsForInput(multiline);

    function handleChangeName(event) {
        setValue(event.target.value);
    }

    return (
        <>
            {isEditing ?
                <StyledNameBox>
                    <TextField
                        fullWidth={true}
                        value={value}
                        multiline={multiline}
                        maxRows={rows}
                        onChange={handleChangeName}
                        slotProps={slotProps}
                    />
                    {isEditing && <PaperOkAndCancelGroup
                        setIsEditing={setIsEditing}
                        isUpdating={isUpdating}
                        okClickHandler={okClickHandler}
                    />
                    }
                </StyledNameBox>
                :
                <StaticNameSummary text={text}/>
            }
        </>
    );
}

export default NameSummaryEditor;