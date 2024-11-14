import useGetQueryHook from "../../../../queryHooks/useGetQueryHook.js";
import {getAllUsersService} from "../../../../services/user/userService.js";
import {useEffect, useState} from "react";
import {Box} from "@mui/material";
import {useUpdateJiraAssignee} from "../../hooks/useUpdateJiraAssignee.js";
import {toast} from "react-toastify";
import {useQueryClient} from "@tanstack/react-query";
import {useJiraMetadataContext} from "../../context/JiraMetadataContext.jsx";
import LoadOrFetchWrapper from "../../../../components/loader/LoadOrFetchWrapper.jsx";
import {Rounded2Half} from "../../../../components/loader/Loader.jsx";
import AutocompleteAssign from "../../../../components/autocompleteAssign/AutocompleteAssign.jsx";
import {StaticAvatarAndText} from "../../../../components/avatar/StaticAvatarAndText.jsx";
import AsideElementHeading from "../../../../components/heading/AsideElementHeading.jsx";

function JiraDetailAssignee() {

    // context states
    const {jiraKey, loadingJiraMetadata, fetchingJiraMetadata, jiraMetadata} = useJiraMetadataContext();

    // react query hooks
    const queryClient = useQueryClient();
    const {updateJiraAssignee, isUpdating} = useUpdateJiraAssignee();

    // local states
    const [assignee, setAssignee] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // load all the users
    const {isLoading: isLoadingUsers, data: users, error: usersError} = useGetQueryHook({
        key: ['users-assigned-to'],
        fn: getAllUsersService
    });

    // once the jira details are loaded, set the user assigned to from jira
    useEffect(() => {
        // if jira details are loaded
        if (!loadingJiraMetadata && !fetchingJiraMetadata) {
            // set the user
            setAssignee({
                name: jiraMetadata.assigneeName,
                email: jiraMetadata.assigneeEmail,
                profileImage: jiraMetadata.assigneeProfileImage,
                imageAltText: jiraMetadata.assigneeName
            });
        }
    }, [loadingJiraMetadata, fetchingJiraMetadata, isLoadingUsers]);

    // handler functions
    function handleUpdateAssignee() {

        if (!assignee) {
            toast.error('Please select a user');
            return;
        }

        if (assignee.email === jiraMetadata.assigneeEmail) {
            return;
        }

        updateJiraAssignee({
            jiraKey: jiraKey,
            assignee: assignee.email
        }, {
            onSuccess: () => {
                setIsEditing(false);
                queryClient.invalidateQueries({queryKey: [`${jiraKey}-metadata`]});
            }
        });
    }

    return (
        <Box>
            <AsideElementHeading text={"Assigned To"}/>
            <LoadOrFetchWrapper
                loading={loadingJiraMetadata}
                fetching={fetchingJiraMetadata}
                loader={<Rounded2Half/>}>
                <AutocompleteAssign
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    isLoading={isLoadingUsers}
                    isUpdating={isUpdating}
                    name={"assignee"}
                    variant={"user-avatar"}
                    options={(isLoadingUsers || usersError) ? [] : users}
                    value={assignee}
                    setValue={setAssignee}
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