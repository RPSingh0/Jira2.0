import {Box} from "@mui/material";

export function TabContentContainer({value, index, children}) {
    return (
        <Box role="tabpanel" hidden={value !== index}>
            {children}
        </Box>
    );
}