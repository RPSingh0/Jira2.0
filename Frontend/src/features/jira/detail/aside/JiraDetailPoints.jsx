import {useEffect, useState} from "react";
import {Box} from "@mui/material";
import {useQueryClient} from "@tanstack/react-query";
import {useJiraMetadataContext} from "../../context/JiraMetadataContext.jsx";
import {useUpdateJiraPoints} from "../../hooks/useUpdateJiraPoints.js";
import {Rounded2Half} from "../../../../components/loader/Loader.jsx";
import LoadOrFetchWrapper from "../../../../components/loader/LoadOrFetchWrapper.jsx";
import AsideElementHeading from "../../../../components/heading/AsideElementHeading.jsx";
import OptionEditor from "../../../../components/editor/OptionEditor.jsx";
import StaticText from "../../../../components/text/StaticText.jsx";
import {useWatch} from "react-hook-form";

function JiraDetailPoints() {

    // context states
    const {
        jiraKey,
        loadingJiraMetadata,
        fetchingJiraMetadata,
        jiraMetadata,
        control,
        errors,
        handleSubmit,
        setValue
    } = useJiraMetadataContext();

    // react query hooks
    const queryClient = useQueryClient();
    const {updateJiraPoints, isUpdating} = useUpdateJiraPoints();

    // local states
    const [isEditing, setIsEditing] = useState(false);
    const selectedJiraPoints = useWatch({control: control, name: "jiraPoints"});

    // once the jira metadata is loaded, set the jira point
    useEffect(() => {
        // if jira metadata is loaded
        if (!loadingJiraMetadata && !fetchingJiraMetadata) {
            // set the jira point
            setValue("jiraPoints", jiraMetadata.jiraPoint);
        }
    }, [loadingJiraMetadata, fetchingJiraMetadata]);

    function onSubmit() {
        if (selectedJiraPoints === jiraMetadata.jiraPoint) {
            return;
        }

        updateJiraPoints({
            jiraKey: jiraKey,
            jiraPoint: selectedJiraPoints
        }, {
            onSuccess: () => {
                setIsEditing(false);
                queryClient.invalidateQueries({queryKey: [`${jiraKey}-metadata`]});
            }
        });
    }

    // handler functions
    function handleUpdateJiraPoint() {
        handleSubmit(onSubmit)();
    }

    return (

        <Box>
            <AsideElementHeading text={"Points"}/>
            <LoadOrFetchWrapper
                loading={loadingJiraMetadata}
                fetching={fetchingJiraMetadata}
                loader={<Rounded2Half/>}>
                <OptionEditor
                    name={"jiraPoints"}
                    control={control}
                    placeholder={"Select points"}
                    required={true}
                    requiredMessage={"Please select points"}
                    id={"jiraPoints"}
                    options={[
                        {text: "1", value: 1},
                        {text: "2", value: 2},
                        {text: "3", value: 3},
                        {text: "5", value: 5},
                        {text: "8", value: 8},
                    ]}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    isUpdating={isUpdating}
                    okClickHandler={handleUpdateJiraPoint}
                    disabled={isUpdating}
                    error={!!errors.jiraPoints}
                    helperText={errors.jiraPoints?.message}
                >
                    <StaticText text={jiraMetadata?.jiraPoint}/>
                </OptionEditor>
            </LoadOrFetchWrapper>
        </Box>
    );
}

export default JiraDetailPoints;