import TextEditor from "./Editor.jsx";
import EditorContentSaveOrCancel from "../button/EditorContentSaveOrCancel.jsx";
import {Box, styled} from "@mui/material";

const StyledCommentEditorStaticBox = styled(Box)(({theme, $isEditing}) => ({
    border: $isEditing ? 'none' : `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    userSelect: $isEditing ? 'text' : 'none',
}));

function CommentEditor({isEditing, setIsEditing, editingOff, editingOn, handleSave, disableSave, disableCancel}) {

    function handleDoubleClickOnCommentBox() {
        if (isEditing) {
            return;
        }
        setIsEditing(true);
        editingOn.commands.clearContent();
        editingOn.commands.focus('start');
    }

    return (
        <StyledCommentEditorStaticBox onDoubleClick={handleDoubleClickOnCommentBox} $isEditing={isEditing}>
            {isEditing ?
                <TextEditor editor={editingOn} height={"min-content"} maxHeight={"15rem"}/>
                :
                <TextEditor editor={editingOff} height={"min-content"} maxHeight={"15rem"}/>}
            {isEditing && <EditorContentSaveOrCancel
                onSaveClick={handleSave}
                onCancelClick={() => setIsEditing(false)}
                disableSave={disableSave}
                disableCancel={disableCancel}
            />}
        </StyledCommentEditorStaticBox>
    );
}

export default CommentEditor;