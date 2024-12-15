import {JiraContextProvider} from "../context/JiraContext.jsx";
import {StyledProjectDetailContentBox, StyledProjectDetailMainSectionBox} from "./Styles.jsx";
import Aside from "./aside/Aside.jsx";
import {JiraMetadataContextProvider} from "../context/JiraMetadataContext.jsx";
import Summary from "./Summary.jsx";
import Description from "./Description.jsx";
import Activity from "./activity/Activity.jsx";


function Jira() {
    return (
        <StyledProjectDetailContentBox>
            <StyledProjectDetailMainSectionBox>
                <JiraContextProvider>
                    <Summary/>
                    <Description/>
                </JiraContextProvider>
                <Activity/>
            </StyledProjectDetailMainSectionBox>
            <JiraMetadataContextProvider>
                <Aside/>
            </JiraMetadataContextProvider>
        </StyledProjectDetailContentBox>
    );
}

export default Jira;