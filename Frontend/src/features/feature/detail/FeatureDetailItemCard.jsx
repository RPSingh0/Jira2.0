import {Avatar, Box, Paper, styled, Typography} from "@mui/material";
import {IconMap} from "../../../utils/IconMap.jsx";
import {grey} from "@mui/material/colors";
import {useNavigate} from "react-router-dom";

const StyledFeatureDetailItemCardPaper = styled(Paper)(() => ({
    display: "flex",
    flexDirection: "row",
    gap: "0.5rem",
    padding: "0.5rem",
    overflow: "hidden",
    justifyContent: "space-between",
    transition: "all 0.5s ease",

    "&:hover": {
        backgroundColor: grey[200],
        cursor: "pointer",
    }
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

function FeatureDetailItemCard({type, jiraKey, jiraLink, title, user, status, priority}) {

    const navigate = useNavigate();

    function handleNavigateToJira() {
        navigate(jiraLink);
    }

    return (
        <StyledFeatureDetailItemCardPaper variant="outlined" onClick={handleNavigateToJira}>
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
                    {IconMap[priority]}
                    {IconMap[status]}
                <Avatar>
                    {user}
                </Avatar>
            </StyledFeatureDetailItemAssignAndStatusBox>
        </StyledFeatureDetailItemCardPaper>
    );
}

export default FeatureDetailItemCard;