import AutocompleteSelector from "../autocomplete/AutocompleteSelector.jsx";
import {StyledAutoCompleteWithButtonBox} from "./AutocompleteAssignStyles.jsx";
import {Box} from "@mui/material";
import PaperOkAndCancelGroup from "../button/PaperOkAndCancelGroup.jsx";

function AutocompleteAssign({
                                name,
                                id,
                                labelText,
                                control,
                                options,
                                optionKey,
                                optionLabel,
                                noOptionsText,
                                variant,
                                loading,
                                disabled,
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
                    <AutocompleteSelector
                        name={name}
                        id={id}
                        labelText={labelText}
                        control={control}
                        options={options}
                        optionKey={optionKey}
                        optionLabel={optionLabel}
                        noOptionsText={noOptionsText}
                        variant={variant}
                        loading={loading}
                        disabled={disabled}
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

export default AutocompleteAssign;