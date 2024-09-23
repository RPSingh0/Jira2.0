import {useSelector} from "react-redux";
import {isLoggedIn} from "../../services/user/authenticationSlice.js";

function WelcomeHome() {
    const isUserLoggedIn = useSelector(isLoggedIn);

    if (isUserLoggedIn) {
        return <p>Welcome!</p>
    }

    return (
        <a href={'/login'}>
            Login here
        </a>
    );
}

export default WelcomeHome;