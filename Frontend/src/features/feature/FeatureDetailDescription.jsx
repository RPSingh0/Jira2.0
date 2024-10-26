import {Box} from "@mui/material";
import TextEditor from "../../components/editor/Editor.jsx";
import useDefaultEditor from "../../components/editor/useDefaultEditor.js";
import {useEffect, useState} from "react";
import {DescriptionLoadingIndicator} from "../../components/loader/Loader.jsx";
import LoadOrFetchWrapper from "../../components/loader/LoadOrFetchWrapper.jsx";
import {StyledEditingSaveAndCancelBox} from "../jira/JiraDetailStyles.jsx";
import {ContainedButton, OutlinedButton} from "../../components/button/Buttons.jsx";
import {FeatureDetailContextProvider, useFeatureDetailContext} from "./FeatureDetailContext.jsx";
import {useUpdateFeatureDescription} from "./hooks/useUpdateFeatureDescription.js";
import {useQueryClient} from "@tanstack/react-query";

function FeatureDetailDescription() {

    // Contexts
    const {loadingFeatureDetail, fetchingFeatureDetail, featureDetail} = useFeatureDetailContext();

    // Local states
    const {editingOn, editingOff} = useDefaultEditor(undefined);
    const [isEditing, setIsEditing] = useState(false);

    // React query hooks
    const {updateFeatureDescription} = useUpdateFeatureDescription();
    const queryClient = useQueryClient();

    function handleDoubleClickOnDescriptionBox() {
        if (isEditing) {
            return;
        }
        setIsEditing(true);
    }

    // Effects
    useEffect(() => {
        if (!loadingFeatureDetail && !fetchingFeatureDetail) {
            editingOn.commands.setContent(featureDetail.description);
            editingOff.commands.setContent(featureDetail.description);
        }
    }, [loadingFeatureDetail, fetchingFeatureDetail]);

    // handler functions
    function handleSaveDescription() {
        updateFeatureDescription({
            projectKey: featureDetail.projectKey,
            featureKey: featureDetail.featureKey,
            description: editingOn.getHTML()
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: [`${featureDetail.featureKey}-detail`]})
                setIsEditing(false)
            }
        });
    }

    return (
        <FeatureDetailContextProvider>
            <LoadOrFetchWrapper
                loading={loadingFeatureDetail}
                fetching={fetchingFeatureDetail}
                loader={<DescriptionLoadingIndicator/>}>
                <Box onDoubleClick={handleDoubleClickOnDescriptionBox}>
                    {isEditing ?
                        <TextEditor editor={editingOn} height={"min-content"}/>
                        :
                        <TextEditor editor={editingOff} height={"min-content"}/>
                    }
                    {/* Button Save and Cancel */}
                    <Box sx={{marginTop: "1rem"}}>
                        {isEditing &&
                            <StyledEditingSaveAndCancelBox>
                                <ContainedButton text={"Save"} onClickHandler={handleSaveDescription}/>
                                <OutlinedButton text={"Cancel"} onClickHandler={() => setIsEditing(false)}/>
                            </StyledEditingSaveAndCancelBox>
                        }
                    </Box>
                </Box>
            </LoadOrFetchWrapper>
        </FeatureDetailContextProvider>
    );
}

export default FeatureDetailDescription;