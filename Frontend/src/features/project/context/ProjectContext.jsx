import {createContext, useContext} from "react";
import {useParams} from "react-router-dom";
import useGetQueryHook from "../../../queryHooks/useGetQueryHook.js";
import {getProjectDetailService} from "../../../services/project/projectService.js";

const ProjectContext = createContext();

function ProjectContextProvider({children}) {

    // get project key from url
    const {projectKey} = useParams();

    // load project details using custom hook
    const {
        isLoading: loadingProjectDetail,
        isFetching: fetchingProjectDetail,
        data: projectDetail,
        error: errorProjectDetail,
    } = useGetQueryHook({
        key: [`${projectKey}-detail`],
        fn: getProjectDetailService,
        projectKey: projectKey
    });

    return (
        <ProjectContext.Provider value={{
            loadingProjectDetail,
            fetchingProjectDetail,
            projectDetail,
            errorProjectDetail,
        }}>
            {children}
        </ProjectContext.Provider>
    );
}

function useProjectContext() {
    const context = useContext(ProjectContext);

    if (context === undefined) {
        throw new Error("Using context outside provider");
    }

    return context;
}

export {ProjectContextProvider, useProjectContext};