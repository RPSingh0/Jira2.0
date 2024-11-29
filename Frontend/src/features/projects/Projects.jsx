import {ContainedNavLinkButton} from "../../components/button/Buttons.jsx";
import {StyledDivider, StyledProjectsBox, StyledProjectsHeaderBox, StyledProjectsHeading} from "./ProjectsStyles.jsx";
import {ProjectsContextProvider} from "./ProjectsContext.jsx";
import ProjectsCardContainer from "./ProjectsCardContainer.jsx";
import ProjectsPagination from "./ProjectsPagination.jsx";
import ProjectsSearch from "./ProjectsSearch.jsx";

function Projects() {

    return (
        <StyledProjectsBox>
            <StyledProjectsHeaderBox>
                <StyledProjectsHeading>
                    Projects
                </StyledProjectsHeading>
                <ContainedNavLinkButton text={"Create Project"} link={"create"}/>
            </StyledProjectsHeaderBox>
            <ProjectsContextProvider>
                <ProjectsSearch/>
                <StyledDivider/>
                <ProjectsCardContainer/>
                <ProjectsPagination/>
            </ProjectsContextProvider>
        </StyledProjectsBox>
    );
}

export default Projects;