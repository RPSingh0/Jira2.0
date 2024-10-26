import {Avatar, Box, Paper, styled, Typography} from "@mui/material";
import {IconMap} from "../../utils/IconMap.jsx";

const StyledFeatureDetailItemCardPaper = styled(Paper)(() => ({
    display: "flex",
    flexDirection: "row",
    gap: "0.5rem",
    padding: "0.5rem",
    overflow: "hidden",
    justifyContent: "space-between"
}));

const StyledFeatureDetailItemCardHeader = styled(Box)(() => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "0.5rem",
    flexGrow: 1
}));

const StyledFeatureDetailItemTitle = styled(Typography)(() => ({
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    lineClamp: 1
}));

const StyledFeatureDetailItemAssignAndStatusBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem"
}));

const StyledFeatureDetailItemStatusBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "0.5rem"
}));

function FeatureDetailItemCard({type, jiraKey, title, user, status, priority}) {
    return (
        <StyledFeatureDetailItemCardPaper variant="outlined">
            {/* Header */}
            <StyledFeatureDetailItemCardHeader>
                {IconMap[type]}
                <Typography variant="overline">
                    {jiraKey}
                </Typography>
                {/* Title */}
                <StyledFeatureDetailItemTitle variant="body2">
                    {title}
                </StyledFeatureDetailItemTitle>
            </StyledFeatureDetailItemCardHeader>

            {/* Assign and Status */}
            <StyledFeatureDetailItemAssignAndStatusBox>
                <StyledFeatureDetailItemStatusBox>
                    {IconMap[priority]}
                    {IconMap[status]}
                </StyledFeatureDetailItemStatusBox>
                <Avatar>
                    {user}
                </Avatar>
            </StyledFeatureDetailItemAssignAndStatusBox>
        </StyledFeatureDetailItemCardPaper>
    );
}

export default FeatureDetailItemCard;