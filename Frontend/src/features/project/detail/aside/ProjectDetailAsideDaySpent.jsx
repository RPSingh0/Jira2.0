import {useProjectDetailContext} from "../../context/ProjectDetailContext.jsx";
import {Box, Typography} from "@mui/material";
import LoadOrFetchWrapper from "../../../../components/loader/LoadOrFetchWrapper.jsx";
import {Rounded2Half} from "../../../../components/loader/Loader.jsx";
import {StyledItemValueStaticBox} from "../../../jira/JiraDetailAsideStyles.jsx";

function ProjectDetailAsideDaySpent() {

    const {loadingProjectDetail, fetchingProjectDetail, projectDetail} = useProjectDetailContext();

    return (
        <Box>
            <Typography variant="overline" gutterBottom sx={{paddingLeft: "0.5rem"}}>
                Days Spent
            </Typography>
            <LoadOrFetchWrapper
                loading={loadingProjectDetail}
                fetching={fetchingProjectDetail}
                loader={<Rounded2Half/>}>
                <StyledItemValueStaticBox>
                    <Typography variant="body1">
                        {projectDetail?.daysSpent}
                    </Typography>
                </StyledItemValueStaticBox>
            </LoadOrFetchWrapper>
        </Box>
    );
}

export default ProjectDetailAsideDaySpent;