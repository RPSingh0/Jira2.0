import {Box, styled} from "@mui/material";

const StyledWorkedOnTabBox = styled(Box)(() => ({
    display: "flex"
}));

const StyledNoItemsContainer = styled('img')(() => ({
    height: "20rem",
    margin: "auto",
    marginTop: "3rem"
}));

function StoriesTab() {
    return (
        <StyledWorkedOnTabBox>
            <StyledNoItemsContainer src={"/others/no_items.png"} alt={"no items found"} height={"5rem"}/>
        </StyledWorkedOnTabBox>
    );
}

export default StoriesTab;