import {Alert, Box, Button, Divider, Paper, styled, TextField, Typography} from "@mui/material";
import {getFormData} from "../../utils/FormUtils.js";
import {useEffect, useState} from "react";
import {useLogin} from "./useLogin.js";
import {NavLink, useNavigate} from "react-router-dom";
import Logo from "../../components/logo/Logo.jsx";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import {isLoggedIn} from "../../services/user/authenticationSlice.js";

const StyledLoginBox = styled(Box)(() => ({
    display: "flex",
    width: "100vw",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
}));

const StyledFormPaper = styled(Paper)(() => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1.5rem 2rem"
}));

const StyledLoginForm = styled('form')(() => ({
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
}));

const StyledLoginSubmitButton = styled(Button)(() => ({
    marginTop: "1rem"
}));

const StyledAlert = styled(Alert)(() => ({
    position: "absolute",
    bottom: "1rem",
    left: "1rem"
}));

function Login() {

    const [alert, setAlert] = useState(false);
    const [alertText, setAlertText] = useState('');
    const navigate = useNavigate();
    const {loginUser, isLoggingIn} = useLogin();
    const isUserLoggedIn = useSelector(isLoggedIn);

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
                    />
                    <TextField
                        id="user-password-input"
                        name={"password"}
                        label="Password"
                        type={"password"}
                        disabled={isLoggingIn}
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