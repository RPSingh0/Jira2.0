import {Box} from "@mui/material";
import useDefaultEditor from "../../components/editor/useDefaultEditor.js";
import TextEditor from "../../components/editor/Editor.jsx";
import {DescriptionLoadingIndicator} from "../../components/loader/Loader.jsx";
import {StyledEditingSaveAndCancelBox} from "../jira/JiraDetailStyles.jsx";
import {ContainedButton, OutlinedButton} from "../../components/button/Buttons.jsx";
import LoadOrFetchWrapper from "../../components/loader/LoadOrFetchWrapper.jsx";
import {useProjectDetailContext} from "./ProjectDetailContext.jsx";
import {useEffect, useState} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {useUpdateProjectDescription} from "./hooks/useUpdateProjectDescription.js";

function ProjectDetailDescription() {

    // contexts
    const {loadingProjectDetail, fetchingProjectDetail, projectDetail} = useProjectDetailContext();

    // Local states
    const {editingOn, editingOff} = useDefaultEditor(undefined);
    const [isEditing, setIsEditing] = useState(false);

    // React query hooks
    const {updateProjectDescription} = useUpdateProjectDescription();
    const queryClient = useQueryClient();

    function handleDoubleClickOnDescriptionBox() {
        if (isEditing) {
            return;
        }
        setIsEditing(true);
    }

    // Effects
    useEffect(() => {
        if (!loadingProjectDetail && !fetchingProjectDetail) {
            editingOn.commands.setContent(projectDetail.description);
            editingOff.commands.setContent(projectDetail.description);
        }
    }, [loadingProjectDetail, fetchingProjectDetail]);

    // handler functions
    function handleSaveDescription() {
        updateProjectDescription({
            projectKey: projectDetail.projectKey,
            description: editingOn.getHTML()
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: [`${projectDetail.projectKey}-detail`]})
                setIsEditing(false)
            }
        });
    }

    return (
        <LoadOrFetchWrapper
            loading={loadingProjectDetail}
            fetching={fetchingProjectDetail}
            loader={<DescriptionLoadingIndicator/>}>
            <Box onDoubleClick={handleDoubleClickOnDescriptionBox}>
                {isEditing ?
                    <TextEditor editor={editingOn} height={"min-content"}/>
                    :
                    <TextEditor editor={editingOff} height={"min-content"}/>
                }
                {/* Button Save and Cancel */}
                <Box sx={{marginTop: "1rem", marginBottom: "1rem"}}>
                    {isEditing &&
                        <StyledEditingSaveAndCancelBox>
                            <ContainedButton text={"Save"} onClickHandler={handleSaveDescription}/>
                            <OutlinedButton text={"Cancel"} onClickHandler={() => setIsEditing(false)}/>
                        </StyledEditingSaveAndCancelBox>
                    }
                </Box>
            </Box>
        </LoadOrFetchWrapper>
    );
}

export default ProjectDetailDescription;