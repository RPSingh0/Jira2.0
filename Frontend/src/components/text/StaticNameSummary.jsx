import {styled, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";

const StyledStaticNameSummary = styled(Typography)(() => ({
    transition: "all 0.2s ease",
    borderRadius: "9px",
    padding: "0 0.5rem",

    "&:hover": {
        backgroundColor: grey["200"]
    }
}));

StyledStaticNameSummary.defaultProps = {
    variant: "h5",
    gutterBottom: true
}

function StaticNameSummary({text}) {
    return (
        <StyledStaticNameSummary>
            {text}
        </StyledStaticNameSummary>
    );
}

export default StaticNameSummary;