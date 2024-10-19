import {Box, styled, Typography} from "@mui/material";

const StyledProjectDetailAsideItemBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column"
}));

function AsideItem({itemKey, children}) {
    return (
        <StyledProjectDetailAsideItemBox>
            <Typography variant="overline" gutterBottom>
                {itemKey}
            </Typography>
            {children}
        </StyledProjectDetailAsideItemBox>
    );
}

export default AsideItem;