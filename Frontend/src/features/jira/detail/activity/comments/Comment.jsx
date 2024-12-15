import {useCommentContext} from "../../../context/CommentsContext.jsx";
import LoadOrFetchWrapper from "../../../../../components/loader/LoadOrFetchWrapper.jsx";
import {CommentsLoadingIndicator} from "../../../../../components/loader/Loader.jsx";
import {StyledCommentsBox} from "../../../../../styles/CommentStyles.jsx";
import AddComment from "./AddComment.jsx";
import SingleComment from "./SingleComment.jsx";

function Comment() {

    const {loadingFeatureComments, fetchingFeatureComments, commentsData} = useCommentContext();

    return (
        <LoadOrFetchWrapper
            loading={loadingFeatureComments}
            fetching={fetchingFeatureComments}
            loader={<CommentsLoadingIndicator/>}
        >
            <StyledCommentsBox>
                <AddComment/>
                {(!loadingFeatureComments || !fetchingFeatureComments) && commentsData?.map(item =>
                    <SingleComment item={item}/>
                )}
            </StyledCommentsBox>
        </LoadOrFetchWrapper>
    );
}

export default Comment;