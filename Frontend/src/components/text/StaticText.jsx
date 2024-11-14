import {Typography} from "@mui/material";
import {StyledItemValueStaticBox} from "../../styles/StyledItemValueStaticBox.jsx";

function StaticText({text}) {
    return (
        <StyledItemValueStaticBox>
            <Typography variant="body1">
                {text}
            </Typography>
        </StyledItemValueStaticBox>
    );
}

export default StaticText;