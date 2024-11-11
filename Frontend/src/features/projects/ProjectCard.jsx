import {Avatar, AvatarGroup, Divider, Typography} from "@mui/material";
import {
    StyledCardPaper,
    StyledInfoContentBox,
    StyledInfoText,
    StyledMeetYourTeamBox,
    StyledProjectCardContentBox,
    StyledProjectCardOverviewContainer,
    StyledProjectCardOverviewSection,
    StyledProjectTitle,
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
                <StyledProjectTitle onClick={handleClickOnProjectName}>
                    {name}
                </StyledProjectTitle>
                <Divider flexItem sx={{marginBottom: "1rem"}}/>
                <StyledProjectCardOverviewContainer>
                    <StyledProjectCardOverviewSection>
                        <StyledInfoText variant={"overline"}>
                            Quick Info
                        </StyledInfoText>
                        <StyledInfoContentBox>
                            <InfoItem
                                text={"Open Issues"}
                                data={openIssues}
                            />
                            <InfoItem
                                text={"Done Issues"}
                                data={doneIssues}
                            />
                            <InfoItem
                                text={"Done By You"}
                                data={youWorkedOn}
                            />
                        </StyledInfoContentBox>
                    </StyledProjectCardOverviewSection>

                    <Divider orientation={match ? "horizontal" : "vertical"} flexItem={true}/>

                    {/* Timeline */}
                    <StyledProjectCardOverviewSection>
                        <StyledInfoText variant={"overline"}>
                            Timeline
                        </StyledInfoText>

                        <StyledInfoContentBox>
                            <InfoItem
                                text={"Date Started"}
                                data={dateStarted}
                            />
                            <InfoItem
                                text={"Expected"}
                                data={expectedEndDate}
                            />
                            <InfoItem
                                text={"Days on project"}
                                data={daysSpent}
                            />
                        </StyledInfoContentBox>
                    </StyledProjectCardOverviewSection>
                </StyledProjectCardOverviewContainer>

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