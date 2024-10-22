import {Autocomplete} from "@mui/material";
import {RenderInputMap, RenderOptionMap} from "./AutoCompleteComponentMap.jsx";

function AutocompleteSelector({variant, name, label, options, isLoading, disabled, value, setValue, defaultOption}) {

    return (
        <Autocomplete
            fullWidth={true}
            options={options}
            disabled={disabled}
            disableClearable
            size="small"
            name={name}
            freeSolo={true}
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue ? newValue : defaultOption);
            }}
            getOptionLabel={(option) => {
                return option[variant === 'user-avatar' ? 'name' : 'optionText'] || ""
            }}
            renderOption={RenderOptionMap[variant]}
            renderInput={(params) => RenderInputMap[variant](params, label, isLoading, value)}
        />
    );
}

export default AutocompleteSelector;