import {Box, styled, Typography} from "@mui/material";
import Search from "../../../components/search/Search.jsx";
import {useFeatureJiraContext} from "./FeatureDetailJiraContext.jsx";
import {FeatureJiraLoadingIndicator} from "../../../components/loader/Loader.jsx";
import LoadOrFetchWrapper from "../../../components/loader/LoadOrFetchWrapper.jsx";
import {StyledListContainer} from "../../../styles/StyledListContainer.jsx";
import JiraListItem from "../../../components/jira/JiraListItem.jsx";

const StyledFeatureDetailJiraBox = styled(Box)(() => ({}));

function FeatureDetailJira() {

    const {loadingFeatureJira, fetchingFeatureJira, featureJira,} = useFeatureJiraContext();

    return (
        <StyledFeatureDetailJiraBox>
            <Typography variant="body1" gutterBottom>
                Jiras
            </Typography>
            <LoadOrFetchWrapper
                loading={loadingFeatureJira}
                fetching={fetchingFeatureJira}
                loader={<FeatureJiraLoadingIndicator/>}>
                <StyledListContainer>
                    {featureJira?.map(item =>
                        <JiraListItem
                            key={item.jiraKey}
                            type={item.jiraType}
                            jiraKey={item.jiraKey}
                            jiraLink={item.jiraLink}
                            title={item.summary}
                            user={item.assigneeName}
                            assigneeProfileImage={item.assigneeProfileImage}
                            status={item.status}
                            priority={"high"}
                        />
                    )}
                </StyledListContainer>
            </LoadOrFetchWrapper>
        </StyledFeatureDetailJiraBox>
    );
}

export default FeatureDetailJira;