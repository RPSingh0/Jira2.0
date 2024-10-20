import {JiraDetailContextProvider} from "./JiraDetailContext.jsx";
import {StyledJiraDetailBox, StyledProjectDetailContentBox} from "./JiraDetailStyles.jsx";
import JiraDetailAside from "./JiraDetailAside.jsx";
import {JiraMetadataContextProvider} from "./JiraMetadataContext.jsx";
import JiraDetailMain from "./JiraDetailMain.jsx";


function JiraDetail() {
    return (
        <StyledJiraDetailBox>
            <StyledProjectDetailContentBox>
                <JiraDetailContextProvider>
                    <JiraDetailMain/>
                </JiraDetailContextProvider>
                <JiraMetadataContextProvider>
                    <JiraDetailAside/>
                </JiraMetadataContextProvider>
            </StyledProjectDetailContentBox>
        </StyledJiraDetailBox>
    );
}

export default JiraDetail;