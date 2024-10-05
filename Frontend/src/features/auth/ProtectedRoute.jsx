import {useSelector} from "react-redux";
import {getAuthToken, isLoggedIn} from "../../services/user/authenticationSlice.js";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useAuthenticateWithToken} from "./useAuthenticateWithToken.js";

function ProtectedRoute({children}) {
    const isUserLoggedIn = useSelector(isLoggedIn);
    const token = useSelector(getAuthToken);
    const navigate = useNavigate();
    const {authenticateUserWithToken} = useAuthenticateWithToken();

    useEffect(() => {

        // if user is not logged in, redirect to login page
        if (!isUserLoggedIn) {
            return navigate("/login");
        }

        // if user is logged in, validate the token stored
        authenticateUserWithToken({token: token});

    }, [isUserLoggedIn]);

    return isUserLoggedIn ? children : null;
}

export default ProtectedRoute;