import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

function InputSelectField({options, name, label, value, required, onChange}) {
    return (
        <FormControl size={"small"} required={required}>
            <InputLabel id={label}>{label}</InputLabel>
            <Select
                name={name}
                value={value}
                label={label}
                onChange={onChange}
            >
                {options &&
                    options.map((item) =>
                        <MenuItem key={item.value} value={item.value}>
                            {item.text}
                        </MenuItem>)
                }
            </Select>
        </FormControl>
    );
}

export default InputSelectField;