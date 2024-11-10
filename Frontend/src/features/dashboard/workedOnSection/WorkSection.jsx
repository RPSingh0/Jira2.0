import {Tabs} from "@mui/material";
import {useState} from "react";
import {IconMap} from "../../../utils/IconMap.jsx";
import WorkedOnTab from "./workedOnTabSection/WorkedOnTab.jsx";
import StoriesTab from "./storiesTabSection/StoriesTab.jsx";
import BugsTab from "./bugsTabSection/BugsTab.jsx";
import {StyledTabButton, StyledTabButtonBox, StyledWorkedOnSectionBox} from "./WorkSectionStyles.jsx";
import {TabContentContainer} from "./WorkSectionComponents.jsx";
import {WorkedOnSectionContextProvider} from "./WorkedOnSectionContext.jsx";

function WorkSection() {

    const [tab, setTab] = useState(0);

    function handleTabSwitch(_, tabIndexToSwitchTo) {
        setTab(tabIndexToSwitchTo);
    }

    return (
        <StyledWorkedOnSectionBox>
            <StyledTabButtonBox>
                <Tabs value={tab} onChange={handleTabSwitch} variant={"scrollable"}>
                    <StyledTabButton
                        icon={IconMap['work']}
                        iconPosition="start"
                        label={"Worked On"}
                    />
                    <StyledTabButton
                        icon={IconMap['userStory']}
                        iconPosition="start"
                        label={"Stories"}
                    />
                    <StyledTabButton
                        icon={IconMap['bug']}
                        iconPosition="start"
                        label="Bugs"
                    />
                </Tabs>
            </StyledTabButtonBox>
            <WorkedOnSectionContextProvider activeTab={tab}>
                <TabContentContainer value={tab} index={0}>
                    <WorkedOnTab/>
                </TabContentContainer>
                <TabContentContainer value={tab} index={1}>
                    <StoriesTab/>
                </TabContentContainer>
                <TabContentContainer value={tab} index={2}>
                    <BugsTab/>
                </TabContentContainer>
            </WorkedOnSectionContextProvider>
        </StyledWorkedOnSectionBox>
    );
}

export default WorkSection;