import {Box, styled} from "@mui/material";
import ProjectDetailName from "./ProjectDetailName.jsx";
import ProjectDetailToolbar from "./ProjectDetailToolbar.jsx";
import ProjectDetailDescription from "./ProjectDetailDescription.jsx";
import ProjectDetailFeature from "./ProjectDetailFeature.jsx";
import ProjectDetailAside from "./ProjectDetailAside.jsx";
import {ProjectDetailContextProvider} from "./ProjectDetailContext.jsx";
import {ProjectDetailFeatureContextProvider} from "./ProjectDetailFeatureContext.jsx";

const StyledProjectDetailBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: "2rem"
}));

const StyledProjectDetailContentBox = styled(Box)(({theme}) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",

    [theme.breakpoints.down('c1000')]: {
        flexDirection: "column-reverse",
        gap: "1rem"
    }
}));

const StyledProjectDetailMainSectionBox = styled(Box)(({theme}) => ({
    width: "78%",

    [theme.breakpoints.down('c1360')]: {
        width: "73%"
    },

    [theme.breakpoints.down('lg')]: {
        width: "68%"
    },

    [theme.breakpoints.down('c1000')]: {
        width: "100%",
    }
}));

function ProjectDetail() {

    return (
        <StyledProjectDetailBox>

            <ProjectDetailContextProvider>
                <ProjectDetailName/>
            </ProjectDetailContextProvider>

            <ProjectDetailToolbar/>

            <StyledProjectDetailContentBox>

                <StyledProjectDetailMainSectionBox>

                    <ProjectDetailContextProvider>
                        <ProjectDetailDescription/>
                    </ProjectDetailContextProvider>

                    <ProjectDetailFeatureContextProvider>
                        <ProjectDetailFeature/>
                    </ProjectDetailFeatureContextProvider>

                </StyledProjectDetailMainSectionBox>

                <ProjectDetailContextProvider>
                    <ProjectDetailAside/>
                </ProjectDetailContextProvider>

            </StyledProjectDetailContentBox>

        </StyledProjectDetailBox>
    );
}

export default ProjectDetail;