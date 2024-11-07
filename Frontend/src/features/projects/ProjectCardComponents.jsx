import {Box, Chip, useTheme} from "@mui/material";
import {green} from "@mui/material/colors";
import {
    StyledProjectProgressBox,
    StyledQuickInfoDot,
    StyledQuickInfoItem,
    StyledQuickInfoItemText
} from "./ProjectCardStyles.jsx";

export function InfoItem({text, dot, color, chip, data}) {
    return (
        <StyledQuickInfoItem>
            <StyledQuickInfoItemText variant={"body1"}>
                {dot && <InfoDot color={color}/>}
                {text}
            </StyledQuickInfoItemText>
            {chip && <Chip label={data} size="small" sx={{fontSize: "0.6rem"}}/>}
        </StyledQuickInfoItem>
    );
}

export function InfoDot({color}) {

    const theme = useTheme();

    return (
        <StyledQuickInfoDot color={color || theme.palette.defaultBlack.dark}>
            &#8226;
        </StyledQuickInfoDot>
    );
}

export function ProjectProgress({completionPercentage}) {

    return (
        <StyledProjectProgressBox>
            <Box sx={{height: `${completionPercentage}%`, backgroundColor: green["700"]}}/>
        </StyledProjectProgressBox>
    );
}