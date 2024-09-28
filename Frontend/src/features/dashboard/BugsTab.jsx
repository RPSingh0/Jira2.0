import {Box, styled} from "@mui/material";

const StyledWorkedOnTabBox = styled(Box)(() => ({
    display: "flex"
}));

const StyledNoItemsContainer = styled('img')(() => ({
    height: "20rem",
    margin: "auto",
    marginTop: "3rem"
}));

function BugsTab() {
    return (
        <StyledWorkedOnTabBox>
            <StyledNoItemsContainer src={"/others/no_bugs.png"} alt={"no bugs found"} height={"5rem"}/>
        </StyledWorkedOnTabBox>
    );
}

export default BugsTab;