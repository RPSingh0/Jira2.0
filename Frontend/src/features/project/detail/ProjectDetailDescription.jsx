import useDefaultEditor from "../../../components/editor/useDefaultEditor.js";
import {DescriptionLoadingIndicator} from "../../../components/loader/Loader.jsx";
import LoadOrFetchWrapper from "../../../components/loader/LoadOrFetchWrapper.jsx";
import {useProjectDetailContext} from "../context/ProjectDetailContext.jsx";
import {useEffect, useState} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {useUpdateProjectDescription} from "../hooks/useUpdateProjectDescription.js";
import DescriptionEditor from "../../../components/editor/DescriptionEditor.jsx";

function ProjectDetailDescription() {

    // contexts
    const {loadingProjectDetail, fetchingProjectDetail, projectDetail} = useProjectDetailContext();

    // Local states
    const {editingOn, editingOff} = useDefaultEditor(undefined);
    const [isEditing, setIsEditing] = useState(false);

    // React query hooks
    const {updateProjectDescription} = useUpdateProjectDescription();
    const queryClient = useQueryClient();

    // Effects
    useEffect(() => {
        if (!loadingProjectDetail && !fetchingProjectDetail) {
            editingOn.commands.setContent(projectDetail.description);
            editingOff.commands.setContent(projectDetail.description);
        }
    }, [loadingProjectDetail, fetchingProjectDetail]);

    // handler functions
    function handleSaveDescription() {
        updateProjectDescription({
            projectKey: projectDetail.projectKey,
            description: editingOn.getHTML()
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: [`${projectDetail.projectKey}-detail`]})
                setIsEditing(false)
            }
        });
    }

    return (
        <LoadOrFetchWrapper
            loading={loadingProjectDetail}
            fetching={fetchingProjectDetail}
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

export default ProjectDetailDescription;