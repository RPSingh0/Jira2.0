import AutocompleteSelector from "../../components/autocomplete/AutocompleteSelector.jsx";
import useGetQueryHook from "../../queryHooks/useGetQueryHook.js";
import {useEffect, useState} from "react";
import {Box, Typography} from "@mui/material";
import {toast} from "react-toastify";
import {useQueryClient} from "@tanstack/react-query";
import {useJiraMetadataContext} from "./JiraMetadataContext.jsx";
import {getFeaturesAsOptionsByProjectKey} from "../../services/feature/featureService.js";
import {useUpdateJiraFeature} from "./hooks/useUpdateJiraFeature.js";
import {Rounded2Half} from "../../components/loader/Loader.jsx";
import LoadOrFetchWrapper from "../../components/loader/LoadOrFetchWrapper.jsx";
import {
    StyledAutoCompleteWithButtonBox,
    StyledItemValueStaticBox,
    StyledOkCancelPaperButtonBox
} from "./JiraDetailAsideStyles.jsx";
import {PaperCancelButton, PaperOkButton} from "./JiraDetailAsideComponents.jsx";

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
            <Typography variant="overline" gutterBottom sx={{paddingLeft: "0.5rem"}}>
                Feature
            </Typography>
            <LoadOrFetchWrapper
                loading={loadingJiraMetadata}
                fetching={fetchingJiraMetadata}
                loader={<Rounded2Half/>}>
                {isEditing ?
                    <StyledAutoCompleteWithButtonBox>
                        <AutocompleteSelector
                            variant={'default'}
                            name={"assignee"}
                            options={isLoadingFeatures ? [] : featureOptions}
                            isLoading={isLoadingFeatures}
                            value={feature}
                            setValue={setFeature}
                        />
                        <StyledOkCancelPaperButtonBox>
                            <PaperOkButton onClickHandler={handleUpdateFeature} disabled={isUpdating}/>
                            <PaperCancelButton onClickHandler={() => setIsEditing(false)} disabled={isUpdating}/>
                        </StyledOkCancelPaperButtonBox>
                    </StyledAutoCompleteWithButtonBox>
                    :
                    <StyledItemValueStaticBox onDoubleClick={() => setIsEditing(true)}>
                        <Typography variant="body1">
                            {`${jiraMetadata?.featureKey} | ${jiraMetadata?.featureName}`}
                        </Typography>
                    </StyledItemValueStaticBox>
                }
            </LoadOrFetchWrapper>
        </Box>
    );
}

export default JiraDetailFeature;