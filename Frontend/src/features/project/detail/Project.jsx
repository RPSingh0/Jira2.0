import Name from "./Name.jsx";
import Description from "./Description.jsx";
import ProjectFeature from "./feature/ProjectFeature.jsx";
import Aside from "./aside/Aside.jsx";
import {ProjectContextProvider} from "../context/ProjectContext.jsx";
import {FeatureContextProvider} from "../context/FeatureContext.jsx";
import {
    StyledProjectDetailBox,
    StyledProjectDetailContentBox,
    StyledProjectDetailMainSectionBox
} from "./Styles.jsx";
import Activity from "./activity/Activity.jsx";

function Project() {

    return (
        <StyledProjectDetailBox>
            <ProjectContextProvider>
                <Name/>
            </ProjectContextProvider>
            <StyledProjectDetailContentBox>
                <StyledProjectDetailMainSectionBox>
                    <ProjectContextProvider>
                        <Description/>
                    </ProjectContextProvider>
                    <FeatureContextProvider>
                        <ProjectFeature/>
                    </FeatureContextProvider>
                    <Activity/>
                </StyledProjectDetailMainSectionBox>
                <ProjectContextProvider>
                    <Aside/>
                </ProjectContextProvider>
            </StyledProjectDetailContentBox>
        </StyledProjectDetailBox>
    );
}

export default Project;