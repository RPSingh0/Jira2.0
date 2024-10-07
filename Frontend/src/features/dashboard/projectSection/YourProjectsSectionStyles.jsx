import {Box, styled, Typography} from "@mui/material";

export const StyledDashboardProjects = styled(Box)(() => ({}));

export const StyledDashboardProjectsList = styled(Box)(() => ({
    display: "flex",
    gap: "1rem",
    padding: "0.5rem 0 0.5rem 0.2rem",
    overflowX: "scroll",
    scrollbarWidth: 'none',

    "&::-webkit-scrollbar": {
        display: "none"
    }
}));

export const StyledHeader = styled(Box)(() => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "0.5rem"
}));

export const StyledHeaderHeading = styled(Typography)(({theme}) => ({
    fontWeight: "bold",
    color: theme.palette.defaultBlack.dark,
}));