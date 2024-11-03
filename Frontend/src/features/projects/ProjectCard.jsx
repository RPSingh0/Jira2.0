import {Avatar, AvatarGroup, Divider, Typography, useMediaQuery, useTheme} from "@mui/material";
import {blue, green, orange} from "@mui/material/colors";
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
import {useNavigate} from "react-router-dom";

function ProjectCard({
                         name,
                         projectKey,
                         openIssues,
                         doneIssues,
                         youWorkedOn,
                         dateStarted,
                         expectedEndDate,
                         daysSpent,
                         completionPercentage,
                         team
                     }) {

    const theme = useTheme();
    const match = useMediaQuery(theme.breakpoints.down('c500'));
    const navigate = useNavigate();

    // handler functions
    function handleClickOnProjectName() {
        navigate(`/project/${projectKey}`)
    }

    return (
        <StyledCardPaper variant="outlined">
            <ProjectProgress completionPercentage={completionPercentage}/>

            <StyledProjectCardContentBox>
                <StyledProjectTitle variant={"subtitle1"} gutterBottom noWrap onClick={handleClickOnProjectName}>
                    {name}
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
                                data={openIssues}
                                dot={true}
                                color={blue["700"]}
                                chip={true}
                            />
                            <InfoItem
                                text={"Done Issues"}
                                data={doneIssues}
                                dot={true}
                                color={green["700"]}
                                chip={true}
                            />
                            <InfoItem
                                text={"Done By You"}
                                data={youWorkedOn}
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
                                data={dateStarted}
                            />
                            <InfoItem
                                text={"Expected"}
                                dot={true}
                                chip={true}
                                data={expectedEndDate}
                            />
                            <InfoItem
                                text={"Days on project"}
                                dot={true}
                                chip={true}
                                data={daysSpent}
                            />
                        </StyledInfoContentBox>
                    </StyledProjectCardInfoContainer>
                </StyledQuickInfoAndTimeLineBox>

                <Divider flexItem sx={{marginBottom: "1rem", marginTop: "1rem"}}/>
                {team?.length > 0 &&
                    <StyledMeetYourTeamBox>
                        <Typography variant="body2" gutterBottom sx={{fontWeight: "bold"}}>
                            Meet your team
                        </Typography>
                        <AvatarGroup total={team.length}>
                            {team.map(member => <Avatar
                                key={member.email}
                                alt={member.name}
                                src={member.profileImage}
                            />)}
                        </AvatarGroup>
                    </StyledMeetYourTeamBox>
                }
            </StyledProjectCardContentBox>
        </StyledCardPaper>
    );
}

export default ProjectCard;