import AutocompleteSelector from "../autocomplete/AutocompleteSelector.jsx";
import {StyledAutoCompleteWithButtonBox} from "./AutocompleteAssignStyles.jsx";
import {Box} from "@mui/material";
import PaperOkAndCancelGroup from "../button/PaperOkAndCancelGroup.jsx";

function AutocompleteAssign({
                                isEditing, setIsEditing, isLoading, isUpdating, name, variant, options, value, setValue,
                                okClickHandler, children
                            }) {

    function handleDoubleClick() {
        setIsEditing(true);
    }

    return (
        <>
            {isEditing ?
                <StyledAutoCompleteWithButtonBox>
                    <AutocompleteSelector
                        variant={variant}
                        name={name}
                        options={options}
                        isLoading={isLoading}
                        value={value}
                        setValue={setValue}
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

export default AutocompleteAssign;