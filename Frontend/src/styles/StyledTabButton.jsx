import {Box, styled, Tab} from "@mui/material";

export const StyledTabButtonBox = styled(Box)(({theme}) => ({
    borderBottom: "1px solid",
    borderColor: theme.palette.divider,
    marginBottom: "2rem"
}));

export const StyledTabButton = styled(Tab)(({color}) => ({
    minHeight: "3rem",
    fontSize: "0.8rem",

    "& svg": {
        height: "1.2rem",
        color: color
    }
}));