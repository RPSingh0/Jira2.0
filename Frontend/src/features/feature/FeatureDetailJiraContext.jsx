import {createContext, useContext} from "react";
import {useParams} from "react-router-dom";
import useGetQueryHook from "../../queryHooks/useGetQueryHook.js";
import {getJiraUnderFeatureService} from "../../services/jira/jiraService.js";

const FeatureJiraContext = createContext();

function FeatureJiraContextProvider({children}) {

    // get jira key from url
    const {projectKey, featureKey} = useParams();

    // load feature details using custom hook
    const {
        isLoading: loadingFeatureJira,
        isFetching: fetchingFeatureJira,
        data: featureJira,
        error: errorFeatureJira,
    } = useGetQueryHook({
        key: [`${featureKey}-jira`],
        fn: getJiraUnderFeatureService,
        projectKey: projectKey,
        featureKey: featureKey
    });


    return (
        <FeatureJiraContext.Provider value={{
            loadingFeatureJira,
            fetchingFeatureJira,
            featureJira,
            errorFeatureJira,
        }}>
            {children}
        </FeatureJiraContext.Provider>
    );
}

function useFeatureJiraContext() {
    const context = useContext(FeatureJiraContext);

    if (context === undefined) {
        throw new Error("Using context outside provider");
    }

    return context;
}

export {FeatureJiraContextProvider, useFeatureJiraContext};