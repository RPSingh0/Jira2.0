import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {Controller} from "react-hook-form";
import {FormControl} from "@mui/material";
import Label from "../label/Label.jsx";

function InputDatePicker({
                             name,
                             control,
                             id,
                             defaultValue,
                             required,
                             requiredMessage,
                             labelText,
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
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <FormControl fullWidth>
                        <Label id={id} labelText={labelText}/>
                        <DatePicker
                            id={id}
                            {...field}
                            value={field.value || null}
                            disabled={disabled}
                            slotProps={{
                                textField: {
                                    size: "small",
                                    sx: (theme) => ({'input': {color: theme.palette.defaultBlack.main}}),
                                    error: error,
                                    helperText: helperText
                                }
                            }}
                            // onChange={(date) => field.onChange(date?.toISOString() || null)}
                        />
                    </FormControl>
                </LocalizationProvider>
            )}
        />
    );
}

export default InputDatePicker;