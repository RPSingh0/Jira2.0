import {Box, styled} from "@mui/material";

export const StyledProjectDetailBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: "2rem"
}));

export const StyledProjectDetailContentBox = styled(Box)(({theme}) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",

    [theme.breakpoints.down('c1000')]: {
        flexDirection: "column-reverse",
        gap: "1rem"
    }
}));

export const StyledProjectDetailMainSectionBox = styled(Box)(({theme}) => ({
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