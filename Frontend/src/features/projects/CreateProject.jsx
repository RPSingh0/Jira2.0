import {Box, Button, styled, TextField, Typography} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import TextEditor from "../../components/editor/Editor.jsx";
import {getFormData} from "../../utils/FormUtils.js";
import useDefaultEditor from "../../components/editor/useDefaultEditor.js";
import AutocompleteSelector from "./AutocompleteSelector.jsx";
import {useState} from "react";
import {getAllUsersService} from "../../services/user/userService.js";
import useGetQueryHook from "../../queryHooks/useGetQueryHook.js";
import {toast} from "react-toastify";

const StyledCreateProjectContainer = styled(Box)(() => ({
    display: "flex",
    padding: "1rem",
    flexGrow: 1,
}));

const StyledCreateProjectContentBox = styled(Box)(({theme}) => ({
    display: "flex",
    flexDirection: "column",
    flex: 1,
    maxWidth: "50%",
    padding: "1rem 1rem 1rem 0",

    [theme.breakpoints.down("lg")]: {
        maxWidth: "70%"
    },

    [theme.breakpoints.down("c800")]: {
        maxWidth: "100%",
        padding: "1rem"
    }
}));

const StyledCreateProjectHeading = styled(Typography)(({theme}) => ({
    textTransform: "uppercase",
    fontWeight: "bold",
    color: theme.palette.defaultBlack.main,
    marginBottom: "2rem",
    textAlign: "center"
}));

const StyledCreateProjectForm = styled('form')(() => ({
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
}));

const StyledAsideImageBox = styled(Box)(({theme}) => ({
    flex: 1,
    maxWidth: "50%",
    overflow: "hidden",

    [theme.breakpoints.down("lg")]: {
        maxWidth: "30%"
    },

    [theme.breakpoints.down("c800")]: {
        display: "none"
    }
}));

const StyledImage = styled('img')(({theme}) => ({
    width: "100%",
    height: "100%",
    objectFit: "cover",

    [theme.breakpoints.down("c800")]: {
        display: "none"
    }
}));

function CreateProject() {

    const creatProjectEditor = useDefaultEditor('Description for project');
    const [projectLead, setProjectLead] = useState(null);

    // getting all users in system for lead selection
    const {
        isLoading: isLoadingUsers,
        data: usersForLead,
        error: usersForLeadError
    } = useGetQueryHook({
        key: ['usersForLead'],
        fn: getAllUsersService
    });

    function handleSubmit(event) {
        event.preventDefault();

        if (projectLead === null) {
            toast.error('Please select a lead');
            return;
        }

        console.log(event.target);
        const data = getFormData(event.target);
        console.log(data);

        const editorData = creatProjectEditor.getHTML();
        console.log(editorData);

        console.log(projectLead);
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
                    <TextFieldInput name={"name"} label={"Project Name"}/>
                    <TextFieldInput name={"projectKey"} label={"Project Key"} slotProps={{
                        input: {
                            readOnly: true,
                        },
                    }} defaultValue={"taken from project name"}/>
                    <TextEditor editor={creatProjectEditor}/>

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

                    <ProjectDatePicker name={"startDate"} label={"Start Date"}/>
                    <ProjectDatePicker name={"endDate"} label={"Expected End Date"}/>
                    <Button type={"submit"} variant={"contained"}>Create</Button>
                </StyledCreateProjectForm>
            </StyledCreateProjectContentBox>

            {/* Image Section */}
            <StyledAsideImageBox>
                <StyledImage src={"/new/create_new_project.png"} alt={"new project image"}/>
            </StyledAsideImageBox>
        </StyledCreateProjectContainer>
    );
}

function TextFieldInput({name, label, ...extras}) {
    return (
        <TextField
            name={name}
            label={label}
            variant="outlined"
            size="small"
            required={true}
            fullWidth={true}
            sx={(theme) => ({
                'input': {color: theme.palette.defaultBlack.main}
            })}
            {...extras}
        />
    );
}

function ProjectDatePicker({name, label}) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker name={name} label={label}
                        slotProps={{
                            textField: {
                                size: "small",
                                required: true,
                                sx: (theme) => ({'input': {color: theme.palette.defaultBlack.main}})
                            }
                        }}/>
        </LocalizationProvider>
    );
}

export default CreateProject;