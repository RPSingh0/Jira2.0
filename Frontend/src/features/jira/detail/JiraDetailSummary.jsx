import {useEffect, useState} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {useJiraDetailContext} from "../context/JiraDetailContext.jsx";
import {useUpdateJiraSummary} from "../hooks/useUpdateJiraSummary.js";
import {Rounded2Half} from "../../../components/loader/Loader.jsx";
import LoadOrFetchWrapper from "../../../components/loader/LoadOrFetchWrapper.jsx";
import NameSummaryEditor from "../../../components/editor/NameSummaryEditor.jsx";

function JiraDetailSummary() {

    // Contexts
    const {jiraKey, loadingJiraDetail, fetchingJiraDetail, jiraDetailData} = useJiraDetailContext();

    // Local states
    const [summary, setSummary] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    // React query hooks
    const {updateJiraSummary, isUpdating} = useUpdateJiraSummary();
    const queryClient = useQueryClient();

    // Effects
    useEffect(() => {
        if (!loadingJiraDetail && !fetchingJiraDetail) {
            setSummary(jiraDetailData?.summary)
        }
    }, [loadingJiraDetail, fetchingJiraDetail]);

    // handler functions
    function handleSaveSummary() {
        updateJiraSummary({
            jiraKey: jiraKey,
            summary: summary,
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: [`${jiraKey}`]})
                setIsEditing(false)
            }
        });
    }

    return (
        <LoadOrFetchWrapper
            loading={loadingJiraDetail}
            fetching={fetchingJiraDetail}
            loader={<Rounded2Half/>}>
            <NameSummaryEditor
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                isUpdating={isUpdating}
                value={summary}
                setValue={setSummary}
                multiline={true}
                rows={2}
                okClickHandler={handleSaveSummary}
                text={jiraDetailData?.summary}
            />
        </LoadOrFetchWrapper>
    );
}

export default JiraDetailSummary;