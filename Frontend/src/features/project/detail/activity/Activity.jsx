import {useState} from "react";
import {IconMap} from "../../../../utils/IconMap.jsx";
import {Tabs} from "@mui/material";
import ActivityTab from "./ActivityTab.jsx";
import Comment from "./comments/Comment.jsx";
import {CommentContextProvider} from "../../context/CommentContext.jsx";
import {StyledTabButton, StyledTabButtonBox} from "../../../../styles/StyledTabButton.jsx";

function Activity() {

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
            <ActivityTab value={tab} index={0}>
                <CommentContextProvider>
                    <Comment/>
                </CommentContextProvider>
            </ActivityTab>
        </>
    );
}

export default Activity;