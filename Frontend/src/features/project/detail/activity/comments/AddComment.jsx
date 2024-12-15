import CommentEditor from "../../../../../components/editor/CommentEditor.jsx";
import {useState} from "react";
import useDefaultEditor from "../../../../../components/editor/useDefaultEditor.js";
import {Typography} from "@mui/material";
import {Avatar24x24} from "../../../../../components/avatar/Avatars.jsx";
import {useCreateProjectComment} from "../../../hooks/useCreateProjectComment.js";
import {useParams} from "react-router-dom";
import {useQueryClient} from "@tanstack/react-query";
import {StyledAddCommentAside, StyledAddCommentBox} from "./CommentStyles.jsx";

function AddComment() {

    const [isEditing, setIsEditing] = useState(false);
    const {editingOn, editingOff} = useDefaultEditor("Add your comment here...");
    const queryClient = useQueryClient();
    const {createProjectComment, isCreating} = useCreateProjectComment();
    const {projectKey} = useParams();

    function handleAddComment() {

        const editorData = editingOn.getHTML();
        editingOn.setEditable(false);

        createProjectComment({
            projectKey: projectKey,
            content: editorData
        }, {
            onSuccess: () => {
                setIsEditing(false);
                queryClient.invalidateQueries({queryKey: [`${projectKey}-comments`]})
            },
            onSettled: () => editingOn.setEditable(true)
        });
    }

    return (
        <StyledAddCommentBox>
            <Avatar24x24 alt={"Name"} src={"https://avatar.iran.liara.run/public?username=Xenovia"}/>
            <StyledAddCommentAside>
                <Typography variant="body2" color="textSecondary" gutterBottom={true}>
                    Xenovia Gremory
                </Typography>
                <CommentEditor
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    editingOff={editingOff}
                    editingOn={editingOn}
                    handleSave={handleAddComment}
                    disableSave={isCreating}
                    disableCancel={isCreating}
                />
            </StyledAddCommentAside>
        </StyledAddCommentBox>
    );
}

export default AddComment;