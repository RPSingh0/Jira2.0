import {createContext, useContext} from "react";
import {useParams} from "react-router-dom";
import useGetQueryHook from "../../../queryHooks/useGetQueryHook.js";
import {getJiraComments} from "../../../services/comments/commentsService.js";

const CommentContext = createContext();

function CommentContextProvider({children}) {

    // get project key from url
    const {jiraKey} = useParams();

    // load project details using custom hook
    const {
        isLoading: loadingJiraComments,
        isFetching: fetchingJiraComments,
        data: commentsData,
        error: errorCommentsData,
    } = useGetQueryHook({
        key: [`${jiraKey}-comments`],
        fn: getJiraComments,
        jiraKey: jiraKey
    });

    return (
        <CommentContext.Provider value={{
            loadingJiraComments,
            fetchingJiraComments,
            commentsData,
            errorCommentsData
        }}>
            {children}
        </CommentContext.Provider>
    );
}

function useCommentContext() {
    const context = useContext(CommentContext);

    if (context === undefined) {
        throw new Error("Using context outside provider");
    }

    return context;
}

export {CommentContextProvider, useCommentContext};