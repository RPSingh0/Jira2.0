import {IconButton, Paper, Typography} from "@mui/material";
import {IconMap} from "../../utils/IconMap.jsx";
import {Avatar24x24} from "../../components/avatar/Avatars.jsx";

export function PaperOkButton({onClickHandler, disabled}) {
    return (
        <Paper sx={{overflow: "hidden"}}>
            <IconButton
                size={"small"}
                disableFocusRipple
                disableTouchRipple
                sx={{borderRadius: "0"}}
                onClick={onClickHandler}
                disabled={disabled}
            >
                {IconMap['save']}
            </IconButton>
        </Paper>
    );
}

export function PaperCancelButton({onClickHandler, disabled}) {
    return (
        <Paper sx={{overflow: "hidden"}}>
            <IconButton
                size={"small"}
                disableFocusRipple
                disableTouchRipple
                sx={{borderRadius: "0"}}
                onClick={onClickHandler}
                disabled={disabled}
            >
                {IconMap['close']}
            </IconButton>
        </Paper>
    );
}

export function StaticAvatarAndText({src, alt, text}) {
    return (
        <>
            <Avatar24x24 src={src} alt={alt}/>
            <Typography variant="body1">
                {text}
            </Typography>
        </>
    );
}