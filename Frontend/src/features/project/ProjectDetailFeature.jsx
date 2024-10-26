import {Box, Divider, Paper, styled, Typography} from "@mui/material";

const StyledProjectDetailFeatureBox = styled(Box)(() => ({}));

const StyledProjectDetailFeatureItemBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
}));

const StyledFeatureItemPaper = styled(Paper)(() => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "0.5rem 0.5rem 0.5rem 0.2rem"
}));

function ProjectDetailFeature() {

    return (
        <StyledProjectDetailFeatureBox>
            <Typography variant="body1" gutterBottom>
                Features
            </Typography>
            <StyledProjectDetailFeatureItemBox>
                <FeatureItem/>
                <FeatureItem/>
                <FeatureItem/>
                <FeatureItem/>
                <FeatureItem/>
            </StyledProjectDetailFeatureItemBox>
        </StyledProjectDetailFeatureBox>
    );
}

function FeatureItem() {
    return (
        <StyledFeatureItemPaper variant={"outlined"}>
            <Typography variant={"caption"}>
                FEAT1
            </Typography>
            <Divider orientation={"vertical"} variant={"middle"} flexItem={true}
                     sx={{margin: "0 0.5rem 0 0.5rem"}}/>
            <Typography variant={"body2"}>
                Feature implimentation one
            </Typography>
        </StyledFeatureItemPaper>
    );
}

export default ProjectDetailFeature;