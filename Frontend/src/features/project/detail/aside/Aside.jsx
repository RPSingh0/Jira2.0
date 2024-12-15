import LeadBy from "./LeadBy.jsx";
import OpenIssue from "./OpenIssue.jsx";
import DoneIssue from "./DoneIssue.jsx";
import Started from "./Started.jsx";
import End from "./End.jsx";
import DaysRemaining from "./DaysRemaining.jsx";
import {StyledProjectDetailAsideBox} from "./Styles.jsx";

function Aside() {

    return (
        <StyledProjectDetailAsideBox variant="outlined">
            <LeadBy/>
            <OpenIssue/>
            <DoneIssue/>
            <Started/>
            <End/>
            <DaysRemaining/>
        </StyledProjectDetailAsideBox>
    );
}

export default Aside;