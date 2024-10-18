import {Box, Button, ButtonGroup, Paper, styled, Typography} from "@mui/material";
import useDefaultEditor from "../../components/editor/useDefaultEditor.js";
import TextEditor from "../../components/editor/Editor.jsx";
import useGetQueryHook from "../../queryHooks/useGetQueryHook.js";
import {getJiraDetailsByJiraKeyService} from "../../services/jira/jiraService.js";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const StyledJiraDetailBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: "2rem"
}));

const StyledProjectDetailHeading = styled(Typography)(() => ({}));

const StyledProjectDetailContentBox = styled(Box)(({theme}) => ({
    display: "flex",
    flexDirection: "row",
    gap: "2rem",

    [theme.breakpoints.down('c1000')]: {
        flexDirection: "column-reverse",
    }
}));

const StyledProjectDetailMainSectionBox = styled(Box)(() => ({
    flexGrow: 1
}));

const StyledProjectDetailDescriptionBox = styled(Box)(() => ({
    marginBottom: "2rem",
}));

const StyledProjectDetailAsideBox = styled(Paper)(({theme}) => ({
    width: "23%",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    height: "min-content",

    [theme.breakpoints.down('c1360')]: {
        width: "25%"
    },

    [theme.breakpoints.down('lg')]: {
        width: "30%"
    },

    [theme.breakpoints.down('c1000')]: {
        width: "unset",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr 1fr",
        gridAutoFlow: "column"
    },

    [theme.breakpoints.down('c660')]: {
        display: "flex",
    }
}));

const StyledProjectDetailAsideItemBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
}));

function JiraDetail() {

    const {editingOn, editingOff} = useDefaultEditor(undefined);
    const [isEditing, setIsEditing] = useState(false);
    const {jiraKey} = useParams();

    const {
        isLoading: isLoadingJiraDetails,
        isFetching: isFetchingJiraDetails,
        data: jiraDetailsData,
        error: isErrorLoadingJiraDetails
    } = useGetQueryHook({
        key: [`${jiraKey}`],
        fn: getJiraDetailsByJiraKeyService,
        jiraKey: jiraKey
    });

    useEffect(() => {
        if (!isLoadingJiraDetails && !isFetchingJiraDetails) {
            editingOn.commands.setContent(jiraDetailsData.data.jiraDetails.description);
            editingOff.commands.setContent(jiraDetailsData.data.jiraDetails.description);
        }
    }, [isLoadingJiraDetails, isFetchingJiraDetails]);

    return (
        <StyledJiraDetailBox>
            <StyledProjectDetailHeading variant="h5">
                {!isLoadingJiraDetails && jiraDetailsData.data.jiraDetails.summary}
            </StyledProjectDetailHeading>

            {/* Main content container */}
            <StyledProjectDetailContentBox>
                <StyledProjectDetailMainSectionBox>

                    {/* Description Box */}
                    <StyledProjectDetailDescriptionBox
                        onDoubleClick={() => setIsEditing(isEditing === false ? true : true)}>
                        {isEditing ?
                            <TextEditor editor={editingOn} height={"20rem"}/>
                            :
                            <TextEditor editor={editingOff} height={"20rem"}/>
                        }
                    </StyledProjectDetailDescriptionBox>
                    {isEditing &&
                        <ButtonGroup variant={"outlined"}>
                            <Button onClick={() => setIsEditing(false)}>
                                Save
                            </Button>
                            <Button onClick={() => setIsEditing(false)}>
                                Cancel
                            </Button>
                        </ButtonGroup>
                    }
                </StyledProjectDetailMainSectionBox>

                <StyledProjectDetailAsideBox variant="outlined">
                    <AsideItem itemKey={"Assigned To"}
                               itemValue={!isLoadingJiraDetails && jiraDetailsData.data.jiraDetails.userAssignedToName}/>
                    <AsideItem itemKey={"Created By"}
                               itemValue={!isLoadingJiraDetails && jiraDetailsData.data.jiraDetails.userCreatedByName}/>
                    <AsideItem itemKey={"Points"}
                               itemValue={!isLoadingJiraDetails && jiraDetailsData.data.jiraDetails.jiraPoint}/>
                    <AsideItem itemKey={"Project"}
                               itemValue={!isLoadingJiraDetails && jiraDetailsData.data.jiraDetails.projectKey}/>
                    <AsideItem itemKey={"Feature"}
                               itemValue={!isLoadingJiraDetails && jiraDetailsData.data.jiraDetails.featureKey}/>
                    <AsideItem itemKey={"Created On"}
                               itemValue={!isLoadingJiraDetails && jiraDetailsData.data.jiraDetails.createdOn}/>
                </StyledProjectDetailAsideBox>
            </StyledProjectDetailContentBox>
        </StyledJiraDetailBox>
    );
}

function AsideItem({itemKey, itemValue}) {
    return (
        <StyledProjectDetailAsideItemBox>
            <Typography variant="body1" gutterBottom>
                {itemKey}
            </Typography>
            <Typography variant="body1" gutterBottom>
                {itemValue}
            </Typography>
        </StyledProjectDetailAsideItemBox>
    );
}

export default JiraDetail;