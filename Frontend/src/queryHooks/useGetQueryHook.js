import {useSelector} from "react-redux";
import {getAuthToken, isLoggedIn} from "../services/user/authenticationSlice.js";
import {useQuery} from "@tanstack/react-query";

function useGetQueryHook({key, fn, ...params}) {
    const isUserLoggedIn = useSelector(isLoggedIn);
    const token = useSelector(getAuthToken);

    const {isLoading, data, error} = useQuery({
        queryKey: key,
        queryFn: () => fn({token: token, ...params}),
        enabled: isUserLoggedIn
    });

    return {isLoading, data, error};
}

export default useGetQueryHook;