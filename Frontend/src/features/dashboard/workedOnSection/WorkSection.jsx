import {Tabs} from "@mui/material";
import {useState} from "react";
import {IconMap} from "../../../utils/IconMap.jsx";
import WorkedOnTab from "./workedOnTabSection/WorkedOnTab.jsx";
import {StyledTabButton, StyledTabButtonBox, StyledWorkedOnSectionBox} from "./WorkSectionStyles.jsx";
import {WorkedOnSectionContextProvider} from "./WorkedOnSectionContext.jsx";
import {ColorMap} from "../../../utils/ColorMap.js";

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
                        color={ColorMap["ALL"]}
                    />
                    <StyledTabButton
                        icon={IconMap['STORY']}
                        iconPosition="start"
                        label={"Stories"}
                        color={ColorMap["STORY"]}
                    />
                    <StyledTabButton
                        icon={IconMap['BUG']}
                        iconPosition="start"
                        label="Bugs"
                        color={ColorMap["BUG"]}
                    />
                    <StyledTabButton
                        icon={IconMap['TASK']}
                        iconPosition="start"
                        label={"Tasks"}
                        color={ColorMap["TASK"]}
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