import {Box} from "@mui/material";

function ProjectDetailActivityTabContainer({value, index, children}) {
    return (
        <Box role="tabpanel" hidden={value !== index}>
            {children}
        </Box>
    );
}

export default ProjectDetailActivityTabContainer;