import {Avatar} from "@mui/material";

export function Avatar24x24({src, alt}) {
    return (
        <Avatar src={src} alt={alt} sx={{height: 24, width: 24}}/>
    );
}