import {FormControl, TextField} from "@mui/material";
import {Controller} from "react-hook-form";
import Label from "../label/Label.jsx";

export function TextFieldInput({
                                   name,
                                   control,
                                   labelText,
                                   defaultValue,
                                   placeholder,
                                   required,
                                   requiredMessage,
                                   id,
                                   disabled,
                                   error,
                                   helperText
                               }) {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            rules={{
                required: required ? requiredMessage : false
            }}
            render={({field}) => (
                <FormControl fullWidth>
                    <Label id={id} labelText={labelText}/>
                    <TextField
                        {...field}
                        id={id}
                        name={name}
                        placeholder={placeholder}
                        size="small"
                        disabled={disabled}
                        error={error}
                        helperText={helperText}
                        sx={(theme) => ({
                            'input': {color: theme.palette.defaultBlack.main}
                        })}
                    />
                </FormControl>
            )}
        />
    );
}