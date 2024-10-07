import {ContainedNavLinkButton} from "../../components/button/Buttons.jsx";
import SearchProjects from "./SearchProjects.jsx";
import ProjectCard from "./ProjectCard.jsx";
import {
    StyledDivider,
    StyledProjectCardContainerBox,
    StyledProjectsBox,
    StyledProjectsHeaderBox,
    StyledProjectsHeading
} from "./ProjectsStyles.jsx";

function Projects() {
    return (
        <StyledProjectsBox>
            <StyledProjectsHeaderBox>
                <StyledProjectsHeading variant="h5">
                    Projects
                </StyledProjectsHeading>
                <ContainedNavLinkButton text={"Create Project"} link={"create"}/>
            </StyledProjectsHeaderBox>
            <SearchProjects/>

            <StyledDivider/>

            <StyledProjectCardContainerBox>

                <ProjectCard/>
                <ProjectCard/>
                <ProjectCard/>
                <ProjectCard/>

            </StyledProjectCardContainerBox>

        </StyledProjectsBox>
    );
}

export default Projects;