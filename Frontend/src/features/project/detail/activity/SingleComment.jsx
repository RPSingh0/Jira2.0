import {Avatar24x24} from "../../../../components/avatar/Avatars.jsx";
import {Box, Typography} from "@mui/material";
import {formatDateToLocalWithTime} from "../../../../utils/utils.js";
import useDefaultEditor from "../../../../components/editor/useDefaultEditor.js";
import TextEditor from "../../../../components/editor/Editor.jsx";

function SingleComment({item}) {

    const {editingOff} = useDefaultEditor(item.content);

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            alignItems: "start"
        }}>
            <Avatar24x24 src={item.authorProfileImage} alt={item.authorName}/>
            <Box sx={{
                width: "100%"
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "0.5rem",
                    marginBottom: "0.5rem"
                }}>
                    <Typography variant="body2" color="textSecondary">
                        {item.authorName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        |
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {formatDateToLocalWithTime(item.updatedAt)}
                    </Typography>
                </Box>
                <Box>
                    <TextEditor editor={editingOff} height={"min-content"}/>
                </Box>
            </Box>
        </Box>
    );
}

export default SingleComment