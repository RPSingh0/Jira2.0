import {createContext, useContext} from "react";
import useGetQueryHook from "../../queryHooks/useGetQueryHook.js";
import {getAllProjectsService} from "../../services/project/projectService.js";
import {useSelector} from "react-redux";
import {getAuthToken} from "../../services/user/authenticationSlice.js";

const ProjectsContext = createContext();

function ProjectsContextProvider({children}) {

    const authToken = useSelector(getAuthToken);

    // load feature details using custom hook
    const {
        isLoading: loadingProjects,
        isFetching: fetchingProjects,
        data: projects,
        error: errorProjects,
    } = useGetQueryHook({
        key: [`projects`],
        fn: getAllProjectsService,
        token: authToken
    });


    return (
        <ProjectsContext.Provider value={{
            loadingProjects,
            fetchingProjects,
            projects,
            errorProjects
        }}>
            {children}
        </ProjectsContext.Provider>
    );
}

function useProjectsContext() {
    const context = useContext(ProjectsContext);

    if (context === undefined) {
        throw new Error("Using context outside provider");
    }

    return context;
}

export {ProjectsContextProvider, useProjectsContext};