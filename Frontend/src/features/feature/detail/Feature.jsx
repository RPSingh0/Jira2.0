import {FeatureContextProvider} from "../context/FeatureContext.jsx";
import Name from "./Name.jsx";
import Description from "./Description.jsx";
import Jira from "./jira/Jira.jsx";
import {JiraContextProvider} from "../context/JiraContext.jsx";
import {StyledFeatureDetailBox} from "./Styles.jsx";
import Activity from "./activity/Activity.jsx";

function Feature() {

    return (
        <StyledFeatureDetailBox>
            <FeatureContextProvider>
                <Name/>
                <Description/>
            </FeatureContextProvider>
            <JiraContextProvider>
                <Jira/>
            </JiraContextProvider>
            <Activity/>
        </StyledFeatureDetailBox>
    );
}

export default Feature;