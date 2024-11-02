import AutocompleteSelector from "../../components/autocomplete/AutocompleteSelector.jsx";
import useGetQueryHook from "../../queryHooks/useGetQueryHook.js";
import {getAllUsersService} from "../../services/user/userService.js";
import {useEffect, useState} from "react";
import {Box, styled, Typography} from "@mui/material";
import {toast} from "react-toastify";
import {useQueryClient} from "@tanstack/react-query";
import LoadOrFetchWrapper from "../../components/loader/LoadOrFetchWrapper.jsx";
import {Rounded2Half} from "../../components/loader/Loader.jsx";
import {useProjectDetailContext} from "./ProjectDetailContext.jsx";
import {useUpdateProjectLeadBy} from "./hooks/useUpdateProjectLeadBy.js";
import {grey} from "@mui/material/colors";
import {PaperCancelButton, PaperOkButton, StaticAvatarAndText} from "../jira/JiraDetailAsideComponents.jsx";

const StyledOkCancelPaperButtonBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "row",
    gap: "0.5rem",
    position: "absolute",
    bottom: "-2rem",
    right: 0,
    zIndex: 1000
}));

const StyledItemValueStaticBox = styled(Box)(() => ({
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
}));

const StyledAutoCompleteWithButtonBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "end",
    gap: "0.5rem",
    position: "relative"
}));

function ProjectDetailLeadBy() {

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
            <Typography variant="overline" gutterBottom sx={{paddingLeft: "0.5rem"}}>
                Lead By
            </Typography>
            <LoadOrFetchWrapper
                loading={loadingProjectDetail}
                fetching={fetchingProjectDetail}
                loader={<Rounded2Half/>}>
                {isEditing ?
                    <StyledAutoCompleteWithButtonBox>
                        <AutocompleteSelector
                            variant={'user-avatar'}
                            name={"leadBy"}
                            options={(isLoadingUsers || usersError) ? [] : users}
                            isLoading={isLoadingUsers}
                            value={leadBy}
                            setValue={setLeadBy}
                        />
                        <StyledOkCancelPaperButtonBox>
                            <PaperOkButton onClickHandler={handleUpdateLeadBy} disabled={isUpdating}/>
                            <PaperCancelButton onClickHandler={() => setIsEditing(false)} disabled={isUpdating}/>
                        </StyledOkCancelPaperButtonBox>
                    </StyledAutoCompleteWithButtonBox>
                    :
                    <StyledItemValueStaticBox onDoubleClick={() => setIsEditing(true)}>
                        <StaticAvatarAndText
                            src={projectDetail?.leadProfileImage}
                            alt={"lead by"}
                            text={projectDetail?.leadName}
                        />
                    </StyledItemValueStaticBox>
                }
            </LoadOrFetchWrapper>
        </Box>
    );
}

export default ProjectDetailLeadBy;