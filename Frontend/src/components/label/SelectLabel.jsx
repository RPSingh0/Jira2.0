import {Typography} from "@mui/material";

function Label({id, labelText}) {
    return (
        <Typography variant="caption" component="label" fontWeight="bold" id={id}>
            {labelText}
        </Typography>
    );
}

export default Label;