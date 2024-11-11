import {Box, Paper, styled, Typography} from "@mui/material";

export const StyledCardPaper = styled(Paper)(({theme}) => ({
    padding: "1rem",
    minWidth: "14rem",
    display: "flex",
    flexDirection: "row",
    gap: "1rem",

    "&:hover": {
        boxShadow: theme.shadows[5],
    }
}));

export const StyledProjectCardContentBox = styled(Box)(() => ({
    overflow: "hidden",
    flexGrow: 1
}));

export const StyledProjectTitle = styled(Typography)(() => ({
    fontWeight: "bold",

    "&:hover": {
        cursor: "pointer"
    }
}));

StyledProjectTitle.defaultProps = {
    variant: "subtitle1",
    gutterBottom: true,
    noWrap: true
}

export const StyledInfoText = styled(Typography)(({theme}) => ({
    color: theme.palette.defaultBlack.light,
    fontWeight: "bold",
    textTransform: "uppercase"
}));

export const StyledInfoContentBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem"
}));

export const StyledQuickInfoItem = styled(Box)(() => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
}));

export const StyledQuickInfoItemText = styled(Typography)(() => ({
    display: "flex",
    alignItems: "center",
    gap: "0.2rem",
    fontSize: "0.7rem",
}));

export const StyledProjectCardOverviewContainer = styled(Box)(({theme}) => ({
    display: "flex",
    gap: "1rem",

    [theme.breakpoints.down('c500')]: {
        flexDirection: "column"
    }
}));

export const StyledMeetYourTeamBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "start"
}));

export const StyledProjectCardOverviewSection = styled(Box)(() => ({
    flexGrow: 1
}));