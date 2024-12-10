import {createContext, useContext, useEffect, useState} from "react";
import useGetQueryHook from "../../queryHooks/useGetQueryHook.js";
import {getAllProjectsService} from "../../services/project/projectService.js";
import {useSelector} from "react-redux";
import {getAuthToken} from "../../services/user/authenticationSlice.js";
import {useQueryClient} from "@tanstack/react-query";

const ProjectsContext = createContext();

function ProjectsContextProvider({children}) {

    const authToken = useSelector(getAuthToken);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [searchString, setSearchString] = useState("");

    const queryClient = useQueryClient();

    // load feature details using custom hook
    const {
        isLoading: loadingProjects,
        isFetching: fetchingProjects,
        data: projectsData,
        error: errorProjects,
    } = useGetQueryHook({
        key: [`projects`],
        fn: getAllProjectsService,
        token: authToken,
        page: page,
        pageSize: pageSize,
        search: searchString
    });

    useEffect(() => {
        if (!loadingProjects && !fetchingProjects) {
            setTotalPages(projectsData?.totalPages);
        }
    }, [loadingProjects, fetchingProjects]);

    useEffect(() => {
        queryClient.invalidateQueries({queryKey: ['projects']});
    }, [searchString, page, pageSize]);


    return (
        <ProjectsContext.Provider value={{
            loadingProjects,
            fetchingProjects,
            projectsData,
            errorProjects,
            totalPages,
            page,
            setPage,
            pageSize,
            setPageSize,
            searchString,
            setSearchString,
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