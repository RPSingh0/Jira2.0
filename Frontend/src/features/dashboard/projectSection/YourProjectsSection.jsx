import {Typography} from "@mui/material";
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

function YourProjectsSection() {

    const {
        isLoading: loadingProjects,
        isFetching: fetchingProjects,
        data: projects
    } = useGetQueryHook({
        key: [`dashboard-projects`],
        fn: getAllProjectsService,
    });

    return (
        <StyledDashboardProjects>
            <StyledHeader>
                <StyledHeaderHeading variant={'body2'}>
                    Your projects
                </StyledHeaderHeading>
                <Typography variant={"caption"}>
                    View all
                </Typography>
            </StyledHeader>
            <StyledDashboardProjectsList>
                <LoadOrFetchWrapper
                    loading={loadingProjects}
                    fetching={fetchingProjects}
                    loader={<DashboardProjectCardLoadingIndicator/>}>
                    {projects?.map(project => <ProjectCard
                        key={project.id}
                        name={project.name}
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