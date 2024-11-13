import {Box, styled, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";

const StyledItemValueStaticBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "1rem",
    padding: "0.5rem",
    borderRadius: "9px",
    transition: "background-color 0.2s ease",

    "&:hover": {
        backgroundColor: grey["200"]
    }
}));

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