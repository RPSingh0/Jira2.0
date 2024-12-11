import {Box, styled} from "@mui/material";

export const StyledListContainer = styled(Box)(() => ({
    marginTop: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    height: "30rem",
    overflow: "auto",
    padding: "0.5rem 0.1rem",
    scrollbarWidth: "thin"
}));