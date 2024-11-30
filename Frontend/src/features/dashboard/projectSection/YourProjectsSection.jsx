import ProjectCard from "./YourProjectsSectionCard.jsx";
import {
    StyledDashboardProjects,
    StyledDashboardProjectsList,
    StyledHeader,
    StyledHeaderHeading
} from "./YourProjectsSectionStyles.jsx";
import useGetQueryHook from "../../../queryHooks/useGetQueryHook.js";
import {getAllProjectsService} from "../../../services/project/projectService.js";
import {DashboardProjectCardLoadingIndicator} from "../../../components/loader/Loader.jsx";
import LoadOrFetchWrapper from "../../../components/loader/LoadOrFetchWrapper.jsx";
import ViewAllNavigate from "../../../components/viewAll/ViewAllNavigate.jsx";

function YourProjectsSection() {

    const {isLoading: loadingProjects, isFetching: fetchingProjects, data: projectsData} = useGetQueryHook({
        key: [`dashboard-projects`],
        fn: getAllProjectsService,
        page: 1,
        size: 6
    });

    return (
        <StyledDashboardProjects>
            <StyledHeader>
                <StyledHeaderHeading variant={'body2'}>
                    Your projects
                </StyledHeaderHeading>
                <ViewAllNavigate text={"View All"} link={"/project"}/>
            </StyledHeader>
            <StyledDashboardProjectsList>
                <LoadOrFetchWrapper
                    loading={loadingProjects}
                    fetching={fetchingProjects}
                    loader={<DashboardProjectCardLoadingIndicator/>}>
                    {projectsData?.projects?.map(project => <ProjectCard
                        key={project.projectKey}
                        name={project.name}
                        projectKey={project.projectKey}
                        openIssues={project.openIssues}
                        doneIssues={project.doneIssues}
                        completionPercentage={project.completionPercentage}
                    />)}
                </LoadOrFetchWrapper>
            </StyledDashboardProjectsList>
        </StyledDashboardProjects>
    );
}

export default YourProjectsSection;