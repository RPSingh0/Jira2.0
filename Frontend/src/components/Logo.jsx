import {Box, styled} from "@mui/material";

const StyledLogoBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: "2rem"
}));

const StyledLogoImage = styled('img')(() => ({
    height: "2rem",
    mixBlendMode: "cover"
}));

function Logo() {
    return (
        <StyledLogoBox>
            <StyledLogoImage src={"/logo/logo.png"} alt="Logo"/>
        </StyledLogoBox>
    );
}

export default Logo;