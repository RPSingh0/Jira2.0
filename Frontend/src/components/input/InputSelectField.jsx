import {FormControl, FormHelperText, MenuItem, Select} from "@mui/material";
import {Controller} from "react-hook-form";
import SelectLabel from "../label/SelectLabel.jsx";

function InputSelectField({
                              name,
                              control,
                              labelText,
                              placeholder,
                              required,
                              requiredMessage,
                              id,
                              options,
                              disabled,
                              error,
                              helperText
                          }) {

    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            rules={{
                required: required ? requiredMessage : false
            }}
            render={({field}) => (
                <FormControl size="small" error={error} fullWidth>
                    <SelectLabel id={id} labelText={labelText}/>
                    <Select
                        {...field}
                        labelId={id}
                        name={name}
                        placeholder={placeholder}
                        disabled={disabled}
                        displayEmpty
                        sx={(theme) => ({
                            'input': {color: theme.palette.defaultBlack.main}
                        })}
                    >
                        {
                            placeholder && (<MenuItem value={""} disabled>{placeholder}</MenuItem>)
                        }
                        {
                            options?.map((item) =>
                                <MenuItem key={item.value} value={item.value}>
                                    {item.text}
                                </MenuItem>)
                        }
                    </Select>
                    {helperText && <FormHelperText>{helperText}</FormHelperText>}
                </FormControl>
            )}
        />
    );
}

export default InputSelectField;