import {Box, styled} from "@mui/material";

export const StyledWorkedOnTabBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "100%",
    marginTop: "2rem",
}));

export const StyledNoItemsContainer = styled('img')(() => ({
    height: "20rem",
    margin: "auto",
    marginTop: "3rem"
}));