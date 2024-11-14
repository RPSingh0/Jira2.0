import {Avatar24x24} from "./Avatars.jsx";
import {Typography} from "@mui/material";
import {StyledItemValueStaticBox} from "../../styles/StyledItemValueStaticBox.jsx";

export function StaticAvatarAndText({src, alt, text}) {
    return (
        <StyledItemValueStaticBox>
            <Avatar24x24 src={src} alt={alt}/>
            <Typography variant="body1">
                {text}
            </Typography>
        </StyledItemValueStaticBox>
    );
}