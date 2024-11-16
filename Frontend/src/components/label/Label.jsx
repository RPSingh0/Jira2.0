import {Typography} from "@mui/material";

function Label({id, labelText}) {
    return (
        <Typography variant="caption" component="label" htmlFor={id} fontWeight="bold">
            {labelText}
        </Typography>
    );
}

export default Label;