import {createContext, useContext} from "react";
import {useParams} from "react-router-dom";
import useGetQueryHook from "../../../queryHooks/useGetQueryHook.js";
import {getJiraDetailsByJiraKeyService} from "../../../services/jira/jiraService.js";

const JiraContext = createContext();

function JiraDetailContextProvider({children}) {

    // get jira key from url
    const {jiraKey} = useParams();

    // load jira details using custom hook
    const {
        isLoading: loadingJiraDetail,
        isFetching: fetchingJiraDetail,
        data: jiraDetailData,
        error: errorJiraDetail
    } = useGetQueryHook({
        key: [`${jiraKey}`],
        fn: getJiraDetailsByJiraKeyService,
        jiraKey: jiraKey
    });

    return (
        <JiraContext.Provider value={{
            jiraKey,
            loadingJiraDetail,
            fetchingJiraDetail,
            jiraDetailData,
            errorJiraDetail
        }}>
            {children}
        </JiraContext.Provider>
    );
}

function useJiraDetailContext() {
    const context = useContext(JiraContext);

    if (context === undefined) {
        throw new Error("Using context outside provider");
    }

    return context;
}

export {JiraDetailContextProvider, useJiraDetailContext};