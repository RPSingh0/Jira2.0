import {Avatar, AvatarGroup, Divider, Typography} from "@mui/material";
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
import {InfoItem} from "./ProjectCardComponents.jsx";
import {useNavigate} from "react-router-dom";
import {ProjectProgress} from "../../components/progress/projectProgressBar.jsx";
import useMatchBreakpointDown from "../../hooks/useMatchBreakpointDown.js";

function ProjectCard({
                         name, projectKey, openIssues, doneIssues, youWorkedOn, dateStarted, expectedEndDate, daysSpent,
                         completionPercentage, team
                     }) {

    const match = useMatchBreakpointDown('c500')
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
                                chip={true}
                            />
                            <InfoItem
                                text={"Done Issues"}
                                data={doneIssues}
                                chip={true}
                            />
                            <InfoItem
                                text={"Done By You"}
                                data={youWorkedOn}
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
                                chip={true}
                                data={dateStarted}
                            />
                            <InfoItem
                                text={"Expected"}
                                chip={true}
                                data={expectedEndDate}
                            />
                            <InfoItem
                                text={"Days on project"}
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