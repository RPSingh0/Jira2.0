import {IconMap} from "../../utils/IconMap.jsx";
import {Box, styled} from "@mui/material";
import {ColorMap} from "../../utils/ColorMap.js";

const StyledColoredIconBox = styled(Box)(({color}) => ({
    display: "flex",
    alignItems: "center",

    "& svg": {
        color: color
    }
}))

function ColoredIcon({iconFor}) {
    return (
        <StyledColoredIconBox color={ColorMap[iconFor]}>
            {IconMap[iconFor]}
        </StyledColoredIconBox>
    );
}

export default ColoredIcon;