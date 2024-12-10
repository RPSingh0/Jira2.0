import ProjectCard from "./ProjectCard.jsx";
import LoadOrFetchWrapper from "../../components/loader/LoadOrFetchWrapper.jsx";
import {useProjectsContext} from "./ProjectsContext.jsx";
import {ProjectCardLoadingIndicator} from "../../components/loader/Loader.jsx";
import {formatDateToLocale} from "../../utils/utils.js";
import {StyledProjectCardContainerBox} from "./ProjectsStyles.jsx";

function ProjectsCardContainer() {

    const {loadingProjects, fetchingProjects, projectsData} = useProjectsContext();

    return (
        <StyledProjectCardContainerBox>
            <LoadOrFetchWrapper
                loading={loadingProjects}
                fetching={fetchingProjects}
                loader={<ProjectCardLoadingIndicator/>}>

                {projectsData?.projects?.map(project => <ProjectCard
                    key={project.projectKey}
                    name={project.name}
                    projectKey={project.projectKey}
                    openIssues={project.openIssues}
                    doneIssues={project.doneIssues}
                    youWorkedOn={project.youWorkedOn}
                    dateStarted={formatDateToLocale(project.startDate)}
                    endDate={formatDateToLocale(project.endDate)}
                    daysRemaining={project.daysRemaining}
                    completionPercentage={project.completionPercentage}
                    team={project.team}
                />)}
            </LoadOrFetchWrapper>
        </StyledProjectCardContainerBox>
    );
}

export default ProjectsCardContainer;