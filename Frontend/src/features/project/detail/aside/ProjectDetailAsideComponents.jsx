import {Box, styled, Typography} from "@mui/material";

const StyledProjectDetailAsideItemBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
}));

export function AsideItem({itemKey, itemValue}) {
    return (
        <StyledProjectDetailAsideItemBox>
            <Typography variant="overline">
                {itemKey}
            </Typography>
            <Typography variant="overline">
                {itemValue}
            </Typography>
        </StyledProjectDetailAsideItemBox>
    );
}