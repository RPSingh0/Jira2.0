import {Box, Divider, styled, Typography} from "@mui/material";
import {ContainedButton} from "../../components/button/Buttons.jsx";
import SearchProjects from "./SearchProjects.jsx";
import ProjectCard from "./ProjectCard.jsx";

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
    marginTop: "2rem",
    marginBottom: "1rem"
}));

const StyledProjectCardContainerBox = styled(Box)(({theme}) => ({
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    columnGap: "1rem",
    rowGap: "1rem",

    [theme.breakpoints.down('c1360')]: {
        gridTemplateColumns: "1fr 1fr"
    },

    [theme.breakpoints.down('c1000')]: {
        gridTemplateColumns: "1fr"
    }
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