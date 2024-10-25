import {useEffect, useState} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {useJiraDetailContext} from "./JiraDetailContext.jsx";
import {Box, styled, TextField, Typography} from "@mui/material";
import {useUpdateJiraSummary} from "./hooks/useUpdateJiraSummary.js";
import {PaperCancelButton, PaperOkButton} from "./JiraDetailAsideComponents.jsx";
import {StyledOkCancelPaperButtonBox} from "./JiraDetailAsideStyles.jsx";
import {RoundedText1Half2Lines} from "../../components/loader/Loader.jsx";
import LoadOrFetchWrapper from "../../components/loader/LoadOrFetchWrapper.jsx";
import {grey} from "@mui/material/colors";

const StyledJiraSummaryBox = styled(Box)(() => ({
    position: "relative"
}));

const StyledStaticJiraSummaryTypography = styled(Typography)(() => ({
    transition: "all 0.2s ease",
    borderRadius: "9px",
    padding: "0 0.5rem",

    "&:hover": {
        backgroundColor: grey["200"]
    }
}));

function JiraDetailSummary() {

    // Contexts
    const {jiraKey, loadingJiraDetail, fetchingJiraDetail, jiraDetailData} = useJiraDetailContext();

    // Local states
    const [summary, setSummary] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    // React query hooks
    const {updateJiraSummary, isUpdating} = useUpdateJiraSummary();
    const queryClient = useQueryClient();

    // Effects
    useEffect(() => {
        if (!loadingJiraDetail && !fetchingJiraDetail) {
            setSummary(jiraDetailData.data.jiraDetails.summary)
        }
    }, [loadingJiraDetail, fetchingJiraDetail]);

    // handler functions
    function handleSaveSummary() {
        updateJiraSummary({
            jiraKey: jiraKey,
            summary: summary,
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: [`${jiraKey}`]})
                setIsEditing(false)
            }
        });
    }

    function handleDoubleClickOnSummaryBox() {
        if (isEditing) {
            return;
        }
        setIsEditing(true);
    }

    return (
        <Box onDoubleClick={handleDoubleClickOnSummaryBox} sx={{
            marginBottom: "2rem"
        }}>
            <LoadOrFetchWrapper
                loading={loadingJiraDetail}
                fetching={fetchingJiraDetail}
                loader={<RoundedText1Half2Lines/>}>
                {isEditing ?
                    <StyledJiraSummaryBox>
                        <TextField
                            fullWidth={true}
                            multiline
                            maxRows={2}
                            value={summary}
                            onChange={(event) => setSummary(event.target.value)}
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
                                <PaperOkButton onClickHandler={handleSaveSummary} disabled={isUpdating}/>
                                <PaperCancelButton onClickHandler={() => setIsEditing(false)} disabled={isUpdating}/>
                            </StyledOkCancelPaperButtonBox>
                        }
                    </StyledJiraSummaryBox>
                    :
                    <StyledStaticJiraSummaryTypography variant="h5" gutterBottom>
                        {!loadingJiraDetail && jiraDetailData.data.jiraDetails.summary}
                    </StyledStaticJiraSummaryTypography>
                }
            </LoadOrFetchWrapper>
        </Box>

    );
}

export default JiraDetailSummary;