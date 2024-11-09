import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {TextFieldInput} from "../../components/input/InputTextField.jsx";
import InputSelectField from "../../components/input/InputSelectField.jsx";
import {useEffect, useState} from "react";
import useDefaultEditor from "../../components/editor/useDefaultEditor.js";
import TextEditor from "../../components/editor/Editor.jsx";
import AutocompleteSelector from "../../components/autocomplete/AutocompleteSelector.jsx";
import {getFormData} from "../../utils/FormUtils.js";
import {useParams} from "react-router-dom";
import useGetQueryHook from "../../queryHooks/useGetQueryHook.js";
import {getAllProjectsAsOptionsService} from "../../services/project/projectService.js";
import {getFeatureIfLoaded, getProjectIfLoaded} from "../../utils/utils.js";
import {getFeaturesAsOptionsByProjectKey} from "../../services/feature/featureService.js";
import {useQueryClient} from "@tanstack/react-query";
import {getAllUsersService} from "../../services/user/userService.js";
import {toast} from "react-toastify";
import {useCreateJira} from "./hooks/useCreateJira.js";
import {getAuthToken} from "../../services/user/authenticationSlice.js";
import {useSelector} from "react-redux";

function CreateJira({open, setOpen}) {

    // Initializing editor
    const {editingOn} = useDefaultEditor('Description for the jira goes here...');

    // Using params for project and feature pre-selection
    const {projectKey, featureKey} = useParams();

    // Local State for setting project
    const queryClient = useQueryClient();
    const [pOption, setPOption] = useState({loading: true, optionText: "Loading..."});
    const [fOption, setFOption] = useState({loading: true, optionText: "Loading..."});
    const [uOption, setUOption] = useState(null);

    // global state selectors
    const token = useSelector(getAuthToken);

    // React query hooks
    const {createJira, isCreating} = useCreateJira();

    // Fetch all the projects
    const {isLoading: isLoadingProjects, data: projectOptions} = useGetQueryHook({
        key: ['projectOptions'],
        fn: getAllProjectsAsOptionsService
    });

    // Fetch all features related to projects
    const {isLoading: isLoadingFeatures, isFetching: isFetchingFeatures, data: featureOptions} = useGetQueryHook({
        key: ['featureOptions'],
        fn: getFeaturesAsOptionsByProjectKey,
        projectKey: pOption.projectKey,
        enabledDependency: [!pOption.loading]
    });

    // Fetch all users
    const {isLoading: isLoadingUsers, data: userOptions} = useGetQueryHook({
        key: ['userOptions'],
        fn: getAllUsersService
    });

    // Updating project selection once all projects are loaded
    useEffect(() => {
        setPOption(getProjectIfLoaded(isLoadingProjects, projectOptions, projectKey));
    }, [isLoadingProjects]);

    useEffect(() => {
        queryClient.invalidateQueries({queryKey: ['featureOptions']});
    }, [pOption]);

    // Updating feature selection once all features are loaded
    useEffect(() => {
        setFOption(getFeatureIfLoaded(isLoadingFeatures, featureOptions, featureKey));
    }, [isLoadingFeatures, pOption]);


    const [jiraType, setJiraType] = useState('');
    const [jiraPoint, setJiraPoint] = useState('');

    function handleSubmit(event) {
        event.preventDefault();

        // summary will come from form object
        const {summary} = getFormData(event.target.form);

        // verify all necessary fields are provided
        if (!jiraType) {
            toast.error('Jira type is required');
            return;
        }

        if (!summary) {
            toast.error('Summary is required');
            return;
        }

        if (!jiraPoint) {
            toast.error('Jira point is required');
            return;
        }

        if (!pOption.projectKey) {
            toast.error('Please select a project');
            return;
        }

        if (!fOption.featureKey) {
            toast.error('Please select a feature');
            return;
        }

        if (!uOption?.email) {
            toast.error('Please assign it to a user');
            return;
        }

        // create jira
        createJira({
            token: token,
            summary: summary,
            jiraType: jiraType,
            jiraPoint: jiraPoint,
            description: editingOn.getHTML(),
            projectKey: pOption.projectKey,
            featureKey: fOption.featureKey,
            assignedTo: uOption.email
        }, {
            onSuccess: () => setOpen(false)
        });
    }

    return (
        <Dialog open={open} scroll={"paper"} fullWidth={true} maxWidth={"lg"}>
            <DialogTitle>
                Create Jira
            </DialogTitle>
            <DialogContent>
                <Box id={"create-jira-form"} component={"form"} sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    padding: "1rem 1rem 1rem 0"
                }}>
                    <InputSelectField
                        name={"type"}
                        label={"Type"}
                        value={jiraType}
                        required={true}
                        onChange={e => setJiraType(e.target.value)}
                        options={[
                            {text: "Bug", value: "bug"},
                            {text: "Story", value: "userStory"}
                        ]}
                    />
                    <TextFieldInput
                        name={"summary"}
                        label={"Summary"}
                    />
                    <TextEditor editor={editingOn} height={"15rem"}/>
                    <InputSelectField
                        name={"point"}
                        label={"Point"}
                        value={jiraPoint}
                        onChange={e => setJiraPoint(parseInt(e.target.value))}
                        options={[
                            {text: "0", value: 0},
                            {text: "1", value: 1},
                            {text: "2", value: 2},
                            {text: "3", value: 3},
                            {text: "5", value: 5},
                            {text: "8", value: 8},
                        ]}
                    />
                    <AutocompleteSelector
                        variant={"default"}
                        name={"projectId"}
                        label={"Project"}
                        options={isLoadingProjects ? [] : projectOptions}
                        isLoading={isLoadingProjects}
                        disabled={isLoadingProjects}
                        value={pOption}
                        setValue={setPOption}
                    />
                    <AutocompleteSelector
                        variant={"default"}
                        name={"featureId"}
                        label={"Feature"}
                        options={isLoadingFeatures ? [] : featureOptions}
                        isLoading={isLoadingFeatures || isFetchingFeatures}
                        disabled={isLoadingFeatures || isFetchingFeatures}
                        value={fOption}
                        setValue={setFOption}
                    />
                    <AutocompleteSelector
                        variant={"user-avatar"}
                        name={"assignedTo"}
                        label={"Assigned To"}
                        options={isLoadingUsers ? [] : userOptions}
                        isLoading={isLoadingUsers}
                        disabled={isLoadingUsers}
                        value={uOption}
                        setValue={setUOption}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    variant={"outlined"}
                    type={"submit"}
                    form={"create-jira-form"}
                    disabled={isCreating}
                    onClick={handleSubmit}
                >
                    Create
                </Button>
                <Button
                    variant={"outlined"}
                    type={"submit"}
                    form={"create-feature-form"}
                    disabled={isCreating}
                    onClick={() => setOpen(false)}
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CreateJira;