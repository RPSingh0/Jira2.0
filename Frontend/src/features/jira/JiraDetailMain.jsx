import useDefaultEditor from "../../components/editor/useDefaultEditor.js";
import TextEditor from "../../components/editor/Editor.jsx";
import {useEffect, useState} from "react";
import {useUpdateJiraDescription} from "./hooks/useUpdateJiraDescription.js";
import {useQueryClient} from "@tanstack/react-query";
import {ContainedButton, OutlinedButton} from "../../components/button/Buttons.jsx";
import {useJiraDetailContext} from "./JiraDetailContext.jsx";
import {
    StyledEditingSaveAndCancelBox,
    StyledProjectDetailDescriptionBox,
    StyledProjectDetailMainSectionBox
} from "./JiraDetailStyles.jsx";
import {Box} from "@mui/material";
import JiraDetailSummary from "./JiraDetailSummary.jsx";


function JiraDetailMain() {

    // Contexts
    const {jiraKey, loadingJiraDetail, fetchingJiraDetail, jiraDetailData} = useJiraDetailContext();

    // Local states
    const {editingOn, editingOff} = useDefaultEditor(undefined);
    const [isEditing, setIsEditing] = useState(false);

    // React query hooks
    const {updateJiraDescription} = useUpdateJiraDescription();
    const queryClient = useQueryClient();

    // Effects
    useEffect(() => {
        if (!loadingJiraDetail && !fetchingJiraDetail) {
            editingOn.commands.setContent(jiraDetailData.data.jiraDetails.description);
            editingOff.commands.setContent(jiraDetailData.data.jiraDetails.description);
        }
    }, [loadingJiraDetail, fetchingJiraDetail]);

    // handler functions
    function handleSaveDescription() {
        updateJiraDescription({
            jiraKey: jiraKey,
            description: editingOn.getHTML()
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries([`${jiraKey}`])
                setIsEditing(false)
            }
        });
    }

    function handleDoubleClickOnDescriptionBox() {

        if (isEditing) {
            return;
        }

        setIsEditing(true);
    }

    return (
        <StyledProjectDetailMainSectionBox>
            <JiraDetailSummary/>
            <Box>

                {/* Description Box */}
                <StyledProjectDetailDescriptionBox
                    onDoubleClick={handleDoubleClickOnDescriptionBox}>
                    {isEditing ?
                        <TextEditor editor={editingOn} height={"min-content"}/>
                        :
                        <TextEditor editor={editingOff} height={"min-content"}/>
                    }
                </StyledProjectDetailDescriptionBox>

                {/* Button Save and Cancel */}
                {isEditing &&
                    <StyledEditingSaveAndCancelBox>
                        <ContainedButton text={"Save"} onClickHandler={handleSaveDescription}/>
                        <OutlinedButton text={"Cancel"} onClickHandler={() => setIsEditing(false)}/>
                    </StyledEditingSaveAndCancelBox>
                }
            </Box>
        </StyledProjectDetailMainSectionBox>
    );
}

export default JiraDetailMain;