import {Box, Divider, styled, Typography} from "@mui/material";
import {FeatureJiraLoadingIndicator} from "../../../../components/loader/Loader.jsx";
import LoadOrFetchWrapper from "../../../../components/loader/LoadOrFetchWrapper.jsx";
import {useProjectDetailFeatureContext} from "../../context/ProjectDetailFeatureContext.jsx";
import {StyledListContainer} from "../../../../styles/StyledListContainer.jsx";
import FeatureListItem from "../../../../components/feature/FeatureListItem.jsx";

const StyledProjectDetailFeature = styled(Box)(() => ({marginTop: "2rem"}));

function ProjectDetailFeature() {

    const {loadingProjectFeature, fetchingProjectFeature, featureData} = useProjectDetailFeatureContext();

    return (
        <StyledProjectDetailFeature>
            <Typography variant="h6" gutterBottom>
                Features
            </Typography>
            <Divider/>
            <LoadOrFetchWrapper
                loading={loadingProjectFeature}
                fetching={fetchingProjectFeature}
                loader={<FeatureJiraLoadingIndicator/>}>
                <StyledListContainer>
                    {featureData?.features?.map(item =>
                        <FeatureListItem
                            key={item.featureKey}
                            featureKey={item.featureKey}
                            optionText={`${item.featureKey} | ${item.name}`}
                        />
                    )}
                </StyledListContainer>
            </LoadOrFetchWrapper>
        </StyledProjectDetailFeature>
    );
}

export default ProjectDetailFeature;