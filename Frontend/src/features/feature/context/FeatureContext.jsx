import {createContext, useContext} from "react";
import {useParams} from "react-router-dom";
import useGetQueryHook from "../../../queryHooks/useGetQueryHook.js";
import {getFeatureDetailService} from "../../../services/feature/featureService.js";

const FeatureContext = createContext();

function FeatureContextProvider({children}) {

    // get jira key from url
    const {projectKey, featureKey} = useParams();

    // load feature details using custom hook
    const {
        isLoading: loadingFeatureDetail,
        isFetching: fetchingFeatureDetail,
        data: featureDetail,
        error: errorFeatureDetail,
    } = useGetQueryHook({
        key: [`${featureKey}-detail`],
        fn: getFeatureDetailService,
        projectKey: projectKey,
        featureKey: featureKey
    });

    return (
        <FeatureContext.Provider value={{
            loadingFeatureDetail,
            fetchingFeatureDetail,
            featureDetail,
            errorFeatureDetail,
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