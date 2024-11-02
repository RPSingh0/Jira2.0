import {useProjectDetailContext} from "./ProjectDetailContext.jsx";
import {Box, Typography} from "@mui/material";
import LoadOrFetchWrapper from "../../components/loader/LoadOrFetchWrapper.jsx";
import {Rounded2Half} from "../../components/loader/Loader.jsx";
import {StyledItemValueStaticBox} from "../jira/JiraDetailAsideStyles.jsx";

function ProjectDetailAsideDoneIssue() {

    const {loadingProjectDetail, fetchingProjectDetail, projectDetail} = useProjectDetailContext();

    return (
        <Box>
            <Typography variant="overline" gutterBottom sx={{paddingLeft: "0.5rem"}}>
                Done Issues
            </Typography>
            <LoadOrFetchWrapper
                loading={loadingProjectDetail}
                fetching={fetchingProjectDetail}
                loader={<Rounded2Half/>}>
                <StyledItemValueStaticBox>
                    <Typography variant="body1">
                        {projectDetail?.doneIssues}
                    </Typography>
                </StyledItemValueStaticBox>
            </LoadOrFetchWrapper>
        </Box>
    );
}

export default ProjectDetailAsideDoneIssue;