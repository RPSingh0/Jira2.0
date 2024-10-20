import AutocompleteSelector from "../../components/autocomplete/AutocompleteSelector.jsx";
import useGetQueryHook from "../../queryHooks/useGetQueryHook.js";
import {getAllUsersService} from "../../services/user/userService.js";
import {useEffect, useState} from "react";
import {Avatar, Box, IconButton, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";
import {IconMap} from "../../utils/IconMap.jsx";
import {useUpdateJiraAssignedTo} from "./hooks/useUpdateJiraAssignedTo.js";
import {toast} from "react-toastify";
import {useQueryClient} from "@tanstack/react-query";
import {useJiraMetadataContext} from "./JiraMetadataContext.jsx";

function JiraDetailAssignedTo() {

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
    const {updateJiraAssignedTo, isUpdating} = useUpdateJiraAssignedTo();

    // local states
    const [assignedTo, setAssignedTo] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // load all the users
    const {isLoading: isLoadingUsers, data: usersForLead, error: usersForLeadError} = useGetQueryHook({
        key: ['usersForLead'],
        fn: getAllUsersService
    });

    // once the jira details are loaded, set the user assigned to from jira
    useEffect(() => {
        // if jira details are loaded
        if (!loadingJiraMetadata && !fetchingJiraMetadata) {
            // set the user
            setAssignedTo({
                name: jiraMetadata.data.jiraMetadata.userAssignedToName,
                email: jiraMetadata.data.jiraMetadata.userAssignedToEmail,
                profileImage: jiraMetadata.data.jiraMetadata.userAssignedToProfileImage,
                imageAltText: jiraMetadata.data.jiraMetadata.userAssignedToName
            });
        }
    }, [loadingJiraMetadata, fetchingJiraMetadata, isLoadingUsers]);

    // handler functions
    function handleUpdateAssignedTo() {

        if (!assignedTo) {
            toast.error('Please select a user');
            return;
        }

        if (assignedTo.email === jiraMetadata.data.jiraMetadata.userAssignedToEmail) {
            return;
        }

        updateJiraAssignedTo({
            jiraKey: jiraKey,
            assignedTo: assignedTo.email
        }, {
            onSuccess: () => {
                setIsEditing(false);
                queryClient.invalidateQueries([jiraKey]);
            }
        });
    }

    return (

        <Box>
            <Typography variant="overline" gutterBottom sx={{paddingLeft: "0.5rem"}}>
                Assigned To
            </Typography>
            {isEditing ?
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "end",
                    gap: "0.5rem"
                }}>
                    <AutocompleteSelector
                        variant={'user-avatar'}
                        name={"assignedTo"}
                        options={(isLoadingUsers || usersForLeadError) ? [] : usersForLead.data.users}
                        isLoading={isLoadingUsers}
                        value={assignedTo}
                        setValue={setAssignedTo}
                    />
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "0.5rem"
                    }}>
                        <IconButton size={"small"} disableFocusRipple disableTouchRipple sx={{
                            borderRadius: "9px"
                        }} onClick={handleUpdateAssignedTo}>
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
                    <Avatar src={jiraMetadata?.data.jiraMetadata.userAssignedToProfileImage} alt="assignedTo"
                            sx={{height: 24, width: 24}}/>
                    <Typography variant="body1">
                        {jiraMetadata?.data.jiraMetadata.userAssignedToName}
                    </Typography>
                </Box>
            }
        </Box>
    );
}

export default JiraDetailAssignedTo;