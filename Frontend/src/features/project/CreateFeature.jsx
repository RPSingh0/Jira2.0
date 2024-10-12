import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {TextFieldInput} from "./CreateFeatureComponents.jsx";
import {useEffect, useState} from "react";
import useDefaultEditor from "../../components/editor/useDefaultEditor.js";
import Editor from "../../components/editor/Editor.jsx";
import {useGetFeatureKey} from "./hooks/useGetFeatureKey.js";
import {toast} from "react-toastify";
import {useCreateFeature} from "./hooks/useCreateFeature.js";

function CreateFeature({projectId, open, setOpen}) {

    // Initializing editor
    const createFeatureEditor = useDefaultEditor('Description for feature');

    // Local states for form input management
    const [featureName, setFeatureName] = useState('');
    const [featureKey, setFeatureKey] = useState('');

    // React query custom hooks
    const {getFeatureKey, isFetchingFeatureKey} = useGetFeatureKey();
    const {createFeature, isCreating} = useCreateFeature();

    useEffect(() => {
        getFeatureKey({id: projectId}, {
            onSuccess: (data) => {
                setFeatureKey(data.data.featureKey);
            }
        })
    }, [open]);

    function handleSubmit(event) {
        event.preventDefault();

        if (!featureName) {
            toast.error('Please provide a feature name');
            return;
        }

        // Description editor data
        const editorData = createFeatureEditor.getHTML();

        createFeature({
            name: featureName,
            description: editorData,
            featureKey: featureKey,
            projectId: projectId
        }, {
            onSuccess: () => setOpen(false)
        });
    }


    return (
        <Dialog open={open} scroll={"paper"}>
            <DialogTitle>
                Create Feature (MFP2)
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
                    <TextFieldInput
                        name={"featureKey"}
                        label={"Feature Key"}
                        value={featureKey}
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                        disabled={isFetchingFeatureKey}
                    />
                    <Editor editor={createFeatureEditor} height={"12rem"}/>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    variant={"outlined"}
                    type={"submit"}
                    form={"create-feature-form"}
                    onClick={handleSubmit}
                    disabled={isFetchingFeatureKey || isCreating}
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