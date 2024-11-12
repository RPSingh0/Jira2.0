import {useProjectDetailContext} from "../../context/ProjectDetailContext.jsx";
import {Box, Typography} from "@mui/material";
import LoadOrFetchWrapper from "../../../../components/loader/LoadOrFetchWrapper.jsx";
import {Rounded2Half} from "../../../../components/loader/Loader.jsx";
import {StyledItemValueStaticBox} from "../../../jira/JiraDetailAsideStyles.jsx";
import {formatDateToLocale} from "../../../../utils/utils.js";

function ProjectDetailAsideStarted() {

    const {loadingProjectDetail, fetchingProjectDetail, projectDetail} = useProjectDetailContext();

    return (
        <Box>
            <Typography variant="overline" gutterBottom sx={{paddingLeft: "0.5rem"}}>
                Date Started
            </Typography>
            <LoadOrFetchWrapper
                loading={loadingProjectDetail}
                fetching={fetchingProjectDetail}
                loader={<Rounded2Half/>}>
                <StyledItemValueStaticBox>
                    <Typography variant="body1">
                        {formatDateToLocale(projectDetail?.startDate)}
                    </Typography>
                </StyledItemValueStaticBox>
            </LoadOrFetchWrapper>
        </Box>
    );
}

export default ProjectDetailAsideStarted;