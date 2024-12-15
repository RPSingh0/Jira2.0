import useDefaultEditor from "../../../components/editor/useDefaultEditor.js";
import {useEffect, useState} from "react";
import {useUpdateJiraDescription} from "../hooks/useUpdateJiraDescription.js";
import {useQueryClient} from "@tanstack/react-query";
import {useJiraContext} from "../context/JiraContext.jsx";
import {DescriptionLoadingIndicator} from "../../../components/loader/Loader.jsx";
import LoadOrFetchWrapper from "../../../components/loader/LoadOrFetchWrapper.jsx";
import DescriptionEditor from "../../../components/editor/DescriptionEditor.jsx";


function Description() {

    // Contexts
    const {jiraKey, loadingJiraDetail, fetchingJiraDetail, jiraDetailData} = useJiraContext();

    // Local states
    const {editingOn, editingOff} = useDefaultEditor(undefined);
    const [isEditing, setIsEditing] = useState(false);

    // React query hooks
    const {updateJiraDescription} = useUpdateJiraDescription();
    const queryClient = useQueryClient();

    // Effects
    useEffect(() => {
        if (!loadingJiraDetail && !fetchingJiraDetail) {
            editingOn.commands.setContent(jiraDetailData.description);
            editingOff.commands.setContent(jiraDetailData.description);
        }
    }, [loadingJiraDetail, fetchingJiraDetail]);

    // handler functions
    function handleSaveDescription() {
        updateJiraDescription({
            jiraKey: jiraKey,
            description: editingOn.getHTML()
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
            loader={<DescriptionLoadingIndicator/>}>
            <DescriptionEditor
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                editingOn={editingOn}
                editingOff={editingOff}
                handleSave={handleSaveDescription}
            />
        </LoadOrFetchWrapper>
    );
}

export default Description;