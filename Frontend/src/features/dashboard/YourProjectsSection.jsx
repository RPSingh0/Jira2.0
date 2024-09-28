import {Box, styled, Typography} from "@mui/material";
import ProjectCard from "./YourProjectsSectionCard.jsx";

const StyledDashboardProjects = styled(Box)(() => ({}));

const StyledDashboardProjectsList = styled(Box)(() => ({
    display: "flex",
    gap: "1rem",
    padding: "0.5rem 0 0.5rem 0.2rem",
    overflowX: "scroll",
    scrollbarWidth: 'none',

    "&::-webkit-scrollbar": {
        display: "none"
    }
}));

const StyledHeader = styled(Box)(() => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "0.5rem"
}));

const StyledHeaderHeading = styled(Typography)(({theme}) => ({
    fontWeight: "bold",
    color: theme.palette.defaultBlack.dark,
}));

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