import {Box, styled} from "@mui/material";

export const StyledDashboardBox = styled(Box)(({theme}) => ({

    [theme.breakpoints.up('sm')]: {
        padding: "2rem"
    },

    [theme.breakpoints.down('sm')]: {
        padding: "1rem"
    }
}));