import {Box, Divider, InputAdornment, styled, TextField, Typography} from "@mui/material";
import TextEditor from "../../components/editor/Editor.jsx";
import useDefaultEditor from "../../components/editor/useDefaultEditor.js";
import {IconMap} from "../../utils/IconMap.jsx";
import FeatureDetailItemCard from "./FeatureDetailItemCard.jsx";

const StyledFeatureDetailBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: "2rem"
}));

const StyledFeatureDetailStoriesBox = styled(Box)(() => ({}));

const StyledTwoRowGrid = styled(Box)(() => ({
    display: "grid",
    gridTemplateRows: "auto auto",
    rowGap: "1rem",
    columnGap: "1rem",
    overflowX: "auto",
    gridAutoFlow: "column",
    gridAutoColumns: "max-content",
    padding: "0.5rem 0.5rem 0.5rem 0"
}));

function FeatureDetail() {

    const createFeatureEditor = useDefaultEditor('Description for the feature goes here...')

    return (
        <StyledFeatureDetailBox>
            <Typography variant={"h5"}>
                Feature one (FTR-1)
            </Typography>

            {/* Editor box */}
            <Box>
                <Typography variant="body1" gutterBottom>
                    Description
                </Typography>
                <TextEditor editor={createFeatureEditor} height={"20rem"}/>
            </Box>

            {/* Stories Box */}
            <StyledFeatureDetailStoriesBox>
                <Typography variant="body1" gutterBottom>
                    Stories
                </Typography>
                <TextField
                    sx={(theme) => ({input: {color: theme.palette.defaultBlack.main}, marginBottom: "1rem"})}
                    variant="outlined"
                    size="small"
                    placeholder="Search Stories"
                    slotProps={{
                        input: {
                            endAdornment: <InputAdornment position="end">
                                {IconMap['search']}
                            </InputAdornment>,
                        },
                    }}
                />
                <StyledTwoRowGrid>
                    <FeatureDetailItemCard
                        type={'userStory'}
                        jiraKey={'MFP2'}
                        title={"This title could be very long and i hope to see the ellipsis"}
                        user={"R"}
                        status={'in-progress'}
                    />
                </StyledTwoRowGrid>
            </StyledFeatureDetailStoriesBox>
            <Divider/>
            <Box>
                <Typography variant="body1" gutterBottom>
                    Bugs
                </Typography>
                <TextField
                    sx={(theme) => ({input: {color: theme.palette.defaultBlack.main}, marginBottom: "1rem"})}
                    variant="outlined"
                    size="small"
                    placeholder="Search Bugs"
                    slotProps={{
                        input: {
                            endAdornment: <InputAdornment position="end">
                                {IconMap['search']}
                            </InputAdornment>,
                        },
                    }}
                />
                <StyledTwoRowGrid>
                    <FeatureDetailItemCard
                        type={"bug"}
                        jiraKey={"MFP4"}
                        title={"This title could be very long and i hope to see the ellipsis"}
                        user={"R"}
                        status={"in-progress"}
                        priority={"high"}
                    />
                </StyledTwoRowGrid>
            </Box>
        </StyledFeatureDetailBox>
    );
}

export default FeatureDetail;