import {Avatar, AvatarGroup, Divider, Typography, useMediaQuery, useTheme} from "@mui/material";
import {blue, deepPurple, green, orange} from "@mui/material/colors";
import {
    StyledCardPaper,
    StyledInfoContentBox,
    StyledInfoText,
    StyledMeetYourTeamBox,
    StyledProjectCardContentBox,
    StyledProjectCardInfoContainer,
    StyledProjectTitle,
    StyledQuickInfoAndTimeLineBox,
} from "./ProjectCardStyles.jsx";
import {InfoItem, ProjectProgress} from "./ProjectCardComponents.jsx";

function ProjectCard() {

    const theme = useTheme();
    const match = useMediaQuery(theme.breakpoints.down('c500'));

    return (
        <StyledCardPaper elevation={2} variant={"outlined"}>

            <ProjectProgress/>

            <StyledProjectCardContentBox>
                <StyledProjectTitle variant={"subtitle1"} gutterBottom noWrap>
                    My First Project
                </StyledProjectTitle>

                <Divider flexItem sx={{marginBottom: "1rem"}}/>

                {/* Quick Info and Timeline */}
                <StyledQuickInfoAndTimeLineBox>
                    {/* Quick info */}
                    <StyledProjectCardInfoContainer>
                        <StyledInfoText variant={"overline"}>
                            Quick Info
                        </StyledInfoText>
                        <StyledInfoContentBox>
                            <InfoItem
                                text={"Open Issues"}
                                data={5}
                                dot={true}
                                color={blue["700"]}
                                chip={true}
                            />
                            <InfoItem
                                text={"Done Issues"}
                                data={198}
                                dot={true}
                                color={green["700"]}
                                chip={true}
                            />
                            <InfoItem
                                text={"Done By You"}
                                data={198}
                                dot={true}
                                color={orange["700"]}
                                chip={true}
                            />
                        </StyledInfoContentBox>
                    </StyledProjectCardInfoContainer>

                    <Divider orientation={match ? "horizontal" : "vertical"} flexItem={true}/>

                    {/* Timeline */}
                    <StyledProjectCardInfoContainer>
                        <StyledInfoText variant={"overline"}>
                            Timeline
                        </StyledInfoText>

                        <StyledInfoContentBox>
                            <InfoItem
                                text={"Date Started"}
                                dot={true} chip={true}
                                data={new Date().toLocaleDateString()}
                            />
                            <InfoItem
                                text={"Expected"}
                                dot={true}
                                chip={true}
                                data={new Date().toLocaleDateString()}
                            />
                            <InfoItem
                                text={"Days on project"}
                                dot={true}
                                chip={true}
                                data={365}
                            />
                        </StyledInfoContentBox>
                    </StyledProjectCardInfoContainer>
                </StyledQuickInfoAndTimeLineBox>

                <Divider flexItem sx={{marginBottom: "1rem", marginTop: "1rem"}}/>

                <StyledMeetYourTeamBox>
                    <Typography variant="body2" gutterBottom sx={{fontWeight: "bold"}}>
                        Meet your team
                    </Typography>

                    <AvatarGroup total={24}>
                        <Avatar
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                            sx={{bgcolor: deepPurple[500]}}
                        />
                        <Avatar
                            alt="Travis Howard"
                            src="/static/images/avatar/2.jpg"
                            sx={{bgcolor: deepPurple[500]}}
                        />
                        <Avatar
                            alt="Agnes Walker"
                            src="/static/images/avatar/4.jpg"
                            sx={{bgcolor: deepPurple[500]}}
                        />
                        <Avatar
                            alt="Trevor Henderson"
                            src="/static/images/avatar/5.jpg"
                            sx={{bgcolor: deepPurple[500]}}
                        />
                    </AvatarGroup>
                </StyledMeetYourTeamBox>
            </StyledProjectCardContentBox>
        </StyledCardPaper>
    );
}

export default ProjectCard;