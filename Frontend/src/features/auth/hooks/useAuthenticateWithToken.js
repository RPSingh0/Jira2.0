import {useMutation} from "@tanstack/react-query";
import {authenticateUserWithTokenService} from "../../../services/user/userService.js";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {logout} from "../../../services/user/authenticationSlice.js";

export function useAuthenticateWithToken() {

    const dispatch = useDispatch();

    // hit endpoint to get user details with email and password
    const {mutate: authenticateUserWithToken, isPending: isAuthenticating} = useMutation({
        mutationFn: authenticateUserWithTokenService,
        onSettled: (data, error) => {
            if (error) {
                dispatch(logout());
                toast.error(error.message);
            }
        }
    });

    return {authenticateUserWithToken, isAuthenticating};
}