import Assignee from "./Assignee.jsx";
import Reporter from "./Reporter.jsx";
import Points from "./Points.jsx";
import Project from "./Project.jsx";
import Feature from "./Feature.jsx";
import {StyledJiraDetailAsideBox} from "./AsideStyles.jsx";

function Aside() {

    return (
        <StyledJiraDetailAsideBox>
            <Assignee/>
            <Reporter/>
            <Points/>
            <Project/>
            <Feature/>
        </StyledJiraDetailAsideBox>
    );
}


export default Aside;