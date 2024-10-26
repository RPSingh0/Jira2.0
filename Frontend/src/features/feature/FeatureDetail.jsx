import {Box, styled} from "@mui/material";
import {FeatureDetailContextProvider} from "./FeatureDetailContext.jsx";
import FeatureDetailName from "./FeatureDetailName.jsx";
import FeatureDetailDescription from "./FeatureDetailDescription.jsx";
import FeatureDetailJira from "./FeatureDetailJira.jsx";
import {FeatureJiraContextProvider} from "./FeatureDetailJiraContext.jsx";

const StyledFeatureDetailBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: "2rem"
}));

function FeatureDetail() {

    return (
        <StyledFeatureDetailBox>
            <StyledFeatureDetailBox>
                <FeatureDetailContextProvider>
                    <FeatureDetailName/>
                    <FeatureDetailDescription/>
                </FeatureDetailContextProvider>
                <FeatureJiraContextProvider>
                    <FeatureDetailJira/>
                </FeatureJiraContextProvider>
            </StyledFeatureDetailBox>
        </StyledFeatureDetailBox>
    );
}

export default FeatureDetail;