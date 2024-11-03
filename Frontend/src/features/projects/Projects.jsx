import {ContainedNavLinkButton} from "../../components/button/Buttons.jsx";
import {
    StyledDivider,
    StyledProjectCardContainerBox,
    StyledProjectsBox,
    StyledProjectsHeaderBox,
    StyledProjectsHeading
} from "./ProjectsStyles.jsx";
import Search from "../../components/search/Search.jsx";
import {ProjectsContextProvider} from "./ProjectsContext.jsx";
import ProjectsCardContainer from "./ProjectsCardContainer.jsx";

function Projects() {
    return (
        <StyledProjectsBox>
            <StyledProjectsHeaderBox>
                <StyledProjectsHeading variant="h5">
                    Projects
                </StyledProjectsHeading>
                <ContainedNavLinkButton text={"Create Project"} link={"create"}/>
            </StyledProjectsHeaderBox>
            <Search placeholder={"Search projects"}/>

            <StyledDivider/>

            <StyledProjectCardContainerBox>
                <ProjectsContextProvider>
                    <ProjectsCardContainer/>
                </ProjectsContextProvider>
            </StyledProjectCardContainerBox>

        </StyledProjectsBox>
    );
}

export default Projects;