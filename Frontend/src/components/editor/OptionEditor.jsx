import {StyledAutoCompleteWithButtonBox} from "../autocompleteAssign/AutocompleteAssignStyles.jsx";
import InputSelectField from "../input/InputSelectField.jsx";
import PaperOkAndCancelGroup from "../button/PaperOkAndCancelGroup.jsx";
import {Box} from "@mui/material";

function OptionEditor({isEditing, setIsEditing, isUpdating, name, options, value, setValue, okClickHandler, children}) {

    function handleDoubleClick() {
        setIsEditing(true);
    }

    return (
        <>
            {isEditing ?
                <StyledAutoCompleteWithButtonBox>
                    <InputSelectField
                        name={name}
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                        options={options}
                    />
                    <PaperOkAndCancelGroup
                        setIsEditing={setIsEditing}
                        isUpdating={isUpdating}
                        okClickHandler={okClickHandler}
                    />
                </StyledAutoCompleteWithButtonBox>
                :
                <Box onDoubleClick={handleDoubleClick}>
                    {children}
                </Box>
            }
        </>
    );
}

export default OptionEditor;