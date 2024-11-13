import {useProjectDetailContext} from "../../context/ProjectDetailContext.jsx";
import {Box} from "@mui/material";
import LoadOrFetchWrapper from "../../../../components/loader/LoadOrFetchWrapper.jsx";
import {Rounded2Half} from "../../../../components/loader/Loader.jsx";
import AsideElementHeading from "../../../../components/heading/AsideElementHeading.jsx";
import StaticText from "../../../../components/text/StaticText.jsx";

function ProjectDetailAsideDoneIssue() {

    const {loadingProjectDetail, fetchingProjectDetail, projectDetail} = useProjectDetailContext();

    return (
        <Box>
            <AsideElementHeading text={"Done Issues"}/>
            <LoadOrFetchWrapper
                loading={loadingProjectDetail}
                fetching={fetchingProjectDetail}
                loader={<Rounded2Half/>}>
                <StaticText text={projectDetail?.doneIssues}/>
            </LoadOrFetchWrapper>
        </Box>
    );
}

export default ProjectDetailAsideDoneIssue;