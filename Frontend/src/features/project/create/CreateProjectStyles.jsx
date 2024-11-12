import {Box, styled, Typography} from "@mui/material";

export const StyledCreateProjectContainer = styled(Box)(() => ({
    display: "flex",
    padding: "1rem",
    flexGrow: 1,
}));

export const StyledCreateProjectContentBox = styled(Box)(({theme}) => ({
    display: "flex",
    flexDirection: "column",
    flex: 1,
    maxWidth: "50%",
    padding: "1rem 1rem 1rem 0",

    [theme.breakpoints.down("lg")]: {
        maxWidth: "70%"
    },

    [theme.breakpoints.down("c800")]: {
        maxWidth: "100%",
        padding: "1rem"
    }
}));

export const StyledCreateProjectHeading = styled(Typography)(({theme}) => ({
    textTransform: "uppercase",
    fontWeight: "bold",
    color: theme.palette.defaultBlack.main,
    marginBottom: "2rem",
    textAlign: "center"
}));

export const StyledCreateProjectForm = styled('form')(() => ({
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
}));

export const StyledCreateProjectAsideImageBox = styled(Box)(({theme}) => ({
    flex: 1,
    maxWidth: "50%",
    overflow: "hidden",

    [theme.breakpoints.down("lg")]: {
        maxWidth: "30%"
    },

    [theme.breakpoints.down("c800")]: {
        display: "none"
    }
}));

export const StyledCreateProjectImage = styled('img')(({theme}) => ({
    width: "100%",
    height: "100%",
    objectFit: "cover",

    [theme.breakpoints.down("c800")]: {
        display: "none"
    }
}));