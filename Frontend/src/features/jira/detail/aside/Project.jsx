import {Box} from "@mui/material";
import {useJiraMetadataContext} from "../../context/JiraMetadataContext.jsx";
import {Rounded2Half} from "../../../../components/loader/Loader.jsx";
import LoadOrFetchWrapper from "../../../../components/loader/LoadOrFetchWrapper.jsx";
import StaticText from "../../../../components/text/StaticText.jsx";
import AsideElementHeading from "../../../../components/heading/AsideElementHeading.jsx";

function Project() {

    // context states
    const {loadingJiraMetadata, fetchingJiraMetadata, jiraMetadata} = useJiraMetadataContext();

    // derived stats
    const project = `${jiraMetadata?.projectKey} | ${jiraMetadata?.projectName}`;

    return (

        <Box>
            <AsideElementHeading text={"Project"}/>
            <LoadOrFetchWrapper
                loading={loadingJiraMetadata}
                fetching={fetchingJiraMetadata}
                loader={<Rounded2Half/>}>
                <StaticText text={project}/>
            </LoadOrFetchWrapper>
        </Box>
    );
}

export default Project;