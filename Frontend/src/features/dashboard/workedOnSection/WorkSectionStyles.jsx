import {Box, styled, Tab} from "@mui/material";

export const StyledWorkedOnSectionBox = styled(Box)(() => ({
    marginTop: "2rem"
}));

export const StyledTabButtonBox = styled(Box)(({theme}) => ({
    borderBottom: "1px solid",
    borderColor: theme.palette.divider
}));

export const StyledTabButton = styled(Tab)(() => ({
    minHeight: "3rem",
    fontSize: "0.8rem",

    "& svg": {
        height: "1.2rem"
    }
}));