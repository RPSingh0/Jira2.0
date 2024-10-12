import {Autocomplete} from "@mui/material";
import {RenderInputMap, RenderOptionMap} from "./AutoCompleteComponentMap.jsx";

function AutocompleteSelector({variant, name, label, options, isLoading, value, setValue}) {

    return (
        <Autocomplete
            fullWidth={true}
            options={options}
            name={name}
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue ? newValue : null);
            }}
            getOptionLabel={(option) => {
                return option['option_text'] || ""
            }}
            renderOption={RenderOptionMap[variant]}
            renderInput={(params) => RenderInputMap[variant](params, label, isLoading, value)}
        />
    );
}

export default AutocompleteSelector;