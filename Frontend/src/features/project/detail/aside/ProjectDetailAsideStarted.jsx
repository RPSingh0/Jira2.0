import {useProjectDetailContext} from "../../context/ProjectDetailContext.jsx";
import {Box} from "@mui/material";
import LoadOrFetchWrapper from "../../../../components/loader/LoadOrFetchWrapper.jsx";
import {Rounded2Half} from "../../../../components/loader/Loader.jsx";
import {formatDateToLocale} from "../../../../utils/utils.js";
import AsideElementHeading from "../../../../components/heading/AsideElementHeading.jsx";
import StaticText from "../../../../components/text/StaticText.jsx";

function ProjectDetailAsideStarted() {

    const {loadingProjectDetail, fetchingProjectDetail, projectDetail} = useProjectDetailContext();

    return (
        <Box>
            <AsideElementHeading text={"Date Started"}/>
            <LoadOrFetchWrapper
                loading={loadingProjectDetail}
                fetching={fetchingProjectDetail}
                loader={<Rounded2Half/>}>
                <StaticText text={formatDateToLocale(projectDetail?.startDate)}/>
            </LoadOrFetchWrapper>
        </Box>
    );
}

export default ProjectDetailAsideStarted;