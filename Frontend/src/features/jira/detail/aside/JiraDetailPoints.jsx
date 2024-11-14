import {useEffect, useState} from "react";
import {Box} from "@mui/material";
import {toast} from "react-toastify";
import {useQueryClient} from "@tanstack/react-query";
import {useJiraMetadataContext} from "../../context/JiraMetadataContext.jsx";
import {useUpdateJiraPoints} from "../../hooks/useUpdateJiraPoints.js";
import {Rounded2Half} from "../../../../components/loader/Loader.jsx";
import LoadOrFetchWrapper from "../../../../components/loader/LoadOrFetchWrapper.jsx";
import AsideElementHeading from "../../../../components/heading/AsideElementHeading.jsx";
import OptionEditor from "../../../../components/editor/OptionEditor.jsx";
import StaticText from "../../../../components/text/StaticText.jsx";

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
            <AsideElementHeading text={"Points"}/>
            <LoadOrFetchWrapper
                loading={loadingJiraMetadata}
                fetching={fetchingJiraMetadata}
                loader={<Rounded2Half/>}>
                <OptionEditor
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    isUpdating={isUpdating}
                    name={"jiraPoint"}
                    value={jiraPoint}
                    setValue={setJiraPoint}
                    options={[
                        {text: "1", value: 1},
                        {text: "2", value: 2},
                        {text: "3", value: 3},
                        {text: "5", value: 5},
                        {text: "8", value: 8},
                    ]}
                    okClickHandler={handleUpdateJiraPoint}
                >
                    <StaticText text={jiraMetadata?.jiraPoint}/>
                </OptionEditor>
            </LoadOrFetchWrapper>
        </Box>
    );
}

export default JiraDetailPoints;