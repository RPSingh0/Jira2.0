import {Box, Typography} from "@mui/material";
import {useJiraMetadataContext} from "./JiraMetadataContext.jsx";
import {Rounded2Half} from "../../components/loader/Loader.jsx";
import {StyledItemValueStaticBox} from "./JiraDetailAsideStyles.jsx";
import LoadOrFetchWrapper from "../../components/loader/LoadOrFetchWrapper.jsx";

function JiraDetailProject() {

    // context states
    const {loadingJiraMetadata, fetchingJiraMetadata, jiraMetadata} = useJiraMetadataContext();

    // derived stats
    const project = `${jiraMetadata?.projectKey} | ${jiraMetadata?.projectName}`;

    return (

        <Box>
            <Typography variant="overline" gutterBottom sx={{paddingLeft: "0.5rem"}}>
                Project
            </Typography>
            <LoadOrFetchWrapper
                loading={loadingJiraMetadata}
                fetching={fetchingJiraMetadata}
                loader={<Rounded2Half/>}>
                <StyledItemValueStaticBox>
                    <Typography variant="body1">
                        {project}
                    </Typography>
                </StyledItemValueStaticBox>
            </LoadOrFetchWrapper>
        </Box>
    );
}

export default JiraDetailProject;