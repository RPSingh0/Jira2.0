import {StyledProjectDetailMainSectionBox} from "./JiraDetailStyles.jsx";
import JiraDetailSummary from "./JiraDetailSummary.jsx";
import JiraDetailDescription from "./JiraDetailDescription.jsx";


function JiraDetailMain() {
    return (
        <StyledProjectDetailMainSectionBox>
            <JiraDetailSummary/>
            <JiraDetailDescription/>
        </StyledProjectDetailMainSectionBox>
    );
}

export default JiraDetailMain;