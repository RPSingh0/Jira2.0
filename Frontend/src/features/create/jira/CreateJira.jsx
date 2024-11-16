import {Box, Button} from "@mui/material";
import {TextFieldInput} from "../../../components/input/InputTextField.jsx";
import InputSelectField from "../../../components/input/InputSelectField.jsx";
import useDefaultEditor from "../../../components/editor/useDefaultEditor.js";
import TextEditor from "../../../components/editor/Editor.jsx";
import AutocompleteSelector from "../../../components/autocomplete/AutocompleteSelector.jsx";
import useGetQueryHook from "../../../queryHooks/useGetQueryHook.js";
import {getAllProjectsAsOptionsService} from "../../../services/project/projectService.js";
import {getFeaturesAsOptionsByProjectKey} from "../../../services/feature/featureService.js";
import {getAllUsersService} from "../../../services/user/userService.js";
import {useCreateJira} from "../../jira/hooks/useCreateJira.js";
import {getAuthToken} from "../../../services/user/authenticationSlice.js";
import {useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import Label from "../../../components/label/Label.jsx";
import {StyledCreateJiraForm} from "./CreateJiraStyles.jsx";

function CreateJira() {

    // Initializing editor
    const {editingOn} = useDefaultEditor('Description for the jira goes here...');

    // global state selectors
    const token = useSelector(getAuthToken);

    // React query hooks
    const {createJira, isCreating} = useCreateJira();

    // React hook form state
    const {control, handleSubmit, formState: {errors}} = useForm();

    // Fetch all the projects
    const {isLoading: isLoadingProjects, data: projectOptions} = useGetQueryHook({
        key: ['projectOptions'],
        fn: getAllProjectsAsOptionsService
    });

    // Fetch all features related to projects
    const {isLoading: isLoadingFeatures, isFetching: isFetchingFeatures, data: featureOptions} = useGetQueryHook({
        key: ['featureOptions'],
        fn: getFeaturesAsOptionsByProjectKey,
        projectKey: 'dr1',
        // enabledDependency: [!pOption.loading]
    });

    // Fetch all users
    const {isLoading: isLoadingUsers, data: userOptions} = useGetQueryHook({
        key: ['userOptions'],
        fn: getAllUsersService
    });

    function onSubmit(data) {
        console.log(data);
    }

    // function onSubmit(event) {
    //     event.preventDefault();
    //
    //     // summary will come from form object
    //     const {summary} = getFormData(event.target.form);
    //
    //     // verify all necessary fields are provided
    //     if (!jiraType) {
    //         toast.error('Jira type is required');
    //         return;
    //     }
    //
    //     if (!summary) {
    //         toast.error('Summary is required');
    //         return;
    //     }
    //
    //     if (!jiraPoint) {
    //         toast.error('Jira point is required');
    //         return;
    //     }
    //
    //     if (!pOption.projectKey) {
    //         toast.error('Please select a project');
    //         return;
    //     }
    //
    //     if (!fOption.featureKey) {
    //         toast.error('Please select a feature');
    //         return;
    //     }
    //
    //     if (!uOption?.email) {
    //         toast.error('Please assign it to a user');
    //         return;
    //     }
    //
    //     // create jira
    //     createJira({
    //         token: token,
    //         summary: summary,
    //         jiraType: jiraType,
    //         jiraPoint: jiraPoint,
    //         description: editingOn.getHTML(),
    //         projectKey: pOption.projectKey,
    //         featureKey: fOption.featureKey,
    //         assignee: uOption.email
    //     }, {
    //         onSuccess: () => setOpen(false)
    //     });
    // }

    return (
        <StyledCreateJiraForm id={"create-jira-form"} onSubmit={handleSubmit(onSubmit)}>
            <InputSelectField
                name={"issueType"}
                control={control}
                labelText={"Issue Type"}
                placeholder={"Issue Type"}
                required={true}
                requiredMessage={"Please select the issue type"}
                id={"issueType"}
                options={[
                    {text: "Bug", value: "bug"},
                    {text: "Story", value: "userStory"}
                ]}
                disabled={isCreating}
                error={!!errors.issueType}
                helperText={errors.issueType?.message}
            />
            <TextFieldInput
                name={"summary"}
                control={control}
                labelText={"Summary"}
                defaultValue={""}
                placeholder={"Summary"}
                required={true}
                requiredMessage={"Please enter a summary about issue"}
                id={"summary"}
                disabled={isCreating}
                error={!!errors.summary}
                helperText={errors.summary?.message}
            />
            <Box>
                <Label labelText={"Description"}/>
                <TextEditor editor={editingOn} height={"12rem"}/>
            </Box>
            <InputSelectField
                name={"issuePoints"}
                control={control}
                labelText={"Issue Points"}
                placeholder={"Issue Points"}
                required={true}
                requiredMessage={"Please select issue points"}
                id={"issuePoints"}
                options={[
                    {text: "1", value: 1},
                    {text: "2", value: 2},
                    {text: "3", value: 3},
                    {text: "5", value: 5},
                    {text: "8", value: 8},
                ]}
                disabled={isCreating}
                error={!!errors.issuePoints}
                helperText={errors.issuePoints?.message}
            />
            <AutocompleteSelector
                name={"project"}
                id={"project"}
                labelText={"Project"}
                control={control}
                options={projectOptions}
                optionKey={"projectKey"}
                optionLabel={"optionText"}
                noOptionsText={"No projects available"}
                variant={"default"}
                loading={isLoadingProjects}
                error={!!errors.project}
                helperText={errors.project?.message}
            />
            <AutocompleteSelector
                name={"feature"}
                id={"feature"}
                labelText={"Feature"}
                control={control}
                options={featureOptions}
                optionKey={"featureKey"}
                optionLabel={"optionText"}
                noOptionsText={"No features available"}
                variant={"default"}
                loading={isLoadingFeatures}
                error={!!errors.feature}
                helperText={errors.feature?.message}
            />
            <AutocompleteSelector
                name={"assignee"}
                id={"assignee"}
                labelText={"Assignee"}
                control={control}
                options={userOptions}
                optionKey={"email"}
                optionLabel={"name"}
                noOptionsText={"No users available"}
                variant={"user-avatar"}
                loading={isLoadingUsers}
                error={!!errors.assignee}
                helperText={errors.assignee?.message}
            />
            <Button type="submit">Submit</Button>
        </StyledCreateJiraForm>
    );
}

export default CreateJira;