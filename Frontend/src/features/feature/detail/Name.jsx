import {useFeatureContext} from "../context/FeatureContext.jsx";
import {Rounded2Half} from "../../../components/loader/Loader.jsx";
import LoadOrFetchWrapper from "../../../components/loader/LoadOrFetchWrapper.jsx";
import {useEffect, useState} from "react";
import {useUpdateFeatureName} from "../hooks/useUpdateFeatureName.js";
import {useQueryClient} from "@tanstack/react-query";
import NameSummaryEditor from "../../../components/editor/NameSummaryEditor.jsx";


function Name() {

    // Contexts
    const {loadingFeatureDetail, fetchingFeatureDetail, featureDetail} = useFeatureContext();

    // Local states
    const [name, setName] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    // React query hooks
    const {updateFeatureName, isUpdating} = useUpdateFeatureName();
    const queryClient = useQueryClient();

    // Effects
    useEffect(() => {
        if (!loadingFeatureDetail && !fetchingFeatureDetail) {
            setName(featureDetail?.name)
        }
    }, [loadingFeatureDetail, fetchingFeatureDetail]);

    function handleSaveName() {
        updateFeatureName({
            projectKey: featureDetail.projectKey,
            featureKey: featureDetail.featureKey,
            name: name
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
            loader={<Rounded2Half/>}>
            <NameSummaryEditor
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                isUpdating={isUpdating}
                value={name}
                setValue={setName}
                multiline={false}
                okClickHandler={handleSaveName}
                text={featureDetail?.name}
            />
        </LoadOrFetchWrapper>
    );
}

export default Name;