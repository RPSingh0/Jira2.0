import {Box, styled} from "@mui/material";
import {green, grey} from "@mui/material/colors";

const StyledProjectProgressBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    minWidth: "0.5rem",
    backgroundColor: grey["400"],
    borderRadius: "1rem",
    overflow: "hidden",
    opacity: "80%",
    justifyContent: "flex-end"
}));

export function ProjectProgress({completionPercentage}) {

    return (
        <StyledProjectProgressBox>
            <Box sx={{height: `${completionPercentage}%`, backgroundColor: green["700"]}}/>
        </StyledProjectProgressBox>
    );
}