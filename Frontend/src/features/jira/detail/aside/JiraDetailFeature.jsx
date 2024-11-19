import useGetQueryHook from "../../../../queryHooks/useGetQueryHook.js";
import {useEffect, useState} from "react";
import {Box} from "@mui/material";
import {useQueryClient} from "@tanstack/react-query";
import {useJiraMetadataContext} from "../../context/JiraMetadataContext.jsx";
import {getFeaturesAsOptionsByProjectKey} from "../../../../services/feature/featureService.js";
import {useUpdateJiraFeature} from "../../hooks/useUpdateJiraFeature.js";
import {Rounded2Half} from "../../../../components/loader/Loader.jsx";
import LoadOrFetchWrapper from "../../../../components/loader/LoadOrFetchWrapper.jsx";
import AutocompleteAssign from "../../../../components/autocompleteAssign/AutocompleteAssign.jsx";
import StaticText from "../../../../components/text/StaticText.jsx";
import AsideElementHeading from "../../../../components/heading/AsideElementHeading.jsx";
import {useWatch} from "react-hook-form";

function JiraDetailFeature() {

    // context states
    const {
        jiraKey,
        loadingJiraMetadata,
        fetchingJiraMetadata,
        jiraMetadata,
        control,
        errors,
        handleSubmit,
        setValue
    } = useJiraMetadataContext();

    // react query hooks
    const queryClient = useQueryClient();
    const {updateJiraFeature, isUpdating} = useUpdateJiraFeature();

    // local states
    const [isEditing, setIsEditing] = useState(false);

    // Fetch all features related to project
    const {isLoading: isLoadingFeatures, data: featureOptions} = useGetQueryHook({
        key: ['featureOptions'],
        fn: getFeaturesAsOptionsByProjectKey,
        projectKey: jiraMetadata?.projectKey,
        enabledDependency: [!loadingJiraMetadata, !fetchingJiraMetadata]
    });

    const selectedFeature = useWatch({control: control, name: "feature"});

    // once the jira details are loaded, set the user assigned to from jira
    useEffect(() => {
        // if jira details are loaded
        if (!loadingJiraMetadata && !fetchingJiraMetadata) {
            // set the feature
            setValue("feature", {
                featureKey: jiraMetadata.featureKey,
                optionText: `${jiraMetadata.featureKey} | ${jiraMetadata.featureName}`
            });
        }
    }, [loadingJiraMetadata, fetchingJiraMetadata]);

    function onSubmit() {
        if (selectedFeature.featureKey === jiraMetadata.featureKey) {
            return;
        }

        updateJiraFeature({
            jiraKey: jiraKey,
            projectKey: jiraMetadata.projectKey,
            featureKey: selectedFeature.featureKey
        }, {
            onSuccess: () => {
                setIsEditing(false);
                queryClient.invalidateQueries({queryKey: [`${jiraKey}-metadata`]});
            }
        });
    }

    // handler functions
    function handleUpdateFeature() {
        handleSubmit(onSubmit)();
    }

    return (
        <Box>
            <AsideElementHeading text={"Feature"}/>
            <LoadOrFetchWrapper
                loading={loadingJiraMetadata}
                fetching={fetchingJiraMetadata}
                loader={<Rounded2Half/>}>
                <AutocompleteAssign
                    name={"feature"}
                    id={"feature"}
                    control={control}
                    options={featureOptions}
                    optionKey={"featureKey"}
                    optionLabel={"optionText"}
                    variant={"default"}
                    loading={isLoadingFeatures}
                    disabled={isLoadingFeatures || isUpdating}
                    error={!!errors.feature}
                    helperText={errors.feature?.message}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    isUpdating={isUpdating}
                    okClickHandler={handleUpdateFeature}
                >
                    <StaticText text={`${jiraMetadata?.featureKey} | ${jiraMetadata?.featureName}`}/>
                </AutocompleteAssign>
            </LoadOrFetchWrapper>
        </Box>
    );
}

export default JiraDetailFeature;