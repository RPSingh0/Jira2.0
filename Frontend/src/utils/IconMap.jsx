import {
    AutoStories,
    BugReport,
    CheckCircle, Close, Done,
    FeaturedVideo,
    KeyboardArrowUp,
    KeyboardDoubleArrowUp,
    PlaylistAddCheck,
    PriorityHigh,
    RadioButtonChecked,
    Search,
    WorkHistory
} from "@mui/icons-material";

export const IconMap = {
    'work': <WorkHistory/>,
    'STORY': <AutoStories/>,
    'BUG': <BugReport/>,
    'search': <Search/>,
    'feature': <FeaturedVideo/>,
    'low': <KeyboardArrowUp/>,
    'medium': <KeyboardDoubleArrowUp/>,
    'high': <PriorityHigh/>,
    'todo': <PlaylistAddCheck/>,
    'in-progress': <RadioButtonChecked/>,
    'done': <CheckCircle/>,
    'save': <Done fontSize={"small"}/>,
    'close': <Close fontSize={"small"}/>
}