import ProjectDetailName from "./ProjectDetailName.jsx";
import ProjectDetailDescription from "./ProjectDetailDescription.jsx";
import ProjectDetailFeature from "./feature/ProjectDetailFeature.jsx";
import ProjectDetailAside from "./aside/ProjectDetailAside.jsx";
import {ProjectDetailContextProvider} from "../context/ProjectDetailContext.jsx";
import {ProjectDetailFeatureContextProvider} from "../context/ProjectDetailFeatureContext.jsx";
import {
    StyledProjectDetailBox,
    StyledProjectDetailContentBox,
    StyledProjectDetailMainSectionBox
} from "./ProjectDetailStyles.jsx";

function ProjectDetail() {

    return (
        <StyledProjectDetailBox>

            <ProjectDetailContextProvider>
                <ProjectDetailName/>
            </ProjectDetailContextProvider>

            <StyledProjectDetailContentBox>

                <StyledProjectDetailMainSectionBox>

                    <ProjectDetailContextProvider>
                        <ProjectDetailDescription/>
                    </ProjectDetailContextProvider>

                    <ProjectDetailFeatureContextProvider>
                        <ProjectDetailFeature/>
                    </ProjectDetailFeatureContextProvider>

                </StyledProjectDetailMainSectionBox>

                <ProjectDetailContextProvider>
                    <ProjectDetailAside/>
                </ProjectDetailContextProvider>

            </StyledProjectDetailContentBox>

        </StyledProjectDetailBox>
    );
}

export default ProjectDetail;