import TextEditor from "./Editor.jsx";
import DescriptionSaveOrCancel from "../button/DescriptionSaveOrCancel.jsx";
import {Box} from "@mui/material";

function DescriptionEditor({isEditing, setIsEditing, editingOff, editingOn, handleSave}) {

    function handleDoubleClickOnDescriptionBox() {
        if (isEditing) {
            return;
        }
        setIsEditing(true);
    }

    return (
        <Box onDoubleClick={handleDoubleClickOnDescriptionBox} marginBottom={"1rem"}>
            {isEditing ?
                <TextEditor editor={editingOn} height={"min-content"}/>
                :
                <TextEditor editor={editingOff} height={"min-content"}/>}
            {isEditing && <DescriptionSaveOrCancel
                onSaveClick={handleSave}
                onCancelClick={() => setIsEditing(false)}
            />}
        </Box>
    );
}

export default DescriptionEditor;