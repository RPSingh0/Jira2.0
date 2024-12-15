import {createContext, useContext} from "react";
import {useParams} from "react-router-dom";
import useGetQueryHook from "../../../queryHooks/useGetQueryHook.js";
import {getAllFeaturesByProjectKey} from "../../../services/feature/featureService.js";

const FeatureContext = createContext();

function FeatureContextProvider({children}) {

    // get project key from url
    const {projectKey} = useParams();

    // load project details using custom hook
    const {
        isLoading: loadingProjectFeature,
        isFetching: fetchingProjectFeature,
        data: featureData,
        error: errorProjectFeature,
    } = useGetQueryHook({
        key: [`${projectKey}-feature`],
        fn: getAllFeaturesByProjectKey,
        projectKey: projectKey
    });

    return (
        <FeatureContext.Provider value={{
            loadingProjectFeature,
            fetchingProjectFeature,
            featureData,
            errorProjectFeature,
        }}>
            {children}
        </FeatureContext.Provider>
    );
}

function useFeatureContext() {
    const context = useContext(FeatureContext);

    if (context === undefined) {
        throw new Error("Using context outside provider");
    }

    return context;
}

export {FeatureContextProvider, useFeatureContext};