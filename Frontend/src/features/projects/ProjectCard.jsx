import {
    Avatar,
    AvatarGroup,
    Box,
    Chip,
    Divider,
    Paper,
    styled,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {blue, deepPurple, green, orange} from "@mui/material/colors";

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
    display: "flex",
    flexDirection: "column",
    minWidth: "0.5rem",
    // backgroundColor: "#ff5b31",
    borderRadius: "1rem",
    overflow: "hidden",
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

const StyledQuickInfoAndTimeLineBox = styled(Box)(({theme}) => ({
    display: "flex",
    gap: "1rem",

    [theme.breakpoints.down('c500')]: {
        flexDirection: "column"
    }
}));

function ProjectCard() {

    const theme = useTheme();
    const match = useMediaQuery(theme.breakpoints.down('c500'));

    return (
        <StyledCardPaper elevation={2}>
            <ProjectProgress/>
            <StyledProjectCardContentBox>
                <StyledProjectTitle variant={"subtitle1"} gutterBottom noWrap>
                    My First Project
                </StyledProjectTitle>

                <Divider flexItem sx={{marginBottom: "1rem"}}/>

                {/* Quick Info and Timeline */}
                <StyledQuickInfoAndTimeLineBox>
                    {/* Quick info */}
                    <Box sx={{flexGrow: 1}}>
                        <StyledQuickInfoText variant={"overline"}>
                            Quick Info
                        </StyledQuickInfoText>
                        <StyledQuickInfoContentBox>
                            <QuickInfoItem text={"Open Issues"} data={5} dot={true} color={blue["700"]} chip={true}/>
                            <QuickInfoItem text={"Done Issues"} data={198} dot={true} color={green["700"]} chip={true}/>
                            <QuickInfoItem text={"Done By You"} data={198} dot={true} color={orange["700"]}
                                           chip={true}/>
                        </StyledQuickInfoContentBox>
                    </Box>

                    <Divider orientation={match ? "horizontal" : "vertical"} flexItem={true}/>

                    {/* Timeline */}
                    <Box sx={{flexGrow: 1}}>
                        <StyledQuickInfoText variant={"overline"}>
                            Timeline
                        </StyledQuickInfoText>
                        <StyledQuickInfoContentBox>
                            <QuickInfoItem text={"Date Started"} dot={true} chip={true}
                                           data={new Date().toLocaleDateString()}/>
                            <QuickInfoItem text={"Expected"} dot={true} chip={true}
                                           data={new Date().toLocaleDateString()}/>
                            <QuickInfoItem text={"Days on project"} dot={true} chip={true} data={365}/>
                        </StyledQuickInfoContentBox>
                    </Box>
                </StyledQuickInfoAndTimeLineBox>
                <Divider flexItem sx={{marginBottom: "1rem", marginTop: "1rem"}}/>
                <Box sx={{display: "flex", flexDirection: "column", alignItems: "start"}}>
                    <Typography variant="body2" gutterBottom sx={{fontWeight: "bold"}}>
                        Meet your team
                    </Typography>
                    <AvatarGroup total={24}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{bgcolor: deepPurple[500]}}/>
                        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" sx={{bgcolor: deepPurple[500]}}/>
                        <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" sx={{bgcolor: deepPurple[500]}}/>
                        <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg"
                                sx={{bgcolor: deepPurple[500]}}/>
                    </AvatarGroup>
                </Box>
            </StyledProjectCardContentBox>
        </StyledCardPaper>
    );
}

function QuickInfoItem({text, dot, color, chip, data}) {
    return (
        <StyledQuickInfoItem>
            <StyledQuickInfoItemText variant={"body1"}>
                {dot && <InfoDot color={color}/>}
                {text}
            </StyledQuickInfoItemText>
            {chip && <Chip label={data} size="small" sx={{fontSize: "0.6rem"}}/>}
        </StyledQuickInfoItem>
    );
}

function InfoDot({color}) {

    const theme = useTheme();

    return (
        <StyledQuickInfoDot color={color || theme.palette.defaultBlack.dark}>
            &#8226;
        </StyledQuickInfoDot>
    );
}

function ProjectProgress() {
    const splitOn = Math.floor(Math.random() * 101);
    const [open, close] = [splitOn, 100 - splitOn];

    return (
        <StyledProjectProgressBox>
            <Box sx={{height: `${open}%`, backgroundColor: blue["700"]}}>
            </Box>
            <Box sx={{height: `${close}%`, backgroundColor: green["700"]}}>
            </Box>
        </StyledProjectProgressBox>
    );
}

export default ProjectCard;