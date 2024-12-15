import {useCommentContext} from "../../context/CommentContext.jsx";
import {Box} from "@mui/material";
import AddComment from "./AddComment.jsx";
import SingleComment from "./SingleComment.jsx";
import LoadOrFetchWrapper from "../../../../components/loader/LoadOrFetchWrapper.jsx";
import {CommentsLoadingIndicator} from "../../../../components/loader/Loader.jsx";

function Comment() {

    const {loadingProjectComments, fetchingProjectComments, commentsData,} = useCommentContext();

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
                <AddComment/>
                {(!loadingProjectComments || !fetchingProjectComments) && commentsData?.map(item =>
                    <SingleComment item={item}/>
                )}
            </Box>
        </LoadOrFetchWrapper>

    );
}

export default Comment;