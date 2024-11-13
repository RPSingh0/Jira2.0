import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";

function InputDatePicker({name, label, disabled}) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                name={name}
                label={label}
                format={"DD/MM/YYYY"}
                disabled={disabled}
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

export default InputDatePicker;