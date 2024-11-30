import {Box, styled, Typography} from "@mui/material";
import {FeatureJiraLoadingIndicator} from "../../../../components/loader/Loader.jsx";
import LoadOrFetchWrapper from "../../../../components/loader/LoadOrFetchWrapper.jsx";
import {useProjectDetailFeatureContext} from "../../context/ProjectDetailFeatureContext.jsx";
import {StyledListContainer} from "../../../../styles/StyledListContainer.jsx";
import FeatureListItem from "../../../../components/feature/FeatureListItem.jsx";
import ViewAllNavigate from "../../../../components/viewAll/ViewAllNavigate.jsx";

const StyledProjectDetailFeature = styled(Box)(() => ({marginTop: "1rem"}));

function ProjectDetailFeature() {

    const {loadingProjectFeature, fetchingProjectFeature, featureData} = useProjectDetailFeatureContext();

    return (
        <StyledProjectDetailFeature>
            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <Typography variant="body1" gutterBottom>
                    Features
                </Typography>
                <ViewAllNavigate text={"view all"} link={"feature"}/>
            </Box>
            <LoadOrFetchWrapper
                loading={loadingProjectFeature}
                fetching={fetchingProjectFeature}
                loader={<FeatureJiraLoadingIndicator/>}>
                <StyledListContainer>
                    {featureData?.feature?.map(item =>
                        <FeatureListItem
                            key={item.featureKey}
                            featureKey={item.featureKey}
                            optionText={`${item.featureKey.toUpperCase()} | ${item.name}`}
                        />
                    )}
                </StyledListContainer>
            </LoadOrFetchWrapper>
        </StyledProjectDetailFeature>
    );
}

export default ProjectDetailFeature;