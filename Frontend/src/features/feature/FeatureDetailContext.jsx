import {createContext, useContext} from "react";
import {useParams} from "react-router-dom";
import useGetQueryHook from "../../queryHooks/useGetQueryHook.js";
import {getFeatureDetailService} from "../../services/feature/featureService.js";

const FeatureDetailContext = createContext();

function FeatureDetailContextProvider({children}) {

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
        <FeatureDetailContext.Provider value={{
            loadingFeatureDetail,
            fetchingFeatureDetail,
            featureDetail,
            errorFeatureDetail,
        }}>
            {children}
        </FeatureDetailContext.Provider>
    );
}

function useFeatureDetailContext() {
    const context = useContext(FeatureDetailContext);

    if (context === undefined) {
        throw new Error("Using context outside provider");
    }

    return context;
}

export {FeatureDetailContextProvider, useFeatureDetailContext};