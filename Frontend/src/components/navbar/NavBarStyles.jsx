import {AppBar, styled} from "@mui/material";

export const StyledAppBar = styled(AppBar)(() => ({}));

StyledAppBar.defaultProps = {
    position: "sticky",
    elevation: 0,
    color: "default"
}