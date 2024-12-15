import {Box} from "@mui/material";
import {useJiraMetadataContext} from "../../context/JiraMetadataContext.jsx";
import {Rounded2Half} from "../../../../components/loader/Loader.jsx";
import LoadOrFetchWrapper from "../../../../components/loader/LoadOrFetchWrapper.jsx";
import AsideElementHeading from "../../../../components/heading/AsideElementHeading.jsx";
import {StaticAvatarAndText} from "../../../../components/avatar/StaticAvatarAndText.jsx";

function Reporter() {

    // context states
    const {loadingJiraMetadata, fetchingJiraMetadata, jiraMetadata} = useJiraMetadataContext();

    return (
        <Box>
            <AsideElementHeading text={"Reported By"}/>
            <LoadOrFetchWrapper
                loading={loadingJiraMetadata}
                fetching={fetchingJiraMetadata}
                loader={<Rounded2Half/>}>
                <StaticAvatarAndText
                    src={jiraMetadata?.reporterProfileImage}
                    alt={"reporter"}
                    text={jiraMetadata?.reporterName}
                />
            </LoadOrFetchWrapper>
        </Box>
    );
}

export default Reporter;