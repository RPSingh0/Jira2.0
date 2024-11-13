import useGetQueryHook from "../../../../queryHooks/useGetQueryHook.js";
import {getAllUsersService} from "../../../../services/user/userService.js";
import {useEffect, useState} from "react";
import {Box} from "@mui/material";
import {toast} from "react-toastify";
import {useQueryClient} from "@tanstack/react-query";
import LoadOrFetchWrapper from "../../../../components/loader/LoadOrFetchWrapper.jsx";
import {Rounded2Half} from "../../../../components/loader/Loader.jsx";
import {useProjectDetailContext} from "../../context/ProjectDetailContext.jsx";
import {useUpdateProjectLeadBy} from "../../hooks/useUpdateProjectLeadBy.js";
import AutocompleteAssign from "../../../../components/autocompleteAssign/AutocompleteAssign.jsx";
import AsideElementHeading from "../../../../components/heading/AsideElementHeading.jsx";
import {StaticAvatarAndText} from "../../../../components/avatar/StaticAvatarAndText.jsx";

function ProjectDetailAsideLeadBy() {

    // context states
    const {loadingProjectDetail, fetchingProjectDetail, projectDetail} = useProjectDetailContext();

    // react query hooks
    const queryClient = useQueryClient();
    const {updateProjectLeadBy, isUpdating} = useUpdateProjectLeadBy();

    // local states
    const [leadBy, setLeadBy] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // load all the users
    const {isLoading: isLoadingUsers, data: users, error: usersError} = useGetQueryHook({
        key: ['users-lead-by'],
        fn: getAllUsersService
    });

    // once the jira details are loaded, set the user assigned to from jira
    useEffect(() => {
        // if jira details are loaded
        if (!loadingProjectDetail && !fetchingProjectDetail) {
            // set the user
            setLeadBy({
                name: projectDetail.leadName,
                email: projectDetail.leadEmail,
                profileImage: projectDetail.leadProfileImage,
                imageAltText: projectDetail.leadName
            });
        }
    }, [loadingProjectDetail, fetchingProjectDetail, isLoadingUsers]);

    // handler functions
    function handleUpdateLeadBy() {

        if (!leadBy) {
            toast.error('Please select a user');
            return;
        }

        if (leadBy.email === projectDetail.leadEmail) {
            return;
        }

        updateProjectLeadBy({
            projectKey: projectDetail.projectKey,
            leadBy: leadBy.email
        }, {
            onSuccess: () => {
                setIsEditing(false);
                queryClient.invalidateQueries({queryKey: [`${projectDetail.projectKey}-detail`]});
            }
        });
    }

    return (
        <Box>
            <AsideElementHeading text={"Lead By"}/>
            <LoadOrFetchWrapper
                loading={loadingProjectDetail}
                fetching={fetchingProjectDetail}
                loader={<Rounded2Half/>}>
                <AutocompleteAssign
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    isLoading={isLoadingUsers}
                    isUpdating={isUpdating}
                    name={"leadBy"}
                    variant={"user-avatar"}
                    options={(isLoadingUsers || usersError) ? [] : users}
                    value={leadBy}
                    setValue={setLeadBy}
                    okClickHandler={handleUpdateLeadBy}
                >
                    <StaticAvatarAndText
                        src={projectDetail?.leadProfileImage}
                        alt={"lead by"}
                        text={projectDetail?.leadName}
                    />
                </AutocompleteAssign>
            </LoadOrFetchWrapper>
        </Box>
    );
}

export default ProjectDetailAsideLeadBy;