import {useSelector} from "react-redux";
import {isLoggedIn} from "../../services/user/authenticationSlice.js";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

function ProtectedRoute({children}) {
    const isUserLoggedIn = useSelector(isLoggedIn);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isUserLoggedIn) {
            navigate("/login");
        }
    }, [isUserLoggedIn, navigate]);

    return isUserLoggedIn ? children : null;
}

export default ProtectedRoute;