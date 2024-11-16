import {Autocomplete} from "@mui/material";
import {RenderInputMap, RenderOptionMap} from "./AutoCompleteComponentMap.jsx";
import {Controller} from "react-hook-form";

function AutocompleteSelector({
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
                                  error,
                                  helperText
                              }) {

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={null}
            rules={{
                validate: (value) => {
                    if (!value) {
                        return `Please select a ${name}`;
                    }
                    if (options?.length === 0) {
                        return "No options available";
                    }
                    if (!value?.[optionKey]) {
                        return `Please select a valid ${name}`;
                    }
                    return true;
                }
            }}
            render={({field}) => (
                <Autocomplete
                    {...field}
                    options={options || []}
                    getOptionLabel={(option) => option?.[optionLabel]}
                    noOptionsText={noOptionsText}
                    disableClearable={true}
                    size="small"
                    onChange={(_, data) => field.onChange(data)}
                    onInputChange={(_, inputValue) => {
                        if (inputValue === "") {
                            field.onChange(null);
                        }
                    }}
                    renderOption={RenderOptionMap[variant]}
                    renderInput={(params) => RenderInputMap[variant](params, id, labelText, loading, error, helperText, field.value)}
                />
            )}
        />
    );
}

export default AutocompleteSelector;