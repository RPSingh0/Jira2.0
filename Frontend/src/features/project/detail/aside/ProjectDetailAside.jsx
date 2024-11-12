import {Paper, styled} from "@mui/material";
import ProjectDetailAsideLeadBy from "./ProjectDetailAsideLeadBy.jsx";
import ProjectDetailAsideOpenIssue from "./ProjectDetailAsideOpenIssue.jsx";
import ProjectDetailAsideDoneIssue from "./ProjectDetailAsideDoneIssue.jsx";
import ProjectDetailAsideStarted from "./ProjectDetailAsideStarted.jsx";
import ProjectDetailAsideEnd from "./ProjectDetailAsideEnd.jsx";
import ProjectDetailAsideDaySpent from "./ProjectDetailAsideDaySpent.jsx";

const StyledProjectDetailAsideBox = styled(Paper)(({theme}) => ({
    width: "20%",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    height: "min-content",

    [theme.breakpoints.down('c1360')]: {
        width: "25%"
    },

    [theme.breakpoints.down('lg')]: {
        width: "30%"
    },

    [theme.breakpoints.down('c1000')]: {
        width: "unset",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr 1fr",
        gridAutoFlow: "column"
    },

    [theme.breakpoints.down('c660')]: {
        display: "flex",
    }
}));

function ProjectDetailAside() {

    return (
        <StyledProjectDetailAsideBox variant="outlined">
            <ProjectDetailAsideLeadBy/>
            <ProjectDetailAsideOpenIssue/>
            <ProjectDetailAsideDoneIssue/>
            <ProjectDetailAsideStarted/>
            <ProjectDetailAsideEnd/>
            <ProjectDetailAsideDaySpent/>
        </StyledProjectDetailAsideBox>
    );
}

export default ProjectDetailAside;