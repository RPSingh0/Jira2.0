import {useEffect, useState} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {useJiraDetailContext} from "./JiraDetailContext.jsx";
import {Box, TextField, Typography} from "@mui/material";
import {useUpdateJiraSummary} from "./hooks/useUpdateJiraSummary.js";
import {StyledEditingSaveAndCancelBox} from "./JiraDetailStyles.jsx";
import {ContainedButton, OutlinedButton} from "../../components/button/Buttons.jsx";


function JiraDetailSummary() {

    // Contexts
    const {jiraKey, loadingJiraDetail, fetchingJiraDetail, jiraDetailData} = useJiraDetailContext();

    // Local states
    const [summary, setSummary] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    // React query hooks
    const {updateJiraSummary} = useUpdateJiraSummary();
    const queryClient = useQueryClient();

    // Effects
    useEffect(() => {
        if (!loadingJiraDetail && !fetchingJiraDetail) {
            setSummary(jiraDetailData.data.jiraDetails.summary)
        }
    }, [loadingJiraDetail, fetchingJiraDetail]);

    // handler functions
    function handleSaveSummary() {
        updateJiraSummary({
            jiraKey: jiraKey,
            summary: summary,
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries([jiraKey])
                setIsEditing(false)
            }
        });
    }

    function handleDoubleClickOnSummaryBox() {
        if (isEditing) {
            return;
        }
        setIsEditing(true);
    }

    return (
        <Box onDoubleClick={handleDoubleClickOnSummaryBox}>
            {isEditing ?
                <Box>
                    <TextField
                        fullWidth={true}
                        multiline
                        maxRows={2}
                        value={summary}
                        onChange={(event) => setSummary(event.target.value)}
                    />
                    {isEditing &&
                        <StyledEditingSaveAndCancelBox>
                            <ContainedButton text={"Save"} onClickHandler={handleSaveSummary}/>
                            <OutlinedButton text={"Cancel"} onClickHandler={() => setIsEditing(false)}/>
                        </StyledEditingSaveAndCancelBox>
                    }
                </Box>
                :
                <Typography variant="h5" gutterBottom>
                    {!loadingJiraDetail && jiraDetailData.data.jiraDetails.summary}
                </Typography>
            }
        </Box>

    );
}

export default JiraDetailSummary;