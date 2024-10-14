import {Divider} from "@mui/material";
import {
    StyledCardPaper,
    StyledProjectCardContentBox,
    StyledProjectProgressBox,
    StyledProjectTitle,
    StyledQuickInfoContentBox,
    StyledQuickInfoText
} from "./YourProjectsSectionCardStyles.jsx";
import {QuickInfoItem} from "./YourProjectsSectionCardComponents.jsx";

function ProjectCard() {
    return (
        <StyledCardPaper variant="outlined">
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

export default ProjectCard;