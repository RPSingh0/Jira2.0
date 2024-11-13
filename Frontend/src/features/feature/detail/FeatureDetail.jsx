import {FeatureDetailContextProvider} from "../context/FeatureDetailContext.jsx";
import FeatureDetailName from "./FeatureDetailName.jsx";
import FeatureDetailDescription from "./FeatureDetailDescription.jsx";
import FeatureDetailJira from "./FeatureDetailJira.jsx";
import {FeatureJiraContextProvider} from "./FeatureDetailJiraContext.jsx";
import {StyledFeatureDetailBox} from "./FeatureDetailStyles.jsx";

function FeatureDetail() {

    return (
        <StyledFeatureDetailBox>
                <FeatureDetailContextProvider>
                    <FeatureDetailName/>
                    <FeatureDetailDescription/>
                </FeatureDetailContextProvider>
                <FeatureJiraContextProvider>
                    <FeatureDetailJira/>
                </FeatureJiraContextProvider>
        </StyledFeatureDetailBox>
    );
}

export default FeatureDetail;