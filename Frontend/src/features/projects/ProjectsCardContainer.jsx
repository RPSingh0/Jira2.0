import ProjectCard from "./ProjectCard.jsx";
import LoadOrFetchWrapper from "../../components/loader/LoadOrFetchWrapper.jsx";
import {useProjectsContext} from "./ProjectsContext.jsx";
import {ProjectCardLoadingIndicator} from "../../components/loader/Loader.jsx";
import {formatDateToLocale} from "../../utils/utils.js";

function ProjectsCardContainer() {

    const {loadingProjects, fetchingProjects, projects} = useProjectsContext();

    return (
        <LoadOrFetchWrapper
            loading={loadingProjects}
            fetching={fetchingProjects}
            loader={<ProjectCardLoadingIndicator/>}>

            {projects?.map(project => <ProjectCard
                key={project.projectKey}
                name={project.name}
                projectKey={project.projectKey}
                openIssues={project.openIssues}
                doneIssues={project.doneIssues}
                youWorkedOn={project.youWorkedOn}
                dateStarted={formatDateToLocale(project.startDate)}
                expectedEndDate={formatDateToLocale(project.expectedEndDate)}
                daysSpent={project.daysSpent}
                completionPercentage={project.completionPercentage}
                team={project.team}
            />)}

        </LoadOrFetchWrapper>
    );
}

export default ProjectsCardContainer;