import {Box, styled, Tab, Tabs} from "@mui/material";
import {useState} from "react";
import {IconMap} from "../../utils/IconMap.jsx";
import WorkedOnTab from "./WorkedOnTab.jsx";
import StoriesTab from "./StoriesTab.jsx";
import BugsTab from "./BugsTab.jsx";

const StyledWorkedOnSectionBox = styled(Box)(() => ({
    marginTop: "2rem"
}));

const StyledTabButtonBox = styled(Box)(({theme}) => ({
    borderBottom: "1px solid",
    borderColor: theme.palette.divider
}));

const StyledTabButton = styled(Tab)(() => ({
    minHeight: "3rem",
    fontSize: "0.8rem",

    "& svg": {
        height: "1.2rem"
    }
}));

function WorkSection() {

    const [tab, setTab] = useState(0);

    function handleTabSwitch(_, tabIndexToSwitchTo) {
        setTab(tabIndexToSwitchTo);
    }

    return (
        <StyledWorkedOnSectionBox>
            <StyledTabButtonBox>
                <Tabs value={tab} onChange={handleTabSwitch}>
                    <StyledTabButton icon={IconMap['work']} iconPosition="start" label="Worked On"/>
                    <StyledTabButton icon={IconMap['userStory']} iconPosition="start" label="Stories"/>
                    <StyledTabButton icon={IconMap['bug']} iconPosition="start" label="Bugs"/>
                </Tabs>
            </StyledTabButtonBox>
            <TabContentContainer value={tab} index={0}>
                <WorkedOnTab/>
            </TabContentContainer>
            <TabContentContainer value={tab} index={1}>
                <StoriesTab/>
            </TabContentContainer>
            <TabContentContainer value={tab} index={2}>
                <BugsTab/>
            </TabContentContainer>
        </StyledWorkedOnSectionBox>
    );
}

function TabContentContainer({value, index, children}) {
    return (
        <Box role="tabpanel" hidden={value !== index}>
            {children}
        </Box>
    );
}

export default WorkSection;