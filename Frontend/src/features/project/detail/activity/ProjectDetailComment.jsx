import {useProjectDetailCommentContext} from "../../context/ProjectDetailCommentContext.jsx";
import {Box} from "@mui/material";
import ProjectDetailCommentEditor from "./ProjectDetailCommentEditor.jsx";
import CommentItem from "./CommentItem.jsx";
import LoadOrFetchWrapper from "../../../../components/loader/LoadOrFetchWrapper.jsx";
import {CommentsLoadingIndicator} from "../../../../components/loader/Loader.jsx";

function ProjectDetailComment() {

    const {loadingProjectComments, fetchingProjectComments, commentsData,} = useProjectDetailCommentContext();

    return (
        <LoadOrFetchWrapper
            loading={loadingProjectComments}
            fetching={fetchingProjectComments}
            loader={<CommentsLoadingIndicator/>}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1.8rem"
            }}>
                <ProjectDetailCommentEditor/>
                {(!loadingProjectComments || !fetchingProjectComments) && commentsData?.map(item =>
                    <CommentItem item={item}/>
                )}
            </Box>
        </LoadOrFetchWrapper>

    );
}

export default ProjectDetailComment;