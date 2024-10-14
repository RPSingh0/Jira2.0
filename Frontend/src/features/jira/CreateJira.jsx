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
import {getAllProjectsService} from "../../services/project/projectService.js";
import {getFeatureIfLoaded, getProjectIfLoaded} from "../../utils/utils.js";
import {getAllFeaturesByProjectKey} from "../../services/feature/featureService.js";
import {useQueryClient} from "@tanstack/react-query";
import {getAllUsersService} from "../../services/user/userService.js";

function CreateJira() {

    // Initializing editor
    const createJiraEditor = useDefaultEditor('Description for the jira goes here...');

    // Using params for project and feature pre-selection
    const {projectKey, featureKey} = useParams();

    // Local State for setting project
    const queryClient = useQueryClient();
    const [pOption, setPOption] = useState({loading: true, optionText: "Loading..."});
    const [fOption, setFOption] = useState({loading: true, optionText: "Loading..."});
    const [uOption, setUOption] = useState(null);

    // Fetch all the projects
    const {isLoading: isLoadingProjects, data: projectOptions} = useGetQueryHook({
        key: ['projectOptions'],
        fn: getAllProjectsService
    });

    // Fetch all features related to projects
    const {isLoading: isLoadingFeatures, isFetching: isFetchingFeatures, data: featureOptions} = useGetQueryHook({
        key: ['featureOptions'],
        fn: getAllFeaturesByProjectKey,
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
        queryClient.invalidateQueries('featureOptions');
    }, [pOption]);

    // Updating feature selection once all features are loaded
    useEffect(() => {
        setFOption(getFeatureIfLoaded(isLoadingFeatures, featureOptions, featureKey));
    }, [isLoadingFeatures, pOption]);


    const [jiraType, setJiraType] = useState('');
    const [jiraPoint, setJiraPoint] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        console.log(event.target.form);
        console.log(getFormData(event.target.form));
    }

    return (
        <Dialog open={true} scroll={"paper"} fullWidth={true} maxWidth={"md"}>
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
                    <TextEditor editor={createJiraEditor} height={"15rem"}/>
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
                        options={isLoadingProjects ? [] : projectOptions.data.projects}
                        isLoading={isLoadingProjects}
                        disabled={isLoadingProjects}
                        value={pOption}
                        setValue={setPOption}
                    />
                    <AutocompleteSelector
                        variant={"default"}
                        name={"featureId"}
                        label={"Feature"}
                        options={isLoadingFeatures ? [] : featureOptions.data.features}
                        isLoading={isLoadingFeatures || isFetchingFeatures}
                        disabled={isLoadingFeatures || isFetchingFeatures}
                        value={fOption}
                        setValue={setFOption}
                    />
                    <AutocompleteSelector
                        variant={"user-avatar"}
                        name={"assignedTo"}
                        label={"Assigned To"}
                        options={isLoadingUsers ? [] : userOptions.data.users}
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
                    onClick={handleSubmit}
                >
                    Create
                </Button>
                <Button
                    variant={"outlined"}
                    type={"submit"}
                    form={"create-feature-form"}
                    onClick={() => {
                    }}
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CreateJira;