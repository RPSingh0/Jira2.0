import {TextField} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

export function TextFieldInput({name, label, ...extras}) {
    return (
        <TextField
            name={name}
            label={label}
            variant="outlined"
            size="small"
            required={true}
            fullWidth={true}
            sx={(theme) => ({
                'input': {color: theme.palette.defaultBlack.main}
            })}
            {...extras}
        />
    );
}

export function ProjectDatePicker({name, label}) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker name={name} label={label} format={"DD/MM/YYYY"}
                        slotProps={{
                            textField: {
                                size: "small",
                                required: true,
                                sx: (theme) => ({'input': {color: theme.palette.defaultBlack.main}})
                            }
                        }}/>
        </LocalizationProvider>
    );
}