import {StyledAutoCompleteWithButtonBox} from "../autocompleteAssign/AutocompleteAssignStyles.jsx";
import InputSelectField from "../input/InputSelectField.jsx";
import PaperOkAndCancelGroup from "../button/PaperOkAndCancelGroup.jsx";
import {Box} from "@mui/material";

function OptionEditor({
                          name,
                          control,
                          placeholder,
                          required,
                          requiredMessage,
                          id,
                          options,
                          isEditing,
                          setIsEditing,
                          isUpdating,
                          okClickHandler,
                          error,
                          helperText,
                          children
                      }) {

    function handleDoubleClick() {
        setIsEditing(true);
    }

    return (
        <>
            {isEditing ?
                <StyledAutoCompleteWithButtonBox>
                    <InputSelectField
                        name={name}
                        control={control}
                        placeholder={placeholder}
                        required={required}
                        requiredMessage={requiredMessage}
                        id={id}
                        options={options}
                        disabled={isUpdating}
                        error={error}
                        helperText={helperText}
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