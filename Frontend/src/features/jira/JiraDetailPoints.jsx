import {useEffect, useState} from "react";
import {Box, IconButton, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";
import {IconMap} from "../../utils/IconMap.jsx";
import {toast} from "react-toastify";
import {useQueryClient} from "@tanstack/react-query";
import {useJiraMetadataContext} from "./JiraMetadataContext.jsx";
import {useUpdateJiraPoints} from "./hooks/useUpdateJiraPoints.js";
import InputSelectField from "../../components/input/InputSelectField.jsx";

function JiraDetailPoints() {

    // context states
    const {
        jiraKey,
        loadingJiraMetadata,
        fetchingJiraMetadata,
        jiraMetadata,
        errorJiraMetadata
    } = useJiraMetadataContext();

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
            setJiraPoint(jiraMetadata.data.jiraMetadata.jiraPoint);
        }
    }, [loadingJiraMetadata, fetchingJiraMetadata]);

    // handler functions
    function handleUpdateJiraPoint() {

        if (!jiraPoint) {
            toast.error('Please select a point');
            return;
        }

        if (jiraPoint === jiraMetadata.data.jiraMetadata.jiraPoint) {
            return;
        }

        updateJiraPoints({
            jiraKey: jiraKey,
            jiraPoint: jiraPoint
        }, {
            onSuccess: () => {
                setIsEditing(false);
                queryClient.invalidateQueries([`${jiraKey}-metadata`]);
            }
        });
    }

    return (

        <Box>
            <Typography variant="overline" gutterBottom sx={{paddingLeft: "0.5rem"}}>
                Points
            </Typography>
            {isEditing ?
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "end",
                    gap: "0.5rem"
                }}>
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
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "0.5rem"
                    }}>
                        <IconButton size={"small"} disableFocusRipple disableTouchRipple sx={{
                            borderRadius: "9px"
                        }} onClick={handleUpdateJiraPoint}>
                            {IconMap['save']}
                        </IconButton>
                        <IconButton size={"small"} disableFocusRipple disableTouchRipple sx={{
                            borderRadius: "9px"
                        }} onClick={() => setIsEditing(false)}>
                            {IconMap['close']}
                        </IconButton>
                    </Box>
                </Box>
                :
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "0.5rem",
                    borderRadius: "9px",
                    transition: "background-color 0.2s ease",

                    "&:hover": {
                        backgroundColor: grey["200"]
                    }
                }} onDoubleClick={() => setIsEditing(true)}>
                    <Typography variant="body1">
                        {jiraMetadata?.data.jiraMetadata.jiraPoint}
                    </Typography>
                </Box>
            }
        </Box>
    );
}

export default JiraDetailPoints;