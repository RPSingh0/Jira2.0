import {Box, styled, TextField, Typography} from "@mui/material";
import {useFeatureDetailContext} from "./FeatureDetailContext.jsx";
import {Rounded2Half} from "../../components/loader/Loader.jsx";
import LoadOrFetchWrapper from "../../components/loader/LoadOrFetchWrapper.jsx";
import {useEffect, useState} from "react";
import {StyledOkCancelPaperButtonBox} from "../jira/JiraDetailAsideStyles.jsx";
import {PaperCancelButton, PaperOkButton} from "../jira/JiraDetailAsideComponents.jsx";
import {grey} from "@mui/material/colors";
import {useUpdateFeatureName} from "./hooks/useUpdateFeatureName.js";
import {useQueryClient} from "@tanstack/react-query";

const StyledFeatureNameBox = styled(Box)(() => ({
    position: "relative"
}));

const StyledStaticFeatureNameTypography = styled(Typography)(() => ({
    transition: "all 0.2s ease",
    borderRadius: "9px",
    padding: "0 0.5rem",

    "&:hover": {
        backgroundColor: grey["200"]
    }
}));

function FeatureDetailName() {

    // Contexts
    const {loadingFeatureDetail, fetchingFeatureDetail, featureDetail} = useFeatureDetailContext();

    // Local states
    const [name, setName] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    // React query hooks
    const {updateFeatureName, isUpdating} = useUpdateFeatureName();
    const queryClient = useQueryClient();

    // Effects
    useEffect(() => {
        if (!loadingFeatureDetail && !fetchingFeatureDetail) {
            setName(featureDetail?.name)
        }
    }, [loadingFeatureDetail, fetchingFeatureDetail]);

    // handler functions
    function handleDoubleClickOnNameBox() {
        if (isEditing) {
            return;
        }
        setIsEditing(true);
    }

    function handleSaveName() {
        updateFeatureName({
            projectKey: featureDetail.projectKey,
            featureKey: featureDetail.featureKey,
            name: name
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: [`${featureDetail.featureKey}-detail`]})
                setIsEditing(false)
            }
        });
    }

    return (
        <Box onDoubleClick={handleDoubleClickOnNameBox}>
            <LoadOrFetchWrapper
                loading={loadingFeatureDetail}
                fetching={fetchingFeatureDetail}
                loader={<Rounded2Half/>}>
                {isEditing ?
                    <StyledFeatureNameBox>
                        <TextField
                            fullWidth={true}
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            slotProps={{
                                input: {
                                    style: {
                                        padding: "0 0.5rem",
                                        fontSize: "1.5rem"
                                    }
                                }
                            }}
                        />
                        {isEditing &&
                            <StyledOkCancelPaperButtonBox>
                                <PaperOkButton onClickHandler={handleSaveName} disabled={isUpdating}/>
                                <PaperCancelButton onClickHandler={() => setIsEditing(false)} disabled={isUpdating}/>
                            </StyledOkCancelPaperButtonBox>
                        }
                    </StyledFeatureNameBox>
                    :
                    <StyledStaticFeatureNameTypography variant={"h5"} gutterBottom>
                        {featureDetail?.name}
                    </StyledStaticFeatureNameTypography>
                }
            </LoadOrFetchWrapper>
        </Box>
    );
}

export default FeatureDetailName;