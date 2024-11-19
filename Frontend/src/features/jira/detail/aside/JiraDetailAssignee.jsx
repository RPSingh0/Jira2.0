import useGetQueryHook from "../../../../queryHooks/useGetQueryHook.js";
import {getAllUsersService} from "../../../../services/user/userService.js";
import {useEffect, useState} from "react";
import {Box} from "@mui/material";
import {useUpdateJiraAssignee} from "../../hooks/useUpdateJiraAssignee.js";
import {useQueryClient} from "@tanstack/react-query";
import {useJiraMetadataContext} from "../../context/JiraMetadataContext.jsx";
import LoadOrFetchWrapper from "../../../../components/loader/LoadOrFetchWrapper.jsx";
import {Rounded2Half} from "../../../../components/loader/Loader.jsx";
import AutocompleteAssign from "../../../../components/autocompleteAssign/AutocompleteAssign.jsx";
import {StaticAvatarAndText} from "../../../../components/avatar/StaticAvatarAndText.jsx";
import AsideElementHeading from "../../../../components/heading/AsideElementHeading.jsx";
import {useWatch} from "react-hook-form";

function JiraDetailAssignee() {

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
    const {updateJiraAssignee, isUpdating} = useUpdateJiraAssignee();

    // local states
    const [isEditing, setIsEditing] = useState(false);

    // load all the users
    const {isLoading: isLoadingUsers, data: users} = useGetQueryHook({
        key: ['users-assigned-to'],
        fn: getAllUsersService
    });

    // once the jira details are loaded, set the user assigned to from jira
    useEffect(() => {
        // if jira details are loaded
        if (!loadingJiraMetadata && !fetchingJiraMetadata) {
            // set the user
            setValue("assignee", {
                name: jiraMetadata.assigneeName,
                email: jiraMetadata.assigneeEmail,
                profileImage: jiraMetadata.assigneeProfileImage,
                imageAltText: jiraMetadata.assigneeName
            });
        }
    }, [loadingJiraMetadata, fetchingJiraMetadata, isLoadingUsers]);

    const selectedAssignee = useWatch({control: control, name: "assignee"});

    function onSubmit() {
        if (selectedAssignee.email === jiraMetadata.assigneeEmail) {
            return;
        }

        updateJiraAssignee({
            jiraKey: jiraKey,
            assignee: selectedAssignee.email
        }, {
            onSuccess: () => {
                setIsEditing(false);
                queryClient.invalidateQueries({queryKey: [`${jiraKey}-metadata`]});
            }
        });
    }

    // handler functions
    function handleUpdateAssignee() {
        handleSubmit(onSubmit)();
    }

    return (
        <Box>
            <AsideElementHeading text={"Assigned To"}/>
            <LoadOrFetchWrapper
                loading={loadingJiraMetadata}
                fetching={fetchingJiraMetadata}
                loader={<Rounded2Half/>}>
                <AutocompleteAssign
                    name={"assignee"}
                    id={"assignee"}
                    control={control}
                    options={users}
                    optionKey={"email"}
                    optionLabel={"name"}
                    noOptionsText={"No users available"}
                    variant={"user-avatar"}
                    loading={isLoadingUsers}
                    disabled={isLoadingUsers || isUpdating}
                    error={!!errors.assignee}
                    helperText={errors.assignee?.message}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    isUpdating={isUpdating}
                    okClickHandler={handleUpdateAssignee}
                >
                    <StaticAvatarAndText
                        src={jiraMetadata?.assigneeProfileImage}
                        alt={"assignee"}
                        text={jiraMetadata?.assigneeName}
                    />
                </AutocompleteAssign>
            </LoadOrFetchWrapper>
        </Box>
    );
}

export default JiraDetailAssignee;