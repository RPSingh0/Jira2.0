import {Typography} from "@mui/material";
import ProjectCard from "./YourProjectsSectionCard.jsx";
import {
    StyledDashboardProjects,
    StyledDashboardProjectsList,
    StyledHeader,
    StyledHeaderHeading
} from "./YourProjectsSectionStyles.jsx";

function YourProjectsSection() {
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

                <ProjectCard/>
                <ProjectCard/>
                <ProjectCard/>
                <ProjectCard/>
                <ProjectCard/>
                <ProjectCard/>
                <ProjectCard/>
                <ProjectCard/>

            </StyledDashboardProjectsList>
        </StyledDashboardProjects>
    );
}

export default YourProjectsSection;