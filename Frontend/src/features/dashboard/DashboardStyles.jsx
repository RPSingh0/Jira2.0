import {Box, styled, Typography} from "@mui/material";

export const StyledDashboardBox = styled(Box)(({theme}) => ({

    [theme.breakpoints.up('sm')]: {
        padding: '2rem'
    }
}));

export const StyledDashboardHeading = styled(Typography)(({theme}) => ({
    color: theme.palette.defaultBlack.dark
}));