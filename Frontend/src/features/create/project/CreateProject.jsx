import TextEditor from "../../../components/editor/Editor.jsx";
import useDefaultEditor from "../../../components/editor/useDefaultEditor.js";
import AutocompleteSelector from "../../../components/autocomplete/AutocompleteSelector.jsx";
import {useEffect} from "react";
import {getAllUsersService} from "../../../services/user/userService.js";
import useGetQueryHook from "../../../queryHooks/useGetQueryHook.js";
import useDebounce from "../../../hooks/useDebounce.js";
import {useGenerateProjectKey} from "../../project/hooks/useGetProjectKey.js";
import {useCreateProject} from "../../project/hooks/useCreateProject.js";
import {useNavigate} from "react-router-dom";
import {
    StyledCreateProjectAsideImageBox,
    StyledCreateProjectContainer,
    StyledCreateProjectContentBox,
    StyledCreateProjectForm,
    StyledCreateProjectHeading,
    StyledCreateProjectImage
} from "./CreateProjectStyles.jsx";
import {TextFieldInput} from "../../../components/input/InputTextField.jsx";
import InputDatePicker from "../../../components/input/InputDatePicker.jsx";
import {FormSubmitButton} from "../../../components/button/Buttons.jsx";
import {useForm, useWatch} from "react-hook-form";
import {Box} from "@mui/material";
import Label from "../../../components/label/Label.jsx";

function CreateProject() {

    // Initializing editor
    const {editingOn} = useDefaultEditor('Description for project');
    const {control, handleSubmit, formState: {errors}, setValue} = useForm();

    const filledProjectName = useWatch({control: control, name: "projectName", defaultValue: ""});
    console.log(filledProjectName);
    // Custom debounce project name for delayed project key fetching
    const debouncedProjectName = useDebounce(filledProjectName, 500);

    // React query custom hooks
    const {generateProjectKey} = useGenerateProjectKey()
    const {createProject, isCreating} = useCreateProject();

    // Other hooks
    const navigate = useNavigate();

    // Getting all users in system for lead selection
    const {isLoading: isLoadingUsers, data: usersForLead} = useGetQueryHook({
        key: ['usersForLead'],
        fn: getAllUsersService
    });

    // Based on debounced value, fetching project key from database
    useEffect(() => {
        if (debouncedProjectName.length === 0) {
            setValue("projectKey", '');
            return;
        }

        generateProjectKey({name: debouncedProjectName}, {
            onSuccess: (data) => {
                setValue("projectKey", data.projectKey);
            }
        });
    }, [debouncedProjectName]);

    function onSubmit(data) {

        const {projectName, leadBy, startDate, expectedEndDate} = data;

        const editorData = editingOn.getHTML();

        createProject({
            name: projectName,
            description: editorData,
            projectLeadBy: leadBy.email,
            startDate: startDate,
            expectedEndDate: expectedEndDate
        }, {
            onSuccess: () => navigate('/dashboard')
        });
    }

    return (
        <StyledCreateProjectContainer>
            <StyledCreateProjectContentBox>
                <StyledCreateProjectHeading variant="h6">
                    Create New Project
                </StyledCreateProjectHeading>
                <StyledCreateProjectForm onSubmit={handleSubmit(onSubmit)}>
                    <TextFieldInput
                        name={"projectName"}
                        control={control}
                        labelText={"Project Name"}
                        defaultValue={""}
                        placeholder={"Project Name"}
                        required={true}
                        requiredMessage={"Please provide a project name"}
                        id={"projectName"}
                        disabled={isCreating}
                        error={!!errors.projectName}
                        helperText={errors.projectName?.message}
                    />
                    <TextFieldInput
                        name={"projectKey"}
                        control={control}
                        labelText={"Project Key"}
                        defaultValue={""}
                        placeholder={"Project Key"}
                        id={"projectKey"}
                        disabled={true}
                    />
                    <Box>
                        <Label id={"description"} labelText={"Description"}/>
                        <TextEditor editor={editingOn}/>
                    </Box>
                    <AutocompleteSelector
                        name={"leadBy"}
                        id={"leadBy"}
                        labelText={"Project Lead"}
                        control={control}
                        options={usersForLead}
                        optionKey={"email"}
                        optionLabel={"name"}
                        noOptionsText={"No users available"}
                        variant={"user-avatar"}
                        loading={isLoadingUsers}
                        disabled={isLoadingUsers || isCreating}
                        error={!!errors.leadBy}
                        helperText={errors.leadBy?.message}
                    />
                    <InputDatePicker
                        name={"startDate"}
                        label={"Start Date"}
                        disabled={isCreating}
                    />
                    <InputDatePicker
                        name={"expectedEndDate"}
                        label={"Expected End Date"}
                        disabled={isCreating}
                    />
                    <FormSubmitButton
                        variant={"contained"}
                        buttonText={"Create"}
                        disabled={isCreating}
                    />
                </StyledCreateProjectForm>
            </StyledCreateProjectContentBox>
            <StyledCreateProjectAsideImageBox>
                <StyledCreateProjectImage src={"/new/create_new_project.png"} alt={"new project image"}/>
            </StyledCreateProjectAsideImageBox>
        </StyledCreateProjectContainer>
    );
}

export default CreateProject;