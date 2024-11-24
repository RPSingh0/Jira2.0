import TextEditor from "../../../components/editor/Editor.jsx";
import useDefaultEditor from "../../../components/editor/useDefaultEditor.js";
import AutocompleteSelector from "../../../components/autocomplete/AutocompleteSelector.jsx";
import {useEffect, useRef, useState} from "react";
import {getAllUsersService} from "../../../services/user/userService.js";
import useGetQueryHook from "../../../queryHooks/useGetQueryHook.js";
import useDebounce from "../../../hooks/useDebounce.js";
import {useGenerateProjectKey} from "../../project/hooks/useGetProjectKey.js";
import {useCreateProject} from "../../project/hooks/useCreateProject.js";
import {useNavigate} from "react-router-dom";
import {
    StyledCreateProjectContainer,
    StyledCreateProjectContentPaper,
    StyledCreateProjectForm,
    StyledCreateProjectHeading
} from "./CreateProjectStyles.jsx";
import {TextFieldInput} from "../../../components/input/InputTextField.jsx";
import InputDatePicker from "../../../components/input/InputDatePicker.jsx";
import {useForm, useWatch} from "react-hook-form";
import {Box, Button, Slide} from "@mui/material";
import Label from "../../../components/label/Label.jsx";

function CreateProject() {

    const steps = ["Give it a name", "Select lead", "Goals / Outcomes", "Timeline"];
    const {editingOn} = useDefaultEditor("");
    const {control, trigger, handleSubmit, formState: {errors}, setValue} = useForm();
    const filledProjectName = useWatch({control: control, name: "projectName", defaultValue: ""});
    const {generateProjectKey, isFetchingProjectKey} = useGenerateProjectKey()
    const {createProject, isCreating} = useCreateProject();

    const [activeStep, setActiveStep] = useState(0);
    const formContainerRef = useRef(null);
    const debouncedProjectName = useDebounce(filledProjectName, 500);
    const navigate = useNavigate();

    const {isLoading: isLoadingUsers, data: usersForLead} = useGetQueryHook({
        key: ['usersForLead'],
        fn: getAllUsersService
    });

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

    const handleNext = async () => {
        const isValid = await trigger();

        if (isValid) {
            setActiveStep(prevStep => prevStep + 1);
        }
    }

    const handleBack = () => setActiveStep(prevStep => prevStep - 1);

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <>
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
                            placeholder={"start typing project name"}
                            id={"projectKey"}
                            disabled={isFetchingProjectKey}
                            readOnly={true}
                            helperText={"* This will be your unique project key"}
                        />
                    </>
                );
            case 1:
                return (
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
                        helperText={errors.leadBy?.message || "* We'll let them know they will be leading here..."}
                    />
                );
            case 2:
                return (
                    <Box>
                        <Label id={"description"} labelText={"Description"}/>
                        <TextEditor editor={editingOn}/>
                    </Box>
                );
            case 3:
                return (
                    <>
                        <InputDatePicker
                            name={"startDate"}
                            control={control}
                            id={"startDate"}
                            required={true}
                            requiredMessage={"Please select a start date"}
                            labelText={"Start Date"}
                            disabled={isCreating}
                            error={!!errors.startDate}
                            helperText={errors.startDate?.message}
                        />
                        <InputDatePicker
                            name={"expectedEndDate"}
                            control={control}
                            id={"expectedEndDate"}
                            required={true}
                            requiredMessage={"Please select a end date"}
                            labelText={"Expected End Date"}
                            disabled={isCreating}
                            error={!!errors.expectedEndDate}
                            helperText={errors.expectedEndDate?.message}
                        />
                    </>
                );
            default:
                return "Unknown step";
        }
    }

    return (
        <StyledCreateProjectContainer>
            <StyledCreateProjectContentPaper ref={formContainerRef}>
                <StyledCreateProjectHeading variant="h6">
                    {steps[activeStep]}
                </StyledCreateProjectHeading>
                <Slide
                    in={true}
                    direction={"left"}
                    timeout={300}
                    container={formContainerRef.current}
                    mountOnEnter
                    unmountOnExit
                    key={activeStep}
                >
                    <StyledCreateProjectForm onSubmit={handleSubmit(onSubmit)}>
                        {renderStepContent(activeStep)}
                    </StyledCreateProjectForm>
                </Slide>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: "1rem"
                }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleBack}
                        disabled={activeStep === 0 || isCreating}
                    >
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        color="info"
                        onClick={activeStep === 3 ? handleSubmit(onSubmit) : handleNext}
                        disabled={isCreating || isFetchingProjectKey}
                    >
                        {activeStep === 3 ? "Finish" : "Next"}
                    </Button>
                </Box>
            </StyledCreateProjectContentPaper>
        </StyledCreateProjectContainer>
    );
}

export default CreateProject;