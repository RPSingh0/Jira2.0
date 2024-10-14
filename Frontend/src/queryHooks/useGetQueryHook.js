import {useSelector} from "react-redux";
import {getAuthToken, isLoggedIn} from "../services/user/authenticationSlice.js";
import {useQuery} from "@tanstack/react-query";

function useGetQueryHook({key, fn, ...params}) {
    const isUserLoggedIn = useSelector(isLoggedIn);
    const token = useSelector(getAuthToken);

    const {enabledDependency} = params;
    const enabled = enabledDependency ? enabledDependency.reduce((acc, curr) => acc && curr, isUserLoggedIn) : isUserLoggedIn;

    const {isPending, isFetching, data, error} = useQuery({
        queryKey: key,
        queryFn: () => fn({token: token, ...params}),
        enabled: enabled
    });

    return {isLoading: isPending, isFetching, data, error};
}

export default useGetQueryHook;