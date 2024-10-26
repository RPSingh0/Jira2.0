import {Box, styled} from "@mui/material";
import useDefaultEditor from "../../components/editor/useDefaultEditor.js";
import TextEditor from "../../components/editor/Editor.jsx";

const StyledProjectDetailDescriptionBox = styled(Box)(() => ({
    marginBottom: "2rem"
}));

function ProjectDetailDescription() {

    const {editingOff: creatProjectEditor} = useDefaultEditor('Description for project');

    return (
        <StyledProjectDetailDescriptionBox>
            <TextEditor editor={creatProjectEditor} height={"20rem"}/>
        </StyledProjectDetailDescriptionBox>
    );
}

export default ProjectDetailDescription;