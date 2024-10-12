import {TextField} from "@mui/material";

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