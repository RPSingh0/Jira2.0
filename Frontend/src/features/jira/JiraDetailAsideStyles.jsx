import {Box, styled} from "@mui/material";
import {grey} from "@mui/material/colors";

export const StyledOkCancelPaperButtonBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "row",
    gap: "0.5rem",
    position: "absolute",
    bottom: "-2rem",
    right: 0
}));

export const StyledItemValueStaticBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "1rem",
    padding: "0.5rem",
    borderRadius: "9px",
    transition: "background-color 0.2s ease",

    "&:hover": {
        backgroundColor: grey["200"]
    }
}));

export const StyledAutoCompleteWithButtonBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "end",
    gap: "0.5rem",
    position: "relative"
}));