import {Tabs} from "@mui/material";
import {useState} from "react";
import {IconMap} from "../../../utils/IconMap.jsx";
import WorkedOnTab from "./workedOnTabSection/WorkedOnTab.jsx";
import {StyledTabButton, StyledTabButtonBox, StyledWorkedOnSectionBox} from "./WorkSectionStyles.jsx";
import {WorkedOnSectionContextProvider} from "./WorkedOnSectionContext.jsx";
import {ColorMap} from "../../../utils/ColorMap.jsx";

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
                        color={ColorMap["workedOn"]}
                    />
                    <StyledTabButton
                        icon={IconMap['userStory']}
                        iconPosition="start"
                        label={"Stories"}
                        color={ColorMap["userStory"]}
                    />
                    <StyledTabButton
                        icon={IconMap['bug']}
                        iconPosition="start"
                        label="Bugs"
                        color={ColorMap["bug"]}
                    />
                </Tabs>
            </StyledTabButtonBox>
            <WorkedOnSectionContextProvider activeTab={tab}>
                <WorkedOnTab/>
            </WorkedOnSectionContextProvider>
        </StyledWorkedOnSectionBox>
    );
}

export default WorkSection;