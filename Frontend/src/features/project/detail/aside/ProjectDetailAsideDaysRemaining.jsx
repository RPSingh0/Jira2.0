import {useProjectDetailContext} from "../../context/ProjectDetailContext.jsx";
import {Box} from "@mui/material";
import LoadOrFetchWrapper from "../../../../components/loader/LoadOrFetchWrapper.jsx";
import {Rounded2Half} from "../../../../components/loader/Loader.jsx";
import AsideElementHeading from "../../../../components/heading/AsideElementHeading.jsx";
import StaticText from "../../../../components/text/StaticText.jsx";

function ProjectDetailAsideDaysRemaining() {

    const {loadingProjectDetail, fetchingProjectDetail, projectDetail} = useProjectDetailContext();

    return (
        <Box>
            <AsideElementHeading text={"Days Remaining"}/>
            <LoadOrFetchWrapper
                loading={loadingProjectDetail}
                fetching={fetchingProjectDetail}
                loader={<Rounded2Half/>}>
                <StaticText text={projectDetail?.daysRemaining}/>
            </LoadOrFetchWrapper>
        </Box>
    );
}

export default ProjectDetailAsideDaysRemaining;