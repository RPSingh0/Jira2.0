import {Button} from "@mui/material";
import TextEditor from "../../components/editor/Editor.jsx";
import {getFormData} from "../../utils/FormUtils.js";
import useDefaultEditor from "../../components/editor/useDefaultEditor.js";
import AutocompleteSelector from "./AutocompleteSelector.jsx";
import {useEffect, useState} from "react";
import {getAllUsersService} from "../../services/user/userService.js";
import useGetQueryHook from "../../queryHooks/useGetQueryHook.js";
import {toast} from "react-toastify";
import useDebounce from "../../hooks/useDebounce.js";
import {useGetProjectKey} from "./hooks/useGetProjectKey.js";
import {useCreateProject} from "./hooks/useCreateProject.js";
import {useNavigate} from "react-router-dom";
import {
    StyledCreateProjectAsideImageBox,
    StyledCreateProjectContainer,
    StyledCreateProjectContentBox,
    StyledCreateProjectForm,
    StyledCreateProjectHeading,
    StyledCreateProjectImage
} from "./CreateProjectStyles.jsx";
import {ProjectDatePicker, TextFieldInput} from "./CreateProjectComponents.jsx";

function CreateProject() {

    // Initializing editor
    const creatProjectEditor = useDefaultEditor('Description for project');

    // Local states for form input management
    const [projectName, setProjectName] = useState('');
    const [projectKey, setProjectKey] = useState('');
    const [projectLead, setProjectLead] = useState(null);

    // Custom debounce project name for delayed project key fetching
    const debouncedProjectName = useDebounce(projectName, 500);

    // React query custom hooks
    const {getProjectKey, isFetchingProjectKey} = useGetProjectKey()
    const {createProject, isCreating} = useCreateProject();

    // Other hooks
    const navigate = useNavigate();

    // Getting all users in system for lead selection
    const {isLoading: isLoadingUsers, data: usersForLead, error: usersForLeadError} = useGetQueryHook({
        key: ['usersForLead'],
        fn: getAllUsersService
    });

    // Based on debounced value, fetching project key from database
    useEffect(() => {
        if (debouncedProjectName.length === 0) {
            setProjectKey('');
            return;
        }

        getProjectKey({name: debouncedProjectName}, {
            onSuccess: (data) => {
                setProjectKey(data.data.projectKey);
            }
        });
    }, [debouncedProjectName]);

    function handleSubmit(event) {
        event.preventDefault();

        const {startDate, expectedEndDate} = getFormData(event.target);

        if (projectLead === null) {
            toast.error('Please select a lead');
            return;
        }

        const editorData = creatProjectEditor.getHTML();

        createProject({
            name: projectName,
            projectKey: projectKey,
            description: editorData,
            projectLeadBy: projectLead.id,
            startDate: startDate,
            expectedEndDate: expectedEndDate
        }, {
            onSuccess: () => navigate('/dashboard')
        });
    }

    return (
        // main container
        <StyledCreateProjectContainer>
            {/* Form Section */}
            <StyledCreateProjectContentBox>
                <StyledCreateProjectHeading variant="h6">
                    Create New Project
                </StyledCreateProjectHeading>

                {/* Actual Form */}
                <StyledCreateProjectForm onSubmit={handleSubmit}>
                    <TextFieldInput
                        name={"name"}
                        label={"Project Name"}
                        value={projectName}
                        onChange={(event) => setProjectName(event.target.value.trimStart())}
                        disabled={isCreating}
                    />
                    <TextFieldInput
                        name={"projectKey"}
                        label={"Project Key"}
                        value={projectKey}
                        disabled={isFetchingProjectKey || isCreating}
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                    />
                    <TextEditor
                        editor={creatProjectEditor}
                    />

                    <AutocompleteSelector
                        name={"lead"}
                        label={"Project Lead"}
                        options={(isLoadingUsers || usersForLeadError) ? [] : usersForLead.data.users}
                        avatarNameKey={'name'}
                        avatarSourceKey={'avatar'}
                        optionText={'name'}
                        isLoading={isLoadingUsers}
                        value={projectLead}
                        setValue={setProjectLead}
                    />

                    <ProjectDatePicker
                        name={"startDate"}
                        label={"Start Date"}/>
                    <ProjectDatePicker
                        name={"expectedEndDate"}
                        label={"Expected End Date"}
                    />
                    <Button type={"submit"} variant={"contained"}>
                        Create
                    </Button>
                </StyledCreateProjectForm>
            </StyledCreateProjectContentBox>

            {/* Image Section */}
            <StyledCreateProjectAsideImageBox>
                <StyledCreateProjectImage src={"/new/create_new_project.png"} alt={"new project image"}/>
            </StyledCreateProjectAsideImageBox>
        </StyledCreateProjectContainer>
    );
}

export default CreateProject;