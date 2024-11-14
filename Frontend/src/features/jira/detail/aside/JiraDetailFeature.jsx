import useGetQueryHook from "../../../../queryHooks/useGetQueryHook.js";
import {useEffect, useState} from "react";
import {Box} from "@mui/material";
import {toast} from "react-toastify";
import {useQueryClient} from "@tanstack/react-query";
import {useJiraMetadataContext} from "../../context/JiraMetadataContext.jsx";
import {getFeaturesAsOptionsByProjectKey} from "../../../../services/feature/featureService.js";
import {useUpdateJiraFeature} from "../../hooks/useUpdateJiraFeature.js";
import {Rounded2Half} from "../../../../components/loader/Loader.jsx";
import LoadOrFetchWrapper from "../../../../components/loader/LoadOrFetchWrapper.jsx";
import AutocompleteAssign from "../../../../components/autocompleteAssign/AutocompleteAssign.jsx";
import StaticText from "../../../../components/text/StaticText.jsx";
import AsideElementHeading from "../../../../components/heading/AsideElementHeading.jsx";

function JiraDetailFeature() {

    // context states
    const {jiraKey, loadingJiraMetadata, fetchingJiraMetadata, jiraMetadata} = useJiraMetadataContext();

    // react query hooks
    const queryClient = useQueryClient();
    const {updateJiraFeature, isUpdating} = useUpdateJiraFeature();

    // local states
    const [feature, setFeature] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // Fetch all features related to project
    const {isLoading: isLoadingFeatures, data: featureOptions} = useGetQueryHook({
        key: ['featureOptions'],
        fn: getFeaturesAsOptionsByProjectKey,
        projectKey: jiraMetadata?.projectKey,
        enabledDependency: [!loadingJiraMetadata, !fetchingJiraMetadata]
    });

    // once the jira details are loaded, set the user assigned to from jira
    useEffect(() => {
        // if jira details are loaded
        if (!loadingJiraMetadata && !fetchingJiraMetadata) {
            // set the feature
            setFeature({
                featureKey: jiraMetadata.featureKey,
                optionText: `${jiraMetadata.featureKey} | ${jiraMetadata.featureName}`
            });
        }
    }, [loadingJiraMetadata, fetchingJiraMetadata]);

    // handler functions
    function handleUpdateFeature() {

        if (!feature) {
            toast.error('Please select a feature');
            return;
        }

        if (feature.featureKey === jiraMetadata.featureKey) {
            return;
        }

        updateJiraFeature({
            jiraKey: jiraKey,
            projectKey: jiraMetadata.projectKey,
            featureKey: feature.featureKey
        }, {
            onSuccess: () => {
                setIsEditing(false);
                queryClient.invalidateQueries({queryKey: [`${jiraKey}-metadata`]});
            }
        });
    }

    return (
        <Box>
            <AsideElementHeading text={"Feature"}/>
            <LoadOrFetchWrapper
                loading={loadingJiraMetadata}
                fetching={fetchingJiraMetadata}
                loader={<Rounded2Half/>}>
                <AutocompleteAssign
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    isLoading={isLoadingFeatures}
                    isUpdating={isUpdating}
                    name={"feature"}
                    variant={"default"}
                    options={isLoadingFeatures ? [] : featureOptions}
                    value={feature}
                    setValue={setFeature}
                    okClickHandler={handleUpdateFeature}
                >
                    <StaticText text={`${jiraMetadata?.featureKey} | ${jiraMetadata?.featureName}`}/>
                </AutocompleteAssign>
            </LoadOrFetchWrapper>
        </Box>
    );
}

export default JiraDetailFeature;