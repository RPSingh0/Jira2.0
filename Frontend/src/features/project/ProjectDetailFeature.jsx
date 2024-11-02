import {Box, Paper, styled, Typography} from "@mui/material";
import Search from "../../components/search/Search.jsx";
import {FeatureJiraLoadingIndicator} from "../../components/loader/Loader.jsx";
import LoadOrFetchWrapper from "../../components/loader/LoadOrFetchWrapper.jsx";
import {useProjectDetailFeatureContext} from "./ProjectDetailFeatureContext.jsx";
import {grey} from "@mui/material/colors";
import {useNavigate} from "react-router-dom";

const StyledProjectDetailFeature = styled(Box)(() => ({}));

function ProjectDetailFeature() {

    const {loadingProjectFeature, fetchingProjectFeature, projectFeature} = useProjectDetailFeatureContext();

    const navigate = useNavigate();

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
                <Box sx={{marginTop: "2rem", display: "flex", flexDirection: "column", gap: "1rem"}}>
                    {projectFeature?.map(item =>
                        <Paper variant="outlined" key={item.featureKey} sx={{
                            padding: "1rem 0.5rem",
                            transition: "all 0.5s ease",

                            "&:hover": {
                                backgroundColor: grey[200],
                                cursor: "pointer"
                            }
                        }} onClick={() => navigate(`feature/${item.featureKey}`)}>
                            {item.optionText}
                        </Paper>
                    )}
                </Box>
            </LoadOrFetchWrapper>
        </StyledProjectDetailFeature>
    );
}

export default ProjectDetailFeature;