import {Box, styled} from "@mui/material";

const StyledLogoBox = styled(Box, {
    shouldForwardProp: prop => prop !== 'containerPadding'
})(({containerPadding}) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: `${containerPadding}`,
}));

const StyledLogoImage = styled('img', {
    shouldForwardProp: prop => prop !== 'imageHeight'
})(({imageHeight}) => ({
    height: imageHeight,
    mixBlendMode: "cover"
}));

function Logo({imageName, containerPadding, imageHeight}) {
    return (
        <StyledLogoBox containerPadding={containerPadding}>
            <StyledLogoImage src={`/logo/${imageName}.png`} alt="Logo" imageHeight={imageHeight}/>
        </StyledLogoBox>
    );
}

export default Logo;