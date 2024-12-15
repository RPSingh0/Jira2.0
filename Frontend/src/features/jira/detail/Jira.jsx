import {JiraDetailContextProvider} from "../context/JiraContext.jsx";
import {StyledProjectDetailContentBox, StyledProjectDetailMainSectionBox} from "./Styles.jsx";
import Aside from "./aside/Aside.jsx";
import {JiraMetadataContextProvider} from "../context/JiraMetadataContext.jsx";
import Summary from "./Summary.jsx";
import Description from "./Description.jsx";


function Jira() {
    return (
        <StyledProjectDetailContentBox>
            <JiraDetailContextProvider>
                <StyledProjectDetailMainSectionBox>
                    <Summary/>
                    <Description/>
                </StyledProjectDetailMainSectionBox>
            </JiraDetailContextProvider>
            <JiraMetadataContextProvider>
                <Aside/>
            </JiraMetadataContextProvider>
        </StyledProjectDetailContentBox>
    );
}

export default Jira;