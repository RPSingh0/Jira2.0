import {useDispatch} from "react-redux";
import {useMutation} from "@tanstack/react-query";
import {loginUserService} from "../../../services/user/userService.js";
import {login} from "../../../services/user/authenticationSlice.js";
import {toast} from "react-toastify";

export function useLogin() {
    const dispatch = useDispatch();

    // hit endpoint to get user details with email and password
    const {mutate: loginUser, isPending: isLoggingIn} = useMutation({
        mutationFn: loginUserService,
        onSettled: (data, error) => {
            if (error) {
                toast.error(error.message);
            } else {
                dispatch(login({token: data.data.token}));
            }
        }
    });

    return {loginUser, isLoggingIn};
}