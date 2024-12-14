import {createContext, useContext} from "react";
import {useParams} from "react-router-dom";
import useGetQueryHook from "../../../queryHooks/useGetQueryHook.js";
import {getProjectComments} from "../../../services/comments/commentsService.js";

const ProjectDetailCommentContext = createContext();

function ProjectDetailCommentContextProvider({children}) {

    // get project key from url
    const {projectKey} = useParams();

    // load project details using custom hook
    const {
        isLoading: loadingProjectComments,
        isFetching: fetchingProjectComments,
        data: commentsData,
        error: errorCommentsData,
    } = useGetQueryHook({
        key: [`${projectKey}-comments`],
        fn: getProjectComments,
        projectKey: projectKey
    });

    return (
        <ProjectDetailCommentContext.Provider value={{
            loadingProjectComments,
            fetchingProjectComments,
            commentsData,
            errorCommentsData
        }}>
            {children}
        </ProjectDetailCommentContext.Provider>
    );
}

function useProjectDetailCommentContext() {
    const context = useContext(ProjectDetailCommentContext);

    if (context === undefined) {
        throw new Error("Using context outside provider");
    }

    return context;
}

export {ProjectDetailCommentContextProvider, useProjectDetailCommentContext};