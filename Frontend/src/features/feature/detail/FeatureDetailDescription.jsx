import useDefaultEditor from "../../../components/editor/useDefaultEditor.js";
import {useEffect, useState} from "react";
import {DescriptionLoadingIndicator} from "../../../components/loader/Loader.jsx";
import LoadOrFetchWrapper from "../../../components/loader/LoadOrFetchWrapper.jsx";
import {useFeatureDetailContext} from "../context/FeatureDetailContext.jsx";
import {useUpdateFeatureDescription} from "../hooks/useUpdateFeatureDescription.js";
import {useQueryClient} from "@tanstack/react-query";
import DescriptionEditor from "../../../components/editor/DescriptionEditor.jsx";

function FeatureDetailDescription() {

    // Contexts
    const {loadingFeatureDetail, fetchingFeatureDetail, featureDetail} = useFeatureDetailContext();

    // Local states
    const {editingOn, editingOff} = useDefaultEditor(undefined);
    const [isEditing, setIsEditing] = useState(false);

    // React query hooks
    const {updateFeatureDescription} = useUpdateFeatureDescription();
    const queryClient = useQueryClient();

    // Effects
    useEffect(() => {
        if (!loadingFeatureDetail && !fetchingFeatureDetail) {
            editingOn.commands.setContent(featureDetail.description);
            editingOff.commands.setContent(featureDetail.description);
        }
    }, [loadingFeatureDetail, fetchingFeatureDetail]);

    // handler functions
    function handleSaveDescription() {
        updateFeatureDescription({
            projectKey: featureDetail.projectKey,
            featureKey: featureDetail.featureKey,
            description: editingOn.getHTML()
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: [`${featureDetail.featureKey}-detail`]})
                setIsEditing(false)
            }
        });
    }

    return (
        <LoadOrFetchWrapper
            loading={loadingFeatureDetail}
            fetching={fetchingFeatureDetail}
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

export default FeatureDetailDescription;