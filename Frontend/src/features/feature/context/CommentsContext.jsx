import {createContext, useContext} from "react";
import {useParams} from "react-router-dom";
import useGetQueryHook from "../../../queryHooks/useGetQueryHook.js";
import {getFeatureComments} from "../../../services/comments/commentsService.js";

const CommentContext = createContext();

function CommentContextProvider({children}) {

    // get project key from url
    const {projectKey, featureKey} = useParams();

    // load project details using custom hook
    const {
        isLoading: loadingFeatureComments,
        isFetching: fetchingFeatureComments,
        data: commentsData,
        error: errorCommentsData,
    } = useGetQueryHook({
        key: [`${projectKey}-${featureKey}-comments`],
        fn: getFeatureComments,
        projectKey: projectKey,
        featureKey: featureKey
    });

    return (
        <CommentContext.Provider value={{
            loadingFeatureComments,
            fetchingFeatureComments,
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