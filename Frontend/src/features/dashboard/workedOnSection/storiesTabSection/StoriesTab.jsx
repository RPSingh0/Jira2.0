import {useWorkedOnSectionContext} from "../WorkedOnSectionContext.jsx";
import LoadOrFetchWrapper from "../../../../components/loader/LoadOrFetchWrapper.jsx";
import {FeatureJiraLoadingIndicator} from "../../../../components/loader/Loader.jsx";
import {Box} from "@mui/material";
import FeatureDetailItemCard from "../../../feature/FeatureDetailItemCard.jsx";

function StoriesTab() {

    const {loadingWorkedOn, fetchingWorkedOn, workedOn} = useWorkedOnSectionContext();

    return (
        <LoadOrFetchWrapper
            loading={loadingWorkedOn}
            fetching={fetchingWorkedOn}
            loader={<FeatureJiraLoadingIndicator/>}>
            <Box sx={{marginTop: "2rem", display: "flex", flexDirection: "column", gap: "1rem", width: "100%"}}>
                {workedOn?.map(item =>
                    <FeatureDetailItemCard
                        key={item.jiraKey}
                        type={item.jiraType}
                        jiraKey={item.jiraKey}
                        jiraLink={item.jiraLink}
                        title={item.summary}
                        user={item.userAssignedToName}
                        status={item.statusType.toLowerCase()}
                        priority={"high"}
                    />)}
            </Box>
        </LoadOrFetchWrapper>
    );
}

export default StoriesTab;