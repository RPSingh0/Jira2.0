import {Autocomplete} from "@mui/material";
import {RenderInputMap, RenderOptionMap} from "./AutoCompleteComponentMap.jsx";

function AutocompleteSelector({variant, name, label, options, isLoading, disabled, value, setValue}) {

    return (
        <Autocomplete
            fullWidth={true}
            options={options}
            disabled={disabled}
            size={"small"}
            name={name}
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue ? newValue : null);
            }}
            getOptionLabel={(option) => {
                return option['optionText'] || ""
            }}
            renderOption={RenderOptionMap[variant]}
            renderInput={(params) => RenderInputMap[variant](params, label, isLoading, value)}
        />
    );
}

export default AutocompleteSelector;