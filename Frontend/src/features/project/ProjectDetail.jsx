import {Box, styled} from "@mui/material";
import ProjectDetailName from "./ProjectDetailName.jsx";
import ProjectDetailToolbar from "./ProjectDetailToolbar.jsx";
import ProjectDetailDescription from "./ProjectDetailDescription.jsx";
import ProjectDetailFeature from "./ProjectDetailFeature.jsx";
import ProjectDetailAside from "./ProjectDetailAside.jsx";
import {ProjectDetailContextProvider} from "./ProjectDetailContext.jsx";

const StyledProjectDetailBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: "2rem"
}));

const StyledProjectDetailContentBox = styled(Box)(({theme}) => ({
    display: "flex",
    flexDirection: "row",
    gap: "2rem",

    [theme.breakpoints.down('c1000')]: {
        flexDirection: "column-reverse",
    }
}));

const StyledProjectDetailMainSectionBox = styled(Box)(() => ({
    flexGrow: 1
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
                    <ProjectDetailFeature/>
                </StyledProjectDetailMainSectionBox>

                <ProjectDetailAside/>

            </StyledProjectDetailContentBox>

        </StyledProjectDetailBox>
    );
}

export default ProjectDetail;