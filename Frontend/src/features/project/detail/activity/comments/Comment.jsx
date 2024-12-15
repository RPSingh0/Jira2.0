import {useCommentContext} from "../../../context/CommentContext.jsx";
import AddComment from "./AddComment.jsx";
import SingleComment from "./SingleComment.jsx";
import LoadOrFetchWrapper from "../../../../../components/loader/LoadOrFetchWrapper.jsx";
import {CommentsLoadingIndicator} from "../../../../../components/loader/Loader.jsx";
import {StyledCommentsBox} from "./CommentStyles.jsx";

function Comment() {

    const {loadingProjectComments, fetchingProjectComments, commentsData,} = useCommentContext();

    return (
        <LoadOrFetchWrapper
            loading={loadingProjectComments}
            fetching={fetchingProjectComments}
            loader={<CommentsLoadingIndicator/>}>
            <StyledCommentsBox>
                <AddComment/>
                {(!loadingProjectComments || !fetchingProjectComments) && commentsData?.map(item =>
                    <SingleComment item={item}/>
                )}
            </StyledCommentsBox>
        </LoadOrFetchWrapper>

    );
}

export default Comment;