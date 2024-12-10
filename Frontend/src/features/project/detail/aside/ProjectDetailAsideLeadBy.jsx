import useGetQueryHook from "../../../../queryHooks/useGetQueryHook.js";
import {getAllUsersService} from "../../../../services/user/userService.js";
import {useEffect, useState} from "react";
import {Box} from "@mui/material";
import {useQueryClient} from "@tanstack/react-query";
import LoadOrFetchWrapper from "../../../../components/loader/LoadOrFetchWrapper.jsx";
import {Rounded2Half} from "../../../../components/loader/Loader.jsx";
import {useProjectDetailContext} from "../../context/ProjectDetailContext.jsx";
import {useUpdateProjectLead} from "../../hooks/useUpdateProjectLeadBy.js";
import AutocompleteAssign from "../../../../components/autocompleteAssign/AutocompleteAssign.jsx";
import AsideElementHeading from "../../../../components/heading/AsideElementHeading.jsx";
import {StaticAvatarAndText} from "../../../../components/avatar/StaticAvatarAndText.jsx";
import {useForm, useWatch} from "react-hook-form";

function ProjectDetailAsideLeadBy() {

    // context states
    const {loadingProjectDetail, fetchingProjectDetail, projectDetail} = useProjectDetailContext();

    // react query hooks
    const queryClient = useQueryClient();
    const {updateProjectLead, isUpdating} = useUpdateProjectLead();

    const [isEditing, setIsEditing] = useState(false);
    const {control, handleSubmit, formState: {errors}, setValue} = useForm();

    const selectedProjectLead = useWatch({control: control, name: "projectLead"});

    // load all the users
    const {isLoading: isLoadingUsers, data: users} = useGetQueryHook({
        key: ['users-lead-by'],
        fn: getAllUsersService
    });

    // once the jira details are loaded, set the user assigned to from jira
    useEffect(() => {
        // if jira details are loaded
        if (!loadingProjectDetail && !fetchingProjectDetail) {
            // set the user
            setValue("projectLead", {
                name: projectDetail.leadName,
                email: projectDetail.leadEmail,
                profileImage: projectDetail.leadProfileImage,
                imageAltText: projectDetail.leadName
            });
        }
    }, [loadingProjectDetail, fetchingProjectDetail, isLoadingUsers]);

    function onSubmit() {

        if (selectedProjectLead.email === projectDetail.leadEmail) {
            return;
        }

        updateProjectLead({
            projectKey: projectDetail.projectKey,
            projectLead: selectedProjectLead.email
        }, {
            onSuccess: () => {
                setIsEditing(false);
                queryClient.invalidateQueries({queryKey: [`${projectDetail.projectKey}-detail`]});
            }
        });
    }

    // handler functions
    function handleUpdateLeadBy() {
        handleSubmit(onSubmit)();
    }

    return (
        <Box>
            <AsideElementHeading text={"Project Lead"}/>
            <LoadOrFetchWrapper
                loading={loadingProjectDetail}
                fetching={fetchingProjectDetail}
                loader={<Rounded2Half/>}>
                <AutocompleteAssign
                    name={"projectLead"}
                    id={"projectLead"}
                    control={control}
                    options={users}
                    optionKey={"email"}
                    optionLabel={"name"}
                    noOptionsText={"No users available"}
                    variant={"user-avatar"}
                    loading={isLoadingUsers}
                    disabled={isLoadingUsers || isUpdating}
                    error={!!errors.projectLead}
                    helperText={errors.projectLead?.message}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    isUpdating={isUpdating}
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