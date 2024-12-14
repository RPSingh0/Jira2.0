import {
    Bookmark,
    BugReport, Chat,
    CheckCircle,
    Close,
    Done,
    FeaturedVideo,
    KeyboardArrowUp,
    KeyboardDoubleArrowUp,
    PlaylistAddCheck,
    PriorityHigh,
    RadioButtonChecked,
    Search,
    Task, Timeline,
    WorkHistory
} from "@mui/icons-material";

export const IconMap = {
    'work': <WorkHistory/>,
    'STORY': <Bookmark/>,
    'BUG': <BugReport/>,
    'TASK': <Task/>,
    'search': <Search/>,
    'feature': <FeaturedVideo/>,
    'low': <KeyboardArrowUp/>,
    'medium': <KeyboardDoubleArrowUp/>,
    'high': <PriorityHigh/>,
    'todo': <PlaylistAddCheck/>,
    'in-progress': <RadioButtonChecked/>,
    'done': <CheckCircle/>,
    'save': <Done fontSize="small"/>,
    'close': <Close fontSize="small"/>,
    'history': <Timeline/>,
    'comments': <Chat/>
}