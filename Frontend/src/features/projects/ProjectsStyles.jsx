import {Box, Divider, styled, Typography} from "@mui/material";

export const StyledProjectsBox = styled(Box)(({theme}) => ({
    padding: "1rem",

    [theme.breakpoints.up('sm')]: {
        padding: '2rem'
    }
}));

export const StyledProjectsHeaderBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "2rem"
}));

export const StyledProjectsHeading = styled(Typography)(({theme}) => ({
    color: theme.palette.defaultBlack.dark,
    fontWeight: "bold"
}));

StyledProjectsHeading.defaultProps = {
    variant: "h5"
}

export const StyledDivider = styled(Divider)(() => ({
    marginTop: "2rem",
    marginBottom: "1rem"
}));

export const StyledProjectCardContainerBox = styled(Box)(({theme}) => ({
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    columnGap: "1rem",
    rowGap: "1rem",

    [theme.breakpoints.down('c1360')]: {
        gridTemplateColumns: "1fr 1fr"
    },

    [theme.breakpoints.down('c1000')]: {
        gridTemplateColumns: "1fr"
    }
}));