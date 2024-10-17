import {Box, Paper, styled, Typography} from "@mui/material";
import useDefaultEditor from "../../components/editor/useDefaultEditor.js";
import TextEditor from "../../components/editor/Editor.jsx";

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
    marginBottom: "2rem"
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

    const creatProjectEditor = useDefaultEditor(undefined);

    return (
        <StyledJiraDetailBox>
            <StyledProjectDetailHeading variant="h5">
                This is a placeholder for this jira summary and it will show here
            </StyledProjectDetailHeading>

            {/* Main content container */}
            <StyledProjectDetailContentBox>
                <StyledProjectDetailMainSectionBox>

                    {/* Description Box */}
                    <StyledProjectDetailDescriptionBox>
                        <TextEditor editor={creatProjectEditor} height={"20rem"}/>
                    </StyledProjectDetailDescriptionBox>

                </StyledProjectDetailMainSectionBox>

                <StyledProjectDetailAsideBox variant="outlined">
                    <AsideItem itemKey={"Assigned To"} itemValue={'Xenovia Gremory'}/>
                    <AsideItem itemKey={"Created By"} itemValue={'Eren Jager'}/>
                    <AsideItem itemKey={"Points"} itemValue={5}/>
                    <AsideItem itemKey={"Project"} itemValue={'MFP1'}/>
                    <AsideItem itemKey={"Feature"} itemValue={'FTR-1'}/>
                    <AsideItem itemKey={"Created On"} itemValue={'22/12/2024'}/>
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