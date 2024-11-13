import {Avatar24x24} from "./Avatars.jsx";
import {Typography} from "@mui/material";

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