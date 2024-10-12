import {
    AutoStories,
    BugReport, CheckCircle,
    FeaturedVideo,
    KeyboardArrowUp,
    KeyboardDoubleArrowUp, PlaylistAddCheck, PriorityHigh, RadioButtonChecked, RadioButtonUnchecked,
    Search,
    WorkHistory
} from "@mui/icons-material";

export const IconMap = {
    'work': <WorkHistory/>,
    'userStory': <AutoStories/>,
    'bug': <BugReport/>,
    'search': <Search/>,
    'feature': <FeaturedVideo/>,
    'low': <KeyboardArrowUp/>,
    'medium': <KeyboardDoubleArrowUp/>,
    'high': <PriorityHigh/>,
    'todo': <PlaylistAddCheck/>,
    'in-progress': <RadioButtonChecked/>,
    'done': <CheckCircle/>
}