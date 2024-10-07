import {Divider, TextField, Typography} from "@mui/material";
import {getFormData} from "../../utils/FormUtils.js";
import {useEffect, useState} from "react";
import {useLogin} from "./hooks/useLogin.js";
import {NavLink, useNavigate} from "react-router-dom";
import Logo from "../../components/logo/Logo.jsx";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import {isLoggedIn} from "../../services/user/authenticationSlice.js";
import {
    StyledAlert,
    StyledFormPaper,
    StyledLoginBox,
    StyledLoginForm,
    StyledLoginSubmitButton
} from "./LoginStyles.jsx";

function Login() {

    // Local states for form input management
    const [alert, setAlert] = useState(false);
    const [alertText, setAlertText] = useState('');

    // Custom hooks
    const {loginUser, isLoggingIn} = useLogin();

    // Redux selectors
    const isUserLoggedIn = useSelector(isLoggedIn);

    // Other hooks
    const navigate = useNavigate();

    useEffect(() => {
        if (isUserLoggedIn) {
            navigate('/');
        }
    }, [isUserLoggedIn, navigate]);

    function handleSubmit(event) {
        event.preventDefault();

        const data = getFormData(event.target);

        // check for null email and password submissions
        if (!data.email || !data.password) {
            return toast.error('Please provide email and password');
        }

        // try to log in user
        loginUser({email: data.email, password: data.password}, {
            onSuccess: () => {
                event.target.reset();
                navigate("/")
            }
        });
    }

    function handleCloseAlert() {
        setAlert(false);
        setAlertText('');
    }

    return (
        <StyledLoginBox>
            <StyledFormPaper elevation={2}>
                <Logo imageName={"logo"} containerPadding={"0 0 1rem 0"} imageHeight={"2rem"}/>
                <Typography variant={"body1"} sx={{paddingBottom: "1rem"}}>
                    Log in to continue
                </Typography>
                <StyledLoginForm onSubmit={handleSubmit}>
                    <TextField
                        id="user-email-input"
                        name={"email"}
                        label="Email"
                        type={"email"}
                        disabled={isLoggingIn}
                        size={"small"}
                    />
                    <TextField
                        id="user-password-input"
                        name={"password"}
                        label="Password"
                        type={"password"}
                        disabled={isLoggingIn}
                        size={"small"}
                    />
                    <StyledLoginSubmitButton
                        type="submit"
                        variant="contained"
                        disabled={isLoggingIn}
                    >
                        Login
                    </StyledLoginSubmitButton>
                    <Divider/>
                    <NavLink to={"/forgotPassword"} style={{textDecoration: "none", textAlign: "center"}}>
                        Can&apos;t log in ? &sdot; Reset password
                    </NavLink>
                    {alert &&
                        <StyledAlert variant="filled" severity="error" onClose={handleCloseAlert}>
                            {alertText}
                        </StyledAlert>
                    }
                </StyledLoginForm>
            </StyledFormPaper>
        </StyledLoginBox>
    );
}

export default Login;