import {Dialog, DialogTitle, styled} from "@mui/material";

export const StyledDialog = styled(Dialog)(() => ({}));
StyledDialog.defaultProps = {
    scroll: "paper",
    fullWidth: true,
    maxWidth: "md"
};

export const StyledDialogTitle = styled(DialogTitle)(() => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
}));