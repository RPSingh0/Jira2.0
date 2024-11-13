import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {useState} from "react";
import useDefaultEditor from "../../../components/editor/useDefaultEditor.js";
import Editor from "../../../components/editor/Editor.jsx";
import {toast} from "react-toastify";
import {useCreateFeature} from "../hooks/useCreateFeature.js";
import {useParams} from "react-router-dom";
import {FormSubmitButton, OutlinedButton} from "../../../components/button/Buttons.jsx";
import {TextFieldInput} from "../../../components/input/InputTextField.jsx";
import {StyledCreateFeatureForm} from "./CreateFeatureStyles.jsx";

function CreateFeature({open, setOpen}) {

    // Initializing editor
    const {editingOn} = useDefaultEditor('Description for feature');

    // Local states for form input management
    const [featureName, setFeatureName] = useState('');
    const {projectKey} = useParams();

    // React query custom hooks
    const {createFeature, isCreating} = useCreateFeature();

    function handleSubmit(event) {
        event.preventDefault();

        if (!featureName) {
            toast.error('Please provide a feature name');
            return;
        }

        // Description editor data
        const editorData = editingOn.getHTML();

        createFeature({
            name: featureName,
            description: editorData,
            projectKey: projectKey
        }, {
            onSuccess: () => setOpen(false)
        });
    }


    return (
        <Dialog open={open} scroll={"paper"} maxWidth={'md'} fullWidth={true}>
            <DialogTitle>
                Create Feature
            </DialogTitle>
            <DialogContent>
                <StyledCreateFeatureForm id={"create-feature-form"}>
                    <TextFieldInput
                        name={"name"}
                        label={"Feature Name"}
                        value={featureName}
                        onChange={(event) => setFeatureName(event.target.value.trimStart())}
                    />
                    <Editor editor={editingOn} height={"12rem"}/>
                </StyledCreateFeatureForm>
            </DialogContent>
            <DialogActions>
                <FormSubmitButton
                    buttonText={"Create"}
                    formId={"create-feature-form"}
                    onClickHandler={handleSubmit}
                    disabled={isCreating}
                />
                <OutlinedButton text={"Cancel"} onClickHandler={() => setOpen(false)}/>
            </DialogActions>
        </Dialog>
    );
}

export default CreateFeature;