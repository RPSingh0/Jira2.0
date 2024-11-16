import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Tab, Tabs} from "@mui/material";
import {useState} from "react";
import CreateFeature from "./feature/CreateFeature.jsx";
import CreateJira from "./jira/CreateJira.jsx";

function CreateModal({open, setOpen}) {

    const [tab, setTab] = useState(0);

    function handleTabSwitch(_, tabIndexToSwitchTo) {
        setTab(tabIndexToSwitchTo);
    }

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
            <DialogTitle>
                <Tabs
                    value={tab}
                    onChange={handleTabSwitch}
                    variant="fullWidth"
                >
                    <Tab label="New Issue"/>
                    <Tab label="New Feature"/>
                </Tabs>
            </DialogTitle>
            <DialogContent>
                {(tab === 0) && <CreateJira/>}
                {(tab === 1) && <CreateFeature/>}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CreateModal;