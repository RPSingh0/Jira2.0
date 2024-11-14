import JiraDetailAssignee from "./JiraDetailAssignee.jsx";
import JiraDetailReporter from "./JiraDetailReporter.jsx";
import JiraDetailPoints from "./JiraDetailPoints.jsx";
import JiraDetailProject from "./JiraDetailProject.jsx";
import JiraDetailFeature from "./JiraDetailFeature.jsx";
import {StyledJiraDetailAsideBox} from "./JiraDetailAsideStyles.jsx";

function JiraDetailAside() {

    return (
        <StyledJiraDetailAsideBox>
            <JiraDetailAssignee/>
            <JiraDetailReporter/>
            <JiraDetailPoints/>
            <JiraDetailProject/>
            <JiraDetailFeature/>
        </StyledJiraDetailAsideBox>
    );
}


export default JiraDetailAside;