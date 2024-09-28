import {Box, Chip, Divider, Paper, styled, Typography} from "@mui/material";

const StyledCardPaper = styled(Paper)(({theme}) => ({
    padding: "1rem",
    minWidth: "14rem",
    display: "flex",
    flexDirection: "row",
    gap: "1rem",

    "&:hover": {
        boxShadow: theme.shadows[5],
    }
}));

const StyledProjectProgressBox = styled(Box)(() => ({
    minWidth: "0.5rem",
    backgroundColor: "#ff5b31",
    borderRadius: "1rem",
    opacity: "80%"
}));

const StyledProjectCardContentBox = styled(Box)(() => ({
    overflow: "hidden",
    flexGrow: 1
}));

const StyledProjectTitle = styled(Typography)(() => ({
    fontWeight: "bold"
}));

const StyledQuickInfoText = styled(Typography)(({theme}) => ({
    color: theme.palette.defaultBlack.light,
    fontWeight: "bold",
    textTransform: "uppercase"
}));

const StyledQuickInfoContentBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem"
}));

const StyledQuickInfoItem = styled(Box)(() => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
}));

const StyledQuickInfoItemText = styled(Typography)(() => ({
    display: "flex",
    alignItems: "center",
    gap: "0.2rem",
    fontSize: "0.7rem",
}));

const StyledQuickInfoDot = styled('span')(({color}) => ({
    lineHeight: "0",
    fontSize: "2rem",
    color: color
}));

function ProjectCard() {
    return (
        <StyledCardPaper elevation={2}>
            <StyledProjectProgressBox/>
            <StyledProjectCardContentBox>
                <StyledProjectTitle variant={"body2"} gutterBottom noWrap>
                    My First Project
                </StyledProjectTitle>
                <Divider flexItem sx={{marginBottom: "1rem"}}/>
                <StyledQuickInfoText variant={"overline"}>
                    Quick Info
                </StyledQuickInfoText>
                <StyledQuickInfoContentBox>
                    <QuickInfoItem text={"Open Issues"} data={5} color={"#ff5b31"}/>
                    <QuickInfoItem text={"Done Issues"} data={198} color={"#57d9a3"}/>
                </StyledQuickInfoContentBox>
            </StyledProjectCardContentBox>
        </StyledCardPaper>
    );
}

function QuickInfoItem({text, data, color}) {
    return (
        <StyledQuickInfoItem>
            <StyledQuickInfoItemText variant={"body1"}>
                <InfoDot color={color}/>
                {text}
            </StyledQuickInfoItemText>
            <Chip label={data} size="small" sx={{fontSize: "0.6rem"}}/>
        </StyledQuickInfoItem>
    );
}

function InfoDot({color}) {
    return (
        <StyledQuickInfoDot color={color}>
            &#8226;
        </StyledQuickInfoDot>
    );
}

export default ProjectCard;