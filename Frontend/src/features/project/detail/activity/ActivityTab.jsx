import {Box} from "@mui/material";

function ActivityTab({value, index, children}) {
    return (
        <Box role="tabpanel" hidden={value !== index}>
            {children}
        </Box>
    );
}

export default ActivityTab;