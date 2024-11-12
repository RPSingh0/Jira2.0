import {createContext, useContext} from "react";
import {useParams} from "react-router-dom";
import useGetQueryHook from "../../../queryHooks/useGetQueryHook.js";
import {getProjectDetailService} from "../../../services/project/projectService.js";

const ProjectDetailContext = createContext();

function ProjectDetailContextProvider({children}) {

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
        <ProjectDetailContext.Provider value={{
            loadingProjectDetail,
            fetchingProjectDetail,
            projectDetail,
            errorProjectDetail,
        }}>
            {children}
        </ProjectDetailContext.Provider>
    );
}

function useProjectDetailContext() {
    const context = useContext(ProjectDetailContext);

    if (context === undefined) {
        throw new Error("Using context outside provider");
    }

    return context;
}

export {ProjectDetailContextProvider, useProjectDetailContext};