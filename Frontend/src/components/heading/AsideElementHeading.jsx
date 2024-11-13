import {Typography} from "@mui/material";

function AsideElementHeading({text}) {
    return (
        <Typography variant="overline" gutterBottom sx={{paddingLeft: "0.5rem"}}>
            {text}
        </Typography>
    );
}

export default AsideElementHeading;