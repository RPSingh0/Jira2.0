import {useParams} from "react-router-dom";
import {Box, Divider, Paper, styled, Typography} from "@mui/material";
import useDefaultEditor from "../../components/editor/useDefaultEditor.js";
import TextEditor from "../../components/editor/Editor.jsx";
import {OutlinedIconNavLinkButton} from "../../components/button/Buttons.jsx";

const StyledProjectDetailBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: "2rem"
}));

const StyledProjectDetailHeading = styled(Typography)(() => ({}));

const StyledProjectDetailToolbar = styled(Box)(() => ({}));

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

const StyledProjectDetailFeatureBox = styled(Box)(() => ({}));

const StyledProjectDetailFeatureItemBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
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

const StyledFeatureItemPaper = styled(Paper)(() => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "0.5rem 0.5rem 0.5rem 0.2rem"
}));

const StyledProjectDetailAsideItemBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
}));

const StyledProjectDetailAsideLeadByBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
}));

function ProjectDetail() {

    const {projectKey} = useParams();
    const creatProjectEditor = useDefaultEditor('Description for project');

    return (
        <StyledProjectDetailBox>
            <StyledProjectDetailHeading variant="h5">
                My First Project (50% Complete)
            </StyledProjectDetailHeading>

            {/* Project Detail Toolbar */}
            <StyledProjectDetailToolbar>
                <OutlinedIconNavLinkButton
                    text="Add Feature"
                    link={`/projects/${projectKey}/feature/create`}
                    startIcon="feature"
                />
            </StyledProjectDetailToolbar>

            {/* Main content container */}
            <StyledProjectDetailContentBox>
                <StyledProjectDetailMainSectionBox>

                    {/* Description Box */}
                    <StyledProjectDetailDescriptionBox>
                        <Typography variant="body1" gutterBottom>
                            Description
                        </Typography>
                        <TextEditor editor={creatProjectEditor} height={"20rem"}/>
                    </StyledProjectDetailDescriptionBox>

                    {/* Features Box */}
                    <StyledProjectDetailFeatureBox>
                        <Typography variant="body1" gutterBottom>
                            Features
                        </Typography>
                        <StyledProjectDetailFeatureItemBox>
                            <FeatureItem/>
                            <FeatureItem/>
                            <FeatureItem/>
                            <FeatureItem/>
                            <FeatureItem/>
                        </StyledProjectDetailFeatureItemBox>
                    </StyledProjectDetailFeatureBox>
                </StyledProjectDetailMainSectionBox>

                {/* Main and aside element separator */}
                {/*<Divider orientation={"vertical"} variant={"middle"} flexItem={true} sx={{borderWidth: "0.2rem"}}/>*/}

                <StyledProjectDetailAsideBox variant="outlined">
                    <StyledProjectDetailAsideLeadByBox>
                        <Typography variant="body1" gutterBottom>
                            Lead By
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Xenovia Gremory
                        </Typography>
                    </StyledProjectDetailAsideLeadByBox>
                    <AsideItem itemKey={"Open Issues"} itemValue={30}/>
                    <AsideItem itemKey={"Done Issues"} itemValue={400}/>
                    <AsideItem itemKey={"Started"} itemValue={"22/12/2024"}/>
                    <AsideItem itemKey={"End (Expected)"} itemValue={"26/12/2024"}/>
                    <AsideItem itemKey={"Day Spent"} itemValue={"500 Days"}/>
                </StyledProjectDetailAsideBox>
            </StyledProjectDetailContentBox>
        </StyledProjectDetailBox>
    );
}

function FeatureItem() {
    return (
        <StyledFeatureItemPaper variant={"outlined"}>
            <Typography variant={"caption"}>
                FEAT1
            </Typography>
            <Divider orientation={"vertical"} variant={"middle"} flexItem={true}
                     sx={{margin: "0 0.5rem 0 0.5rem"}}/>
            <Typography variant={"body2"}>
                Feature implimentation one
            </Typography>
        </StyledFeatureItemPaper>
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

export default ProjectDetail;