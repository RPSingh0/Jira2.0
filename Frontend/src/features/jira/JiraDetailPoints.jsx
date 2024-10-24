import {useEffect, useState} from "react";
import {Box, Typography} from "@mui/material";
import {toast} from "react-toastify";
import {useQueryClient} from "@tanstack/react-query";
import {useJiraMetadataContext} from "./JiraMetadataContext.jsx";
import {useUpdateJiraPoints} from "./hooks/useUpdateJiraPoints.js";
import InputSelectField from "../../components/input/InputSelectField.jsx";
import {Rounded2Half} from "../../components/loader/Loader.jsx";
import LoadOrFetchWrapper from "../../components/loader/LoadOrFetchWrapper.jsx";
import {
    StyledAutoCompleteWithButtonBox,
    StyledItemValueStaticBox,
    StyledOkCancelPaperButtonBox
} from "./JiraDetailAsideStyles.jsx";
import {PaperCancelButton, PaperOkButton} from "./JiraDetailAsideComponents.jsx";

function JiraDetailPoints() {

    // context states
    const {jiraKey, loadingJiraMetadata, fetchingJiraMetadata, jiraMetadata} = useJiraMetadataContext();

    // react query hooks
    const queryClient = useQueryClient();
    const {updateJiraPoints, isUpdating} = useUpdateJiraPoints();

    // local states
    const [jiraPoint, setJiraPoint] = useState(0);
    const [isEditing, setIsEditing] = useState(false);

    // once the jira metadata is loaded, set the jira point
    useEffect(() => {
        // if jira metadata is loaded
        if (!loadingJiraMetadata && !fetchingJiraMetadata) {
            // set the jira point
            setJiraPoint(jiraMetadata.jiraPoint);
        }
    }, [loadingJiraMetadata, fetchingJiraMetadata]);

    // handler functions
    function handleUpdateJiraPoint() {

        if (!jiraPoint) {
            toast.error('Please select a point');
            return;
        }

        if (jiraPoint === jiraMetadata.jiraPoint) {
            return;
        }

        updateJiraPoints({
            jiraKey: jiraKey,
            jiraPoint: jiraPoint
        }, {
            onSuccess: () => {
                setIsEditing(false);
                queryClient.invalidateQueries({queryKey: [`${jiraKey}-metadata`]});
            }
        });
    }

    return (

        <Box>
            <Typography variant="overline" gutterBottom sx={{paddingLeft: "0.5rem"}}>
                Points
            </Typography>
            <LoadOrFetchWrapper
                loading={loadingJiraMetadata}
                fetching={fetchingJiraMetadata}
                loader={<Rounded2Half/>}>
                {isEditing ?
                    <StyledAutoCompleteWithButtonBox>
                        <InputSelectField
                            name={"jiraPoint"}
                            value={jiraPoint}
                            onChange={(event) => setJiraPoint(event.target.value)}
                            options={[
                                {text: "1", value: 1},
                                {text: "2", value: 2},
                                {text: "3", value: 3},
                                {text: "5", value: 5},
                                {text: "8", value: 8},
                            ]}
                        />
                        <StyledOkCancelPaperButtonBox>
                            <PaperOkButton onClickHandler={handleUpdateJiraPoint} disabled={isUpdating}/>
                            <PaperCancelButton onClickHandler={() => setIsEditing(false)} disabled={isUpdating}/>
                        </StyledOkCancelPaperButtonBox>
                    </StyledAutoCompleteWithButtonBox>
                    :
                    <StyledItemValueStaticBox onDoubleClick={() => setIsEditing(true)}>
                        <Typography variant="body1">
                            {jiraMetadata?.jiraPoint}
                        </Typography>
                    </StyledItemValueStaticBox>
                }
            </LoadOrFetchWrapper>
        </Box>
    );
}

export default JiraDetailPoints;