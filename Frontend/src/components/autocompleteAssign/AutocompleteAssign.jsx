import AutocompleteSelector from "../autocomplete/AutocompleteSelector.jsx";
import {
    StyledAutoCompleteWithButtonBox,
    StyledItemValueStaticBox,
    StyledOkCancelPaperButtonBox
} from "./AutocompleteAssignStyles.jsx";
import {PaperCancelButton, PaperOkButton} from "../button/Buttons.jsx";

function AutocompleteAssign({
                                isEditing, setIsEditing, isLoading, isUpdating, name, variant, options, value, setValue,
                                okClickHandler, children
                            }) {

    function handleDoubleClick() {
        setIsEditing(true);
    }

    function handleClickCancel() {
        setIsEditing(false);
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
                    <StyledOkCancelPaperButtonBox>
                        <PaperOkButton onClickHandler={okClickHandler} disabled={isUpdating}/>
                        <PaperCancelButton onClickHandler={handleClickCancel} disabled={isUpdating}/>
                    </StyledOkCancelPaperButtonBox>
                </StyledAutoCompleteWithButtonBox>
                :
                <StyledItemValueStaticBox onDoubleClick={handleDoubleClick}>
                    {children}
                </StyledItemValueStaticBox>
            }
        </>
    );
}

export default AutocompleteAssign;