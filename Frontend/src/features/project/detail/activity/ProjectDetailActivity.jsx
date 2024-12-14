import {useState} from "react";
import {StyledTabButton, StyledTabButtonBox} from "../../../dashboard/workedOnSection/WorkSectionStyles.jsx";
import {IconMap} from "../../../../utils/IconMap.jsx";
import {Tabs} from "@mui/material";
import ProjectDetailActivityTabContainer from "./ProjectDetailActivityTabContainer.jsx";
import ProjectDetailComment from "./ProjectDetailComment.jsx";
import {ProjectDetailCommentContextProvider} from "../../context/ProjectDetailCommentContext.jsx";

function ProjectDetailActivity() {

    const [tab, setTab] = useState(0);

    function handleTabSwitch(_, tabIndexToSwitchTo) {
        setTab(tabIndexToSwitchTo);
    }

    return (
        <>
            <StyledTabButtonBox>
                <Tabs value={tab} onChange={handleTabSwitch} variant={"scrollable"}>
                    <StyledTabButton
                        icon={IconMap['comments']}
                        iconPosition="start"
                        label={"Comments"}
                    />
                    <StyledTabButton
                        icon={IconMap['history']}
                        iconPosition="start"
                        label={"history"}
                    />
                </Tabs>
            </StyledTabButtonBox>
            <ProjectDetailActivityTabContainer value={tab} index={0}>
                <ProjectDetailCommentContextProvider>
                    <ProjectDetailComment/>
                </ProjectDetailCommentContextProvider>
            </ProjectDetailActivityTabContainer>
        </>
    );
}

export default ProjectDetailActivity;