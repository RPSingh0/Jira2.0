import {Box, styled} from "@mui/material";

export const StyledListContainer = styled(Box)(() => ({
    marginTop: "1rem",
    marginBottom: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    maxHeight: "30rem",
    overflow: "auto",
    padding: "0.5rem 0.1rem",
    scrollbarWidth: "thin"
}));