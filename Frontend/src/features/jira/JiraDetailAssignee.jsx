import AutocompleteSelector from "../../components/autocomplete/AutocompleteSelector.jsx";
import useGetQueryHook from "../../queryHooks/useGetQueryHook.js";
import {getAllUsersService} from "../../services/user/userService.js";
import {useEffect, useState} from "react";
import {Box, Typography} from "@mui/material";
import {useUpdateJiraAssignee} from "./hooks/useUpdateJiraAssignee.js";
import {toast} from "react-toastify";
import {useQueryClient} from "@tanstack/react-query";
import {useJiraMetadataContext} from "./JiraMetadataContext.jsx";
import {PaperCancelButton, PaperOkButton, StaticAvatarAndText} from "./JiraDetailAsideComponents.jsx";
import LoadOrFetchWrapper from "../../components/loader/LoadOrFetchWrapper.jsx";
import {Rounded2Half} from "../../components/loader/Loader.jsx";
import {
    StyledAutoCompleteWithButtonBox,
    StyledItemValueStaticBox,
    StyledOkCancelPaperButtonBox
} from "./JiraDetailAsideStyles.jsx";

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
            <Typography variant="overline" gutterBottom sx={{paddingLeft: "0.5rem"}}>
                Assigned To
            </Typography>
            <LoadOrFetchWrapper
                loading={loadingJiraMetadata}
                fetching={fetchingJiraMetadata}
                loader={<Rounded2Half/>}>
                {isEditing ?
                    <StyledAutoCompleteWithButtonBox>
                        <AutocompleteSelector
                            variant={'user-avatar'}
                            name={"assignee"}
                            options={(isLoadingUsers || usersError) ? [] : users}
                            isLoading={isLoadingUsers}
                            value={assignee}
                            setValue={setAssignee}
                        />
                        <StyledOkCancelPaperButtonBox>
                            <PaperOkButton onClickHandler={handleUpdateAssignee} disabled={isUpdating}/>
                            <PaperCancelButton onClickHandler={() => setIsEditing(false)} disabled={isUpdating}/>
                        </StyledOkCancelPaperButtonBox>
                    </StyledAutoCompleteWithButtonBox>
                    :
                    <StyledItemValueStaticBox onDoubleClick={() => setIsEditing(true)}>
                        <StaticAvatarAndText
                            src={jiraMetadata?.assigneeProfileImage}
                            alt={"assignee"}
                            text={jiraMetadata?.assigneeName}
                        />
                    </StyledItemValueStaticBox>
                }
            </LoadOrFetchWrapper>
        </Box>
    );
}

export default JiraDetailAssignee;