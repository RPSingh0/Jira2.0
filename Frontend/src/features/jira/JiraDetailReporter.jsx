import {Box, Typography} from "@mui/material";
import {useJiraMetadataContext} from "./JiraMetadataContext.jsx";
import {StaticAvatarAndText} from "./JiraDetailAsideComponents.jsx";
import {StyledItemValueStaticBox} from "./JiraDetailAsideStyles.jsx";
import {Rounded2Half} from "../../components/loader/Loader.jsx";
import LoadOrFetchWrapper from "../../components/loader/LoadOrFetchWrapper.jsx";

function JiraDetailReporter() {

    // context states
    const {loadingJiraMetadata, fetchingJiraMetadata, jiraMetadata} = useJiraMetadataContext();

    return (

        <Box>
            <Typography variant="overline" gutterBottom sx={{paddingLeft: "0.5rem"}}>
                Created By
            </Typography>
            <LoadOrFetchWrapper
                loading={loadingJiraMetadata}
                fetching={fetchingJiraMetadata}
                loader={<Rounded2Half/>}>
                <StyledItemValueStaticBox>
                    <StaticAvatarAndText
                        src={jiraMetadata?.reporterProfileImage}
                        alt={"reporter"}
                        text={jiraMetadata?.reporterName}
                    />
                </StyledItemValueStaticBox>
            </LoadOrFetchWrapper>
        </Box>
    );
}

export default JiraDetailReporter;