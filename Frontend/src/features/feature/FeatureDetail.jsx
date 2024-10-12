import {Avatar, Box, Divider, InputAdornment, Paper, TextField, Typography} from "@mui/material";
import TextEditor from "../../components/editor/Editor.jsx";
import useDefaultEditor from "../../components/editor/useDefaultEditor.js";
import {IconMap} from "../../utils/IconMap.jsx";

function FeatureDetail() {

    const createFeatureEditor = useDefaultEditor('Description for the feature goes here...')

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            padding: "2rem"
        }}>
            <Typography variant={"h5"}>
                Feature one (FTR-1)
            </Typography>

            <Box>
                <Typography variant="body1" gutterBottom>
                    Description
                </Typography>
                <TextEditor editor={createFeatureEditor} height={"20rem"}/>
            </Box>
            <Box>
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
                <Box sx={{
                    display: "grid",
                    gridTemplateRows: "1fr 1fr",
                    rowGap: "1rem",
                    columnGap: "1rem",
                    overflowX: "auto",
                    gridAutoFlow: "column",
                    gridAutoColumns: "max-content",
                    padding: "0.5rem 0.5rem 0.5rem 0"
                }}>
                    <StoryItemCard/>
                    <StoryItemCard/>
                    <StoryItemCard/>
                    <StoryItemCard/>
                    <StoryItemCard/>
                    <StoryItemCard/>
                    <StoryItemCard/>
                    <StoryItemCard/>
                    <StoryItemCard/>
                    <StoryItemCard/>
                    <StoryItemCard/>
                    <StoryItemCard/>
                </Box>
            </Box>
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
                <Box sx={{
                    display: "grid",
                    gridTemplateRows: "1fr 1fr",
                    rowGap: "1rem",
                    columnGap: "1rem",
                    overflowX: "auto",
                    gridAutoFlow: "column",
                    gridAutoColumns: "max-content",
                    padding: "0.5rem 0.5rem 0.5rem 0"
                }}>
                    <BugItemCard/>
                    <BugItemCard/>
                    <BugItemCard/>
                    <BugItemCard/>
                    <BugItemCard/>
                    <BugItemCard/>
                    <BugItemCard/>
                    <BugItemCard/>
                    <BugItemCard/>
                    <BugItemCard/>
                    <BugItemCard/>
                    <BugItemCard/>
                </Box>
            </Box>
        </Box>
    );
}

function StoryItemCard() {
    return (
        <Paper variant={"outlined"} elevation={2} sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            width: "15rem",
            padding: "0.5rem",
            overflow: "hidden"
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "0.5rem"
            }}>
                {IconMap['userStory']}
                <Typography variant={"overline"}>
                    MFP2-1
                </Typography>
            </Box>
            <Typography variant="caption" gutterBottom sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                lineClamp: 2
            }}>
                Title for this story goes here and it can be very long also and it may go on for ever like this also
            </Typography>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <Avatar>
                    X
                </Avatar>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "0.2rem"
                }}>
                    <Typography variant="caption">Status</Typography>
                    {IconMap['todo']}
                </Box>
            </Box>
        </Paper>
    );
}

function BugItemCard() {
    return (
        <Paper variant={"outlined"} elevation={2} sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            width: "15rem",
            padding: "0.5rem",
            overflow: "hidden"
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "0.5rem"
            }}>
                {IconMap['bug']}
                <Typography variant={"overline"}>
                    MFP2-4
                </Typography>
            </Box>
            <Typography variant="caption" gutterBottom sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                lineClamp: 2
            }}>
                Title for this bug goes here and it can be very long also and it may go on for ever like this also
            </Typography>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <Avatar>
                    X
                </Avatar>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "0.2rem"
                }}>
                    <Typography variant="caption">Fix</Typography>
                    {IconMap['done']}
                </Box>
            </Box>
        </Paper>
    );
}

export default FeatureDetail;