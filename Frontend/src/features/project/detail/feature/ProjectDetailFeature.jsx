import {Box, styled, Typography} from "@mui/material";
import Search from "../../../../components/search/Search.jsx";
import {FeatureJiraLoadingIndicator} from "../../../../components/loader/Loader.jsx";
import LoadOrFetchWrapper from "../../../../components/loader/LoadOrFetchWrapper.jsx";
import {useProjectDetailFeatureContext} from "../../context/ProjectDetailFeatureContext.jsx";
import {StyledListContainer} from "../../../../styles/StyledListContainer.jsx";
import FeatureListItem from "../../../../components/feature/FeatureListItem.jsx";

const StyledProjectDetailFeature = styled(Box)(() => ({marginTop: "1rem"}));

function ProjectDetailFeature() {

    const {loadingProjectFeature, fetchingProjectFeature, projectFeature} = useProjectDetailFeatureContext();

    return (
        <StyledProjectDetailFeature>
            <Typography variant="body1" gutterBottom>
                Features
            </Typography>
            <LoadOrFetchWrapper
                loading={loadingProjectFeature}
                fetching={fetchingProjectFeature}
                loader={<FeatureJiraLoadingIndicator/>}>
                <Search placeholder={"Search"}/>
                <StyledListContainer>
                    {projectFeature?.map(item =>
                        <FeatureListItem
                            key={item.featureKey}
                            featureKey={item.featureKey}
                            optionText={item.optionText}
                        />
                    )}
                </StyledListContainer>
            </LoadOrFetchWrapper>
        </StyledProjectDetailFeature>
    );
}

export default ProjectDetailFeature;