import {Avatar24x24} from "../../../../../components/avatar/Avatars.jsx";
import {Box, Typography} from "@mui/material";
import {formatDateToLocalWithTime} from "../../../../../utils/utils.js";
import useDefaultEditor from "../../../../../components/editor/useDefaultEditor.js";
import TextEditor from "../../../../../components/editor/Editor.jsx";
import {StyledCommentItemBox, StyledCommentItemMain, StyledCommentItemMetadata} from "./CommentStyles.jsx";

function SingleComment({item}) {

    const {editingOff} = useDefaultEditor(item.content);

    return (
        <StyledCommentItemBox>
            <Avatar24x24 src={item.authorProfileImage} alt={item.authorName}/>
            <StyledCommentItemMain>
                <StyledCommentItemMetadata>
                    <Typography variant="body2" color="textSecondary">
                        {item.authorName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        |
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {formatDateToLocalWithTime(item.updatedAt)}
                    </Typography>
                </StyledCommentItemMetadata>
                <Box>
                    <TextEditor editor={editingOff} height={"min-content"}/>
                </Box>
            </StyledCommentItemMain>
        </StyledCommentItemBox>
    );
}

export default SingleComment