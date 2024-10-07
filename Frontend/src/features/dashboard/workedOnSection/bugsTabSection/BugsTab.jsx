import {StyledNoItemsContainer, StyledWorkedOnTabBox} from "./BugsTabStyles.jsx";

function BugsTab() {
    return (
        <StyledWorkedOnTabBox>
            <StyledNoItemsContainer src={"/others/no_bugs.png"} alt={"no bugs found"} height={"5rem"}/>
        </StyledWorkedOnTabBox>
    );
}

export default BugsTab;