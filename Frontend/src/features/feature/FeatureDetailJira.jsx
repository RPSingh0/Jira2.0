import {Box, styled, Typography} from "@mui/material";
import FeatureDetailItemCard from "./FeatureDetailItemCard.jsx";
import Search from "../../components/search/Search.jsx";
import {useFeatureJiraContext} from "./FeatureDetailJiraContext.jsx";
import {FeatureJiraLoadingIndicator} from "../../components/loader/Loader.jsx";
import LoadOrFetchWrapper from "../../components/loader/LoadOrFetchWrapper.jsx";

const StyledFeatureDetailJiraBox = styled(Box)(() => ({}));

function FeatureDetailJira() {

    const {loadingFeatureJira, fetchingFeatureJira, featureJira,} = useFeatureJiraContext();

    return (
        <StyledFeatureDetailJiraBox>
            <Typography variant="body1" gutterBottom>
                Jiras
            </Typography>
            <LoadOrFetchWrapper
                loading={loadingFeatureJira}
                fetching={fetchingFeatureJira}
                loader={<FeatureJiraLoadingIndicator/>}>

                <Search placeholder={"Search"}/>
                <Box sx={{marginTop: "2rem", display: "flex", flexDirection: "column", gap: "1rem"}}>
                    {featureJira?.map(item =>
                        <FeatureDetailItemCard
                            key={item.jiraKey}
                            type={item.jiraType}
                            jiraKey={item.jiraKey}
                            title={item.summary}
                            user={item.userAssignedToName}
                            status={item.statusType.toLowerCase()}
                            priority={"high"}
                        />)}
                </Box>
            </LoadOrFetchWrapper>
        </StyledFeatureDetailJiraBox>
    )
        ;
}

export default FeatureDetailJira;