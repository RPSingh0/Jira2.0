import {Alert, Box, Button, Paper, styled} from "@mui/material";

export const StyledLoginBox = styled(Box)(() => ({
    display: "flex",
    width: "100vw",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
}));

export const StyledFormPaper = styled(Paper)(() => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1.5rem 2rem"
}));

export const StyledLoginForm = styled('form')(() => ({
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
}));

export const StyledLoginSubmitButton = styled(Button)(() => ({
    marginTop: "1rem"
}));

export const StyledAlert = styled(Alert)(() => ({
    position: "absolute",
    bottom: "1rem",
    left: "1rem"
}));