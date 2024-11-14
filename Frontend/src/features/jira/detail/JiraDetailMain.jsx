import {StyledProjectDetailMainSectionBox} from "./JiraDetailStyles.jsx";
import JiraDetailDescription from "./JiraDetailDescription.jsx";
import JiraDetailSummary from "./JiraDetailSummary.jsx";


function JiraDetailMain() {
    return (
        <StyledProjectDetailMainSectionBox>
            <JiraDetailSummary/>
            <JiraDetailDescription/>
        </StyledProjectDetailMainSectionBox>
    );
}

export default JiraDetailMain;