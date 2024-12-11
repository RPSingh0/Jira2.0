import {useNavigate} from "react-router-dom";
import {IconMap} from "../../utils/IconMap.jsx";
import {Avatar, Box, Paper, styled, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";
import useMatchBreakpointUp from "../../hooks/useMatchBreakpointUp.js";
import ColoredIcon from "../icon/ColoredIcon.jsx";

const StyledJiraPaper = styled(Paper)(() => ({
    display: "flex",
    flexDirection: "row",
    gap: "0.5rem",
    padding: "0.5rem",
    justifyContent: "space-between",
    transition: "all 0.5s ease",

    "&:hover": {
        backgroundColor: grey[200],
        cursor: "pointer",
    }
}));

const StyledJiraPaperHeader = styled(Box)(() => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "0.5rem",
    flexGrow: 1
}));

const StyledJiraPaperTitle = styled(Typography)(() => ({
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    lineClamp: 1
}));

StyledJiraPaperTitle.defaultProps = {
    variant: "body2"
}

const StyledJiraPaperOtherDetailBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem"
}));

function JiraListItem({type, jiraKey, jiraLink, title, assigneeName, assigneeProfileImage, status, priority}) {

    const navigate = useNavigate();
    const match = useMatchBreakpointUp('sm');

    function handleNavigateToJira() {
        navigate(jiraLink);
    }

    return (
        <StyledJiraPaper variant="outlined" onClick={handleNavigateToJira}>

            <StyledJiraPaperHeader>
                <ColoredIcon iconFor={type}/>
                <StyledJiraPaperTitle>
                    {title}
                </StyledJiraPaperTitle>
            </StyledJiraPaperHeader>

            <StyledJiraPaperOtherDetailBox>
                {match &&
                    <Typography variant="overline" noWrap>
                        {jiraKey}
                    </Typography>
                }
                {IconMap[priority]}
                {IconMap[status]}
                <Avatar title={assigneeName} src={assigneeProfileImage} alt={assigneeName}/>
            </StyledJiraPaperOtherDetailBox>
        </StyledJiraPaper>
    );
}

export default JiraListItem;