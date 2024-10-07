import {Box, Divider, styled} from "@mui/material";
import {ToolbarItems} from "./ToolbarItems.jsx";
import React from 'react';

const StyledEditorToolbarBox = styled(Box)(() => ({
    display: 'flex',
    flexDirection: "row",
    flexWrap: "wrap",
    gap: '0.5rem',
    paddingBottom: "0.3rem",
    borderBottom: '1px solid lightgray',

    "& div[role='separator']:last-of-type": {
        display: 'none'
    },

    "& svg": {
        width: "1.2rem",
    }
}))

function EditorToolbar({editor}) {
    return (
        <StyledEditorToolbarBox>
            {
                ToolbarItems.map((Item, index) =>
                    <React.Fragment key={index}>
                        <Item editor={editor}/>
                        <Divider orientation={"vertical"} variant={"middle"} flexItem={true}/>
                    </React.Fragment>
                )
            }
        </StyledEditorToolbarBox>
    )
}

export default EditorToolbar;