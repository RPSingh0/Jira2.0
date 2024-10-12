import {Avatar, Box, Paper, styled, Typography} from "@mui/material";
import {IconMap} from "../../utils/IconMap.jsx";

const StyledFeatureDetailItemCardPaper = styled(Paper)(() => ({
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    width: "15rem",
    padding: "0.5rem",
    overflow: "hidden"
}));

const StyledFeatureDetailItemCardHeader = styled(Box)(() => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "0.5rem"
}));

const StyledFeatureDetailItemTitle = styled(Typography)(() => ({
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    lineClamp: 2
}));

const StyledFeatureDetailItemAssignAndStatusBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
}));

const StyledFeatureDetailItemStatusBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "0.5rem"
}));

function FeatureDetailItemCard({type, jiraKey, title, user, status, priority}) {
    return (
        <StyledFeatureDetailItemCardPaper variant={"outlined"} elevation={2}>
            {/* Header */}
            <StyledFeatureDetailItemCardHeader>
                {IconMap[type]}
                <Typography variant={"overline"}>
                    {jiraKey}
                </Typography>
            </StyledFeatureDetailItemCardHeader>

            {/* Title */}
            <StyledFeatureDetailItemTitle variant="caption" gutterBottom>
                {title}
            </StyledFeatureDetailItemTitle>

            {/* Assign and Status */}
            <StyledFeatureDetailItemAssignAndStatusBox>
                <Avatar>
                    {user}
                </Avatar>
                <StyledFeatureDetailItemStatusBox>
                    {IconMap[status]}
                    {IconMap[priority]}
                </StyledFeatureDetailItemStatusBox>
            </StyledFeatureDetailItemAssignAndStatusBox>
        </StyledFeatureDetailItemCardPaper>
    );
}

export default FeatureDetailItemCard;