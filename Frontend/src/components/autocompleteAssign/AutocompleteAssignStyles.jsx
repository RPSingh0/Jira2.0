import {Box, styled} from "@mui/material";

export const StyledOkCancelPaperButtonBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "row",
    gap: "0.5rem",
    position: "absolute",
    bottom: "-2rem",
    right: 0,
    zIndex: 1000
}));

export const StyledAutoCompleteWithButtonBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "end",
    gap: "0.5rem",
    position: "relative"
}));