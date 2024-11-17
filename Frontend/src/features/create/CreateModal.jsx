import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {useState} from "react";
import CreateFeature from "./feature/CreateFeature.jsx";
import CreateJira from "./jira/CreateJira.jsx";
import InputSelectButton from "../../components/input/InputSelectButton.jsx";
import {LoadingButton} from "@mui/lab";

const formIds = {
    0: 'create-jira-form',
    1: 'create-feature-form'
}

const options = [
    "Issue",
    "Feature"
];

function CreateModal({open, setOpen}) {

    const [createType, setCreateType] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleClose() {
        setOpen(false);
    }

    return (
        <Dialog
            open={open}
            scroll={"paper"}
            fullWidth={true}
            maxWidth={"md"}
            onClose={handleClose}
        >
            <DialogTitle sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
            }}>
                Create
                <InputSelectButton
                    createType={createType}
                    setCreateType={setCreateType}
                    options={options}
                />
            </DialogTitle>
            <DialogContent dividers={true}>
                {(createType === 0) && <CreateJira
                    formId={formIds[createType]}
                    setSubmitClicked={setIsSubmitting}
                />}
                {(createType === 1) && <CreateFeature
                    formId={formIds[createType]}
                    setSubmitClicked={setIsSubmitting}
                />}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>
                    Cancel
                </Button>
                <LoadingButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    form={formIds[createType]}
                    loading={isSubmitting}
                >
                    Create
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
}

export default CreateModal;