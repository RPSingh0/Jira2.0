import {createContext, useContext} from "react";
import {useParams} from "react-router-dom";
import useGetQueryHook from "../../../queryHooks/useGetQueryHook.js";
import {getFeaturesAsOptionsByProjectKey} from "../../../services/feature/featureService.js";

const ProjectDetailFeatureContext = createContext();

function ProjectDetailFeatureContextProvider({children}) {

    // get project key from url
    const {projectKey} = useParams();

    // load project details using custom hook
    const {
        isLoading: loadingProjectFeature,
        isFetching: fetchingProjectFeature,
        data: projectFeature,
        error: errorProjectFeature,
    } = useGetQueryHook({
        key: [`${projectKey}-feature-detail`],
        fn: getFeaturesAsOptionsByProjectKey,
        projectKey: projectKey
    });

    return (
        <ProjectDetailFeatureContext.Provider value={{
            loadingProjectFeature,
            fetchingProjectFeature,
            projectFeature,
            errorProjectFeature,
        }}>
            {children}
        </ProjectDetailFeatureContext.Provider>
    );
}

function useProjectDetailFeatureContext() {
    const context = useContext(ProjectDetailFeatureContext);

    if (context === undefined) {
        throw new Error("Using context outside provider");
    }

    return context;
}

export {ProjectDetailFeatureContextProvider, useProjectDetailFeatureContext};