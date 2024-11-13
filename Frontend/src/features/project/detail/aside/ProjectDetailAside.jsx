import ProjectDetailAsideLeadBy from "./ProjectDetailAsideLeadBy.jsx";
import ProjectDetailAsideOpenIssue from "./ProjectDetailAsideOpenIssue.jsx";
import ProjectDetailAsideDoneIssue from "./ProjectDetailAsideDoneIssue.jsx";
import ProjectDetailAsideStarted from "./ProjectDetailAsideStarted.jsx";
import ProjectDetailAsideEnd from "./ProjectDetailAsideEnd.jsx";
import ProjectDetailAsideDaySpent from "./ProjectDetailAsideDaySpent.jsx";
import {StyledProjectDetailAsideBox} from "./ProjectDetailAsideStyles.jsx";

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