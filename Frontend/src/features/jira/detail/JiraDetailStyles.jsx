import {Box, styled} from "@mui/material";

export const StyledProjectDetailContentBox = styled(Box)(({theme}) => ({
    display: "flex",
    flexDirection: "row",
    padding: "2rem",
    justifyContent: "space-between",

    [theme.breakpoints.down('c1000')]: {
        flexDirection: "column",
        gap: "1rem"
    }
}));

export const StyledProjectDetailMainSectionBox = styled(Box)(({theme}) => ({
    display: "flex",
    flexDirection: "column",
    gap: "1rem",

    width: "78%",

    [theme.breakpoints.down('c1360')]: {
        width: "73%"
    },

    [theme.breakpoints.down('lg')]: {
        width: "68%"
    },

    [theme.breakpoints.down('c1000')]: {
        width: "100%",
    }
}));

export const StyledEditingSaveAndCancelBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "row",
    gap: "1rem"
}));