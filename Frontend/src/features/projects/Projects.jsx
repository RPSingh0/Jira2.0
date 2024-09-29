import {Box, Divider, styled, Typography} from "@mui/material";
import {ContainedButton} from "../../components/button/Buttons.jsx";
import SearchProjects from "./SearchProjects.jsx";
import ProjectsTableHeader from "./ProjectsTableHeader.jsx";
import ProjectItem from "./ProjectItem.jsx";

const StyledProjectsBox = styled(Box)(({theme}) => ({

    padding: "1rem",

    [theme.breakpoints.up('sm')]: {
        padding: '2rem'
    }
}));

const StyledProjectsHeaderBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "2rem"
}));

const StyledProjectsHeading = styled(Typography)(({theme}) => ({
    color: theme.palette.defaultBlack.dark
}));

const StyledDivider = styled(Divider)(() => ({
    marginBottom: "1rem"
}));

const StyledProjectItemContainerBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
}));

function Projects() {
    return (
        <StyledProjectsBox>
            <StyledProjectsHeaderBox>
                <StyledProjectsHeading variant="h6">
                    Projects
                </StyledProjectsHeading>
                <ContainedButton text={"Create Project"}/>
            </StyledProjectsHeaderBox>
            <SearchProjects/>

            {/* Table (kind-of) heading start here */}
            {/* Table header */}
            <ProjectsTableHeader/>
            <StyledDivider/>
            {/* Table Data Container */}
            <StyledProjectItemContainerBox>
                <ProjectItem/>
                <ProjectItem/>
                <ProjectItem/>
                <ProjectItem/>
            </StyledProjectItemContainerBox>
        </StyledProjectsBox>
    );
}

export default Projects;