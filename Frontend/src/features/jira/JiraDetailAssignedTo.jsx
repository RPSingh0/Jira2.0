import AutocompleteSelector from "../../components/autocomplete/AutocompleteSelector.jsx";
import useGetQueryHook from "../../queryHooks/useGetQueryHook.js";
import {getAllUsersService} from "../../services/user/userService.js";
import {useEffect, useState} from "react";
import {useJiraDetailContext} from "./JiraDetailContext.jsx";
import {Avatar, Box, IconButton, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";
import {IconMap} from "../../utils/IconMap.jsx";
import {useUpdateJiraDescription} from "./hooks/useUpdateJiraAssignedTo.js";
import {toast} from "react-toastify";
import {useQueryClient} from "@tanstack/react-query";

function JiraDetailAssignedTo() {

    // context states
    const {jiraKey, loadingJiraDetail, fetchingJiraDetail, jiraDetailData,} = useJiraDetailContext();

    // react query hooks
    const queryClient = useQueryClient();
    const {updateJiraAssignedTo, isUpdating} = useUpdateJiraDescription();

    // local states
    const [assignedTo, setAssignedTo] = useState();
    const [isEditing, setIsEditing] = useState(false);

    // load all the users
    const {isLoading: isLoadingUsers, data: usersForLead, error: usersForLeadError} = useGetQueryHook({
        key: ['usersForLead'],
        fn: getAllUsersService
    });

    // once the jira details are loaded, set the user assigned to from jira
    useEffect(() => {
        // if jira details are loaded
        if (!loadingJiraDetail && !fetchingJiraDetail) {
            // set the user
            setAssignedTo({
                id: jiraDetailData.data.jiraDetails.userAssignedToId,
                optionText: jiraDetailData.data.jiraDetails.userAssignedToName,
                profileImage: 'https://avatar.iran.liara.run/username?username=one',
                imageAltText: 'User one'
            });
        }
    }, [loadingJiraDetail, fetchingJiraDetail, isLoadingUsers]);

    // handler functions
    function handleUpdateAssignedTo() {

        if (!assignedTo) {
            toast.error('Please select a user');
            return;
        }

        if (assignedTo.id === jiraDetailData.data.jiraDetails.userAssignedToId) {
            return;
        }

        updateJiraAssignedTo({
            jiraKey: jiraKey,
            assignedTo: assignedTo.id
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
                        name={"lead"}
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
                    borderRadius: "1rem",
                    transition: "background-color 0.2s ease",

                    "&:hover": {
                        backgroundColor: grey["200"]
                    }
                }} onDoubleClick={() => setIsEditing(true)}>
                    <Avatar src={'https://avatar.iran.liara.run/username?username=one'} alt="assignedTo"/>
                    <Typography variant="body1">
                        {jiraDetailData?.data.jiraDetails.userAssignedToName}
                    </Typography>
                </Box>
            }
        </Box>
    );
}

export default JiraDetailAssignedTo;