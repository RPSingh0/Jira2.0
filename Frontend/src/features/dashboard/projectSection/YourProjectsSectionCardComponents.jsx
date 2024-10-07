import {Chip} from "@mui/material";
import {StyledQuickInfoDot, StyledQuickInfoItem, StyledQuickInfoItemText} from "./YourProjectsSectionCardStyles.jsx";

export function QuickInfoItem({text, data, color}) {
    return (
        <StyledQuickInfoItem>
            <StyledQuickInfoItemText variant={"body1"}>
                <InfoDot color={color}/>
                {text}
            </StyledQuickInfoItemText>
            <Chip label={data} size="small" sx={{fontSize: "0.6rem"}}/>
        </StyledQuickInfoItem>
    );
}

export function InfoDot({color}) {
    return (
        <StyledQuickInfoDot color={color}>
            &#8226;
        </StyledQuickInfoDot>
    );
}