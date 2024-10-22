import AutocompleteSelector from "../../components/autocomplete/AutocompleteSelector.jsx";
import useGetQueryHook from "../../queryHooks/useGetQueryHook.js";
import {getAllUsersService} from "../../services/user/userService.js";
import {useEffect, useState} from "react";
import {Box, Typography} from "@mui/material";
import {useUpdateJiraAssignedTo} from "./hooks/useUpdateJiraAssignedTo.js";
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

function JiraDetailAssignedTo() {

    // context states
    const {jiraKey, loadingJiraMetadata, fetchingJiraMetadata, jiraMetadata} = useJiraMetadataContext();

    // react query hooks
    const queryClient = useQueryClient();
    const {updateJiraAssignedTo, isUpdating} = useUpdateJiraAssignedTo();

    // local states
    const [assignedTo, setAssignedTo] = useState(null);
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
            setAssignedTo({
                name: jiraMetadata.userAssignedToName,
                email: jiraMetadata.userAssignedToEmail,
                profileImage: jiraMetadata.userAssignedToProfileImage,
                imageAltText: jiraMetadata.userAssignedToName
            });
        }
    }, [loadingJiraMetadata, fetchingJiraMetadata, isLoadingUsers]);

    // handler functions
    function handleUpdateAssignedTo() {

        if (!assignedTo) {
            toast.error('Please select a user');
            return;
        }

        if (assignedTo.email === jiraMetadata.userAssignedToEmail) {
            return;
        }

        updateJiraAssignedTo({
            jiraKey: jiraKey,
            assignedTo: assignedTo.email
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
                            name={"assignedTo"}
                            options={(isLoadingUsers || usersError) ? [] : users}
                            isLoading={isLoadingUsers}
                            value={assignedTo}
                            setValue={setAssignedTo}
                        />
                        <StyledOkCancelPaperButtonBox>
                            <PaperOkButton onClickHandler={handleUpdateAssignedTo} disabled={isUpdating}/>
                            <PaperCancelButton onClickHandler={() => setIsEditing(false)} disabled={isUpdating}/>
                        </StyledOkCancelPaperButtonBox>
                    </StyledAutoCompleteWithButtonBox>
                    :
                    <StyledItemValueStaticBox onDoubleClick={() => setIsEditing(true)}>
                        <StaticAvatarAndText
                            src={jiraMetadata?.userAssignedToProfileImage}
                            alt={"assignedTo"}
                            text={jiraMetadata?.userAssignedToName}
                        />
                    </StyledItemValueStaticBox>
                }
            </LoadOrFetchWrapper>
        </Box>
    );
}

export default JiraDetailAssignedTo;