import useDefaultEditor from "../../../components/editor/useDefaultEditor.js";
import TextEditor from "../../../components/editor/Editor.jsx";
import {useCreateFeature} from "../../feature/hooks/useCreateFeature.js";
import {TextFieldInput} from "../../../components/input/InputTextField.jsx";
import {StyledCreateFeatureForm} from "./CreateFeatureStyles.jsx";
import {useForm} from "react-hook-form";
import {Box} from "@mui/material";
import Label from "../../../components/label/Label.jsx";
import AutocompleteSelector from "../../../components/autocomplete/AutocompleteSelector.jsx";
import useGetQueryHook from "../../../queryHooks/useGetQueryHook.js";
import {useEffect} from "react";
import {getProjectIfLoaded} from "../../../utils/utils.js";
import {useParams} from "react-router-dom";
import {getProjectOptionsService} from "../../../services/project/projectService.js";

function CreateFeature({formId, setSubmitClicked, toggle}) {

    const {editingOn} = useDefaultEditor("");
    const {createFeature, isCreating} = useCreateFeature();
    const {control, handleSubmit, formState: {errors}, setValue} = useForm();
    const {projectKey} = useParams();

    // Fetch all the projects
    const {isLoading: isLoadingProjects, data: projectOptions} = useGetQueryHook({
        key: ['projectOptions'],
        fn: getProjectOptionsService
    });

    // Updating project selection once all projects are loaded
    useEffect(() => {
        setValue('project', (getProjectIfLoaded(isLoadingProjects, projectOptions, projectKey)));
    }, [isLoadingProjects]);

    function onSubmit(data) {

        setSubmitClicked(true);

        const {featureName, project} = data;

        // Description editor data
        const editorData = editingOn.getHTML();

        createFeature({
            name: featureName,
            description: editorData,
            projectKey: project.projectKey
        }, {
            onSettled: () => {
                setSubmitClicked(false);
                toggle();
            }
        });
    }

    return (
        <StyledCreateFeatureForm id={formId} onSubmit={handleSubmit(onSubmit)}>
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
            <TextFieldInput
                name={"featureName"}
                control={control}
                labelText={"Feature Name"}
                defaultValue={""}
                placeholder={"Feature name"}
                required={true}
                requiredMessage={"Please provide a feature name"}
                id={"featureName"}
                disabled={isCreating}
                error={!!errors.featureName}
                helperText={errors.featureName?.message}
            />
            <Box>
                <Label labelText={"Description"}/>
                <TextEditor editor={editingOn} height={"12rem"}/>
            </Box>
        </StyledCreateFeatureForm>

    );
}

export default CreateFeature;