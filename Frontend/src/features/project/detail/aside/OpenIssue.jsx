import {Box} from "@mui/material";
import LoadOrFetchWrapper from "../../../../components/loader/LoadOrFetchWrapper.jsx";
import {Rounded2Half} from "../../../../components/loader/Loader.jsx";
import {useProjectContext} from "../../context/ProjectContext.jsx";
import AsideElementHeading from "../../../../components/heading/AsideElementHeading.jsx";
import StaticText from "../../../../components/text/StaticText.jsx";

function OpenIssue() {

    const {loadingProjectDetail, fetchingProjectDetail, projectDetail} = useProjectContext();

    return (
        <Box>
            <AsideElementHeading text={"Open Issues"}/>
            <LoadOrFetchWrapper
                loading={loadingProjectDetail}
                fetching={fetchingProjectDetail}
                loader={<Rounded2Half/>}>
                <StaticText text={projectDetail?.openIssues}/>
            </LoadOrFetchWrapper>
        </Box>
    );
}

export default OpenIssue;