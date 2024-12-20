import TextEditor from "./Editor.jsx";
import EditorContentSaveOrCancel from "../button/EditorContentSaveOrCancel.jsx";
import {Box} from "@mui/material";

function DescriptionEditor({isEditing, setIsEditing, editingOff, editingOn, handleSave}) {

    function handleDoubleClickOnDescriptionBox() {
        if (isEditing) {
            return;
        }
        setIsEditing(true);
    }

    return (
        <Box onDoubleClick={handleDoubleClickOnDescriptionBox}>
            {isEditing ?
                <TextEditor editor={editingOn} height={"min-content"}/>
                :
                <TextEditor editor={editingOff} height={"min-content"}/>}
            {isEditing && <EditorContentSaveOrCancel
                onSaveClick={handleSave}
                onCancelClick={() => setIsEditing(false)}
            />}
        </Box>
    );
}

export default DescriptionEditor;