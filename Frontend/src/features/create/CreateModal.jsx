import {Button, DialogActions, DialogContent} from "@mui/material";
import {useState} from "react";
import CreateFeature from "./feature/CreateFeature.jsx";
import CreateJira from "./jira/CreateJira.jsx";
import InputSelectButton from "../../components/input/InputSelectButton.jsx";
import {LoadingButton} from "@mui/lab";
import {FormIds, Options} from "../../utils/CreateModalData.js";
import {StyledDialog, StyledDialogTitle} from "./CreateModalStyles.jsx";


function CreateModal({open, setOpen}) {

    const [createType, setCreateType] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleClose() {
        setOpen(false);
    }

    return (
        <StyledDialog open={open} onClose={handleClose}>
            <StyledDialogTitle>
                Create
                <InputSelectButton
                    createType={createType}
                    setCreateType={setCreateType}
                    options={Options}
                />
            </StyledDialogTitle>
            <DialogContent dividers={true}>
                {(createType === 0) && <CreateJira
                    formId={FormIds[createType]}
                    setSubmitClicked={setIsSubmitting}
                    toggle={handleClose}
                />}
                {(createType === 1) && <CreateFeature
                    formId={FormIds[createType]}
                    setSubmitClicked={setIsSubmitting}
                    toggle={handleClose}
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
                    form={FormIds[createType]}
                    loading={isSubmitting}
                >
                    Create
                </LoadingButton>
            </DialogActions>
        </StyledDialog>
    );
}

export default CreateModal;