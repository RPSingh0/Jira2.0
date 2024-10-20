import AutocompleteSelector from "../../components/autocomplete/AutocompleteSelector.jsx";
import useGetQueryHook from "../../queryHooks/useGetQueryHook.js";
import {useEffect, useState} from "react";
import {Box, IconButton, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";
import {IconMap} from "../../utils/IconMap.jsx";
import {toast} from "react-toastify";
import {useQueryClient} from "@tanstack/react-query";
import {useJiraMetadataContext} from "./JiraMetadataContext.jsx";
import {getFeaturesAsOptionsByProjectKey} from "../../services/feature/featureService.js";
import {useUpdateJiraFeature} from "./hooks/useUpdateJiraFeature.js";

function JiraDetailFeature() {

    // context states
    const {
        jiraKey,
        loadingJiraMetadata,
        fetchingJiraMetadata,
        jiraMetadata,
        errorJiraMetadata
    } = useJiraMetadataContext();

    // react query hooks
    const queryClient = useQueryClient();
    const {updateJiraFeature, isUpdating} = useUpdateJiraFeature();

    // local states
    const [feature, setFeature] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // Fetch all features related to project
    const {isLoading: isLoadingFeatures, isFetching: isFetchingFeatures, data: featureOptions} = useGetQueryHook({
        key: ['featureOptions'],
        fn: getFeaturesAsOptionsByProjectKey,
        projectKey: jiraMetadata?.data.jiraMetadata.projectKey,
        enabledDependency: [!loadingJiraMetadata, !fetchingJiraMetadata]
    });

    // once the jira details are loaded, set the user assigned to from jira
    useEffect(() => {
        // if jira details are loaded
        if (!loadingJiraMetadata && !fetchingJiraMetadata) {
            // set the user
            setFeature({
                featureKey: jiraMetadata.data.jiraMetadata.featureKey,
                optionText: `${jiraMetadata.data.jiraMetadata.featureKey} | ${jiraMetadata.data.jiraMetadata.featureName}`
            });
        }
    }, [loadingJiraMetadata, fetchingJiraMetadata, isLoadingFeatures]);

    // handler functions
    function handleUpdateFeature() {

        if (!feature) {
            toast.error('Please select a feature');
            return;
        }

        if (feature.featureKey === jiraMetadata.data.jiraMetadata.featureKey) {
            return;
        }

        updateJiraFeature({
            jiraKey: jiraKey,
            projectKey: jiraMetadata.data.jiraMetadata.projectKey,
            featureKey: feature.featureKey
        }, {
            onSuccess: () => {
                setIsEditing(false);
                queryClient.invalidateQueries([`${jiraKey}-metadata`]);
            }
        });
    }

    return (

        <Box>
            <Typography variant="overline" gutterBottom sx={{paddingLeft: "0.5rem"}}>
                Feature
            </Typography>
            {isEditing ?
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "end",
                    gap: "0.5rem"
                }}>
                    <AutocompleteSelector
                        variant={'default'}
                        name={"assignedTo"}
                        options={isLoadingFeatures ? [] : featureOptions.data.features}
                        isLoading={isLoadingFeatures}
                        value={feature}
                        setValue={setFeature}
                    />
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "0.5rem"
                    }}>
                        <IconButton size={"small"} disableFocusRipple disableTouchRipple sx={{
                            borderRadius: "9px"
                        }} onClick={handleUpdateFeature}>
                            {IconMap['save']}
                        </IconButton>
                        <IconButton size={"small"} disableFocusRipple disableTouchRipple sx={{
                            borderRadius: "9px"
                        }} onClick={() => setIsEditing(false)}>
                            {IconMap['close']}
                        </IconButton>
                    </Box>
                </Box>
                :
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "0.5rem",
                    borderRadius: "9px",
                    transition: "background-color 0.2s ease",

                    "&:hover": {
                        backgroundColor: grey["200"]
                    }
                }} onDoubleClick={() => setIsEditing(true)}>
                    <Typography variant="body1">
                        {`${jiraMetadata?.data.jiraMetadata.featureKey} | ${jiraMetadata?.data.jiraMetadata.featureName}`}
                    </Typography>
                </Box>
            }
        </Box>
    );
}

export default JiraDetailFeature;