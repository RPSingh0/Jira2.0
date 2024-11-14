import {JiraDetailContextProvider} from "../context/JiraDetailContext.jsx";
import {StyledProjectDetailContentBox} from "./JiraDetailStyles.jsx";
import JiraDetailAside from "./aside/JiraDetailAside.jsx";
import {JiraMetadataContextProvider} from "../context/JiraMetadataContext.jsx";
import JiraDetailMain from "./JiraDetailMain.jsx";


function JiraDetail() {
    return (
            <StyledProjectDetailContentBox>
                <JiraDetailContextProvider>
                    <JiraDetailMain/>
                </JiraDetailContextProvider>
                <JiraMetadataContextProvider>
                    <JiraDetailAside/>
                </JiraMetadataContextProvider>
            </StyledProjectDetailContentBox>
    );
}

export default JiraDetail;