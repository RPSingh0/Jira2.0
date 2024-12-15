import {Box, styled} from "@mui/material";

export const StyledCommentsBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
}));

export const StyledAddCommentBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
}));

export const StyledAddCommentAside = styled(Box)(() => ({
    flexGrow: 1,
    overflow: "hidden"
}));

export const StyledCommentItemBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
    alignItems: "start"
}));

export const StyledCommentItemMain = styled(Box)(() => ({
    width: "100%"
}));

export const StyledCommentItemMetadata = styled(Box)(() => ({
    display: "flex",
    flexDirection: "row",
    gap: "0.5rem",
    marginBottom: "0.5rem"
}));