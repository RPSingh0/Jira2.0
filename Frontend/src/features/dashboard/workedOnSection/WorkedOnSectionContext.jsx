import {createContext, useContext} from "react";
import {getJiraCurrentUserWorkedOnService} from "../../../services/user/userService.js";
import {DashboardTabMap} from "../../../utils/DashboardTabMap.js";
import useGetQueryHook from "../../../queryHooks/useGetQueryHook.js";

const WorkedOnSectionContext = createContext();

function WorkedOnSectionContextProvider({activeTab, children}) {

    const {
        isLoading: loadingWorkedOn,
        isFetching: fetchingWorkedOn,
        data: workedOn,
        error: errorWorkedOn,
    } = useGetQueryHook({
        key: [`workedOnSection:${activeTab}`],
        fn: getJiraCurrentUserWorkedOnService,
        type: DashboardTabMap[activeTab]
    });

    return (
        <WorkedOnSectionContext.Provider value={{
            loadingWorkedOn,
            fetchingWorkedOn,
            workedOn,
            errorWorkedOn,
        }}>
            {children}
        </WorkedOnSectionContext.Provider>
    );
}

function useWorkedOnSectionContext() {
    const context = useContext(WorkedOnSectionContext);

    if (context === undefined) {
        throw new Error("Using context outside provider");
    }

    return context;
}

export {WorkedOnSectionContextProvider, useWorkedOnSectionContext};