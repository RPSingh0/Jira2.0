import {Box, Divider} from "@mui/material";
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
import {useForm, useWatch} from "react-hook-form";
import Label from "../../../components/label/Label.jsx";
import {StyledCreateJiraForm} from "./CreateJiraStyles.jsx";
import {useEffect} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {getFeatureIfLoaded, getProjectIfLoaded} from "../../../utils/utils.js";
import {useParams} from "react-router-dom";

function CreateJira({formId, setSubmitClicked, toggle}) {

    const {editingOn} = useDefaultEditor('');
    const queryClient = useQueryClient();
    const {createJira, isCreating} = useCreateJira();
    const {control, handleSubmit, formState: {errors}, setValue} = useForm();
    const {projectKey, featureKey} = useParams();

    const token = useSelector(getAuthToken);

    const {isLoading: isLoadingProjects, data: projectOptions} = useGetQueryHook({
        key: ['projectOptions'],
        fn: getAllProjectsAsOptionsService
    });

    const selectedProject = useWatch({control: control, name: "project"});

    const {isLoading: isLoadingFeatures, isFetching: isFetchingFeatures, data: featureOptions} = useGetQueryHook({
        key: ['featureOptions'],
        fn: getFeaturesAsOptionsByProjectKey,
        projectKey: selectedProject?.projectKey,
        enabledDependency: [Boolean(selectedProject?.projectKey)]
    });

    const {isLoading: isLoadingUsers, data: userOptions} = useGetQueryHook({
        key: ['userOptions'],
        fn: getAllUsersService
    });

    // Updating project selection once all projects are loaded
    useEffect(() => {
        setValue('project', (getProjectIfLoaded(isLoadingProjects, projectOptions, projectKey)));
    }, [isLoadingProjects]);

    // Updating project selection once all projects are loaded
    useEffect(() => {
        setValue('feature', (getFeatureIfLoaded(isFetchingFeatures, featureOptions, featureKey)));
    }, [isFetchingFeatures]);

    useEffect(() => {
        queryClient.invalidateQueries({queryKey: ['featureOptions']});
    }, [selectedProject]);

    function onSubmit(data) {

        setSubmitClicked(true);

        const {project, feature, issueType, summary, issuePoints, assignee} = data;

        // create jira
        createJira({
            token: token,
            summary: summary,
            jiraType: issueType,
            jiraPoint: issuePoints,
            description: editingOn.getHTML(),
            projectKey: project.projectKey,
            featureKey: feature.featureKey,
            assignee: assignee.email
        }, {
            onSettled: () => {
                setSubmitClicked(false);
                toggle();
            }
        });
    }

    return (
        <StyledCreateJiraForm id={formId} onSubmit={handleSubmit(onSubmit)}>
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
                disabled={isLoadingProjects || isCreating}
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
                loading={isFetchingFeatures}
                disabled={isLoadingFeatures || isFetchingFeatures || isCreating}
                error={!!errors.feature}
                helperText={errors.feature?.message}
            />
            <Divider sx={{margin: "2rem 0"}}/>
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
                disabled={isLoadingUsers || isCreating}
                error={!!errors.assignee}
                helperText={errors.assignee?.message}
            />
        </StyledCreateJiraForm>
    );
}

export default CreateJira;