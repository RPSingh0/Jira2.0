import {createContext, useContext} from "react";
import {useParams} from "react-router-dom";
import useGetQueryHook from "../../../queryHooks/useGetQueryHook.js";
import {getJiraMetadataByJiraKeyService} from "../../../services/jira/jiraService.js";
import {useForm} from "react-hook-form";

const JiraMetadataContext = createContext();

function JiraMetadataContextProvider({children}) {

    // get jira key from url
    const {jiraKey} = useParams();

    const {control, formState: {errors}, handleSubmit, setValue} = useForm();

    // load jira metadata using custom hook
    const {
        isLoading: loadingJiraMetadata,
        isFetching: fetchingJiraMetadata,
        data: jiraMetadata,
        error: errorJiraMetadata
    } = useGetQueryHook({
        key: [`${jiraKey}-metadata`],
        fn: getJiraMetadataByJiraKeyService,
        jiraKey: jiraKey
    });

    return (
        <JiraMetadataContext.Provider value={{
            jiraKey: jiraKey,
            loadingJiraMetadata,
            fetchingJiraMetadata,
            jiraMetadata,
            errorJiraMetadata,
            control,
            errors,
            handleSubmit,
            setValue
        }}>
            {children}
        </JiraMetadataContext.Provider>
    );
}

function useJiraMetadataContext() {
    const context = useContext(JiraMetadataContext);

    if (context === undefined) {
        throw new Error("Using context outside provider");
    }

    return context;
}

export {JiraMetadataContextProvider, useJiraMetadataContext};