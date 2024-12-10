import {useWorkedOnSectionContext} from "../WorkedOnSectionContext.jsx";
import {FeatureJiraLoadingIndicator} from "../../../../components/loader/Loader.jsx";
import LoadOrFetchWrapper from "../../../../components/loader/LoadOrFetchWrapper.jsx";
import JiraListItem from "../../../../components/jira/JiraListItem.jsx";
import {StyledWorkedOnTabBox} from "./WorkedOnTabStyles.jsx";

function WorkedOnTab() {

    const {loadingWorkedOn, fetchingWorkedOn, workedOn} = useWorkedOnSectionContext();

    return (
        <LoadOrFetchWrapper
            loading={loadingWorkedOn}
            fetching={fetchingWorkedOn}
            loader={<FeatureJiraLoadingIndicator/>}>
            <StyledWorkedOnTabBox>
                {workedOn?.jira?.map(item =>
                    <JiraListItem
                        key={item.jiraKey}
                        type={item.jiraType}
                        jiraKey={item.jiraKey}
                        jiraLink={item.jiraLink}
                        title={item.summary}
                        user={item.assigneeName}
                        assigneeProfileImage={item.assigneeProfileImage}
                        status={item.status.toLowerCase()}
                        priority={"high"}
                    />)}
            </StyledWorkedOnTabBox>
        </LoadOrFetchWrapper>
    );
}

export default WorkedOnTab;