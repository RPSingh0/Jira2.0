import {Box, Paper, styled, Typography} from "@mui/material";

export const StyledCreateProjectContainer = styled(Box)(() => ({
    display: "flex",
    padding: "1rem",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
}));

export const StyledCreateProjectContentPaper = styled(Paper)(({theme}) => ({
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    width: "50%",
    padding: "1rem",
    overflow: "hidden",

    [theme.breakpoints.down("lg")]: {
        width: "70%"
    },

    [theme.breakpoints.down("c800")]: {
        width: "100%",
        padding: "1rem"
    }
}));

StyledCreateProjectContentPaper.defaultProps = {
    variant: "outlined"
}

export const StyledCreateProjectHeading = styled(Typography)(({theme}) => ({
    textTransform: "uppercase",
    fontWeight: "bold",
    color: theme.palette.defaultBlack.main
}));

export const StyledCreateProjectForm = styled('form')(() => ({
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
}));