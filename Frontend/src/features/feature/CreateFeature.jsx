import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {TextFieldInput} from "./CreateFeatureComponents.jsx";
import {useState} from "react";
import useDefaultEditor from "../../components/editor/useDefaultEditor.js";
import Editor from "../../components/editor/Editor.jsx";
import {toast} from "react-toastify";
import {useCreateFeature} from "./hooks/useCreateFeature.js";
import {useParams} from "react-router-dom";

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
                <Box id={"create-feature-form"} component={'form'} sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    padding: "1rem"
                }}>
                    <TextFieldInput
                        name={"name"}
                        label={"Feature Name"}
                        value={featureName}
                        onChange={(event) => setFeatureName(event.target.value.trimStart())}
                    />
                    <Editor editor={editingOn} height={"12rem"}/>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    variant={"outlined"}
                    type={"submit"}
                    form={"create-feature-form"}
                    onClick={handleSubmit}
                    disabled={isCreating}
                >
                    Create
                </Button>
                <Button
                    variant={"outlined"}
                    onClick={() => setOpen(false)}
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CreateFeature;