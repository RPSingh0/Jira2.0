import {Chip} from "@mui/material";
import {StyledQuickInfoItem, StyledQuickInfoItemText} from "./ProjectCardStyles.jsx";

export function InfoItem({text, data}) {
    return (
        <StyledQuickInfoItem>
            <StyledQuickInfoItemText variant={"body1"}>
                {text}
            </StyledQuickInfoItemText>
            <Chip label={data} size="small" sx={{fontSize: "0.6rem"}}/>
        </StyledQuickInfoItem>
    );
}