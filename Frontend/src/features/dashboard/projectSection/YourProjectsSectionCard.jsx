import {Divider} from "@mui/material";
import {
    StyledCardPaper,
    StyledProjectCardContentBox,
    StyledProjectTitle,
    StyledQuickInfoContentBox,
    StyledQuickInfoText
} from "./YourProjectsSectionCardStyles.jsx";
import {QuickInfoItem} from "./YourProjectsSectionCardComponents.jsx";
import {ProjectProgress} from "../../projects/ProjectCardComponents.jsx";

function ProjectCard({name, openIssues, doneIssues, completionPercentage}) {
    return (
        <StyledCardPaper variant="outlined">
            <ProjectProgress completionPercentage={completionPercentage}/>
            <StyledProjectCardContentBox>
                <StyledProjectTitle variant={"body2"} gutterBottom noWrap>
                    {name}
                </StyledProjectTitle>
                <Divider flexItem sx={{marginBottom: "1rem"}}/>
                <StyledQuickInfoText variant={"overline"}>
                    Quick Info
                </StyledQuickInfoText>
                <StyledQuickInfoContentBox>
                    <QuickInfoItem text={"Open Issues"} data={openIssues} color={"#ff5b31"}/>
                    <QuickInfoItem text={"Done Issues"} data={doneIssues} color={"#57d9a3"}/>
                </StyledQuickInfoContentBox>
            </StyledProjectCardContentBox>
        </StyledCardPaper>
    );
}

export default ProjectCard;