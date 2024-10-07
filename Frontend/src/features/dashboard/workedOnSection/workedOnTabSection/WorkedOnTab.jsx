import {StyledNoItemsContainer, StyledWorkedOnTabBox} from "./WorkedOnTabStyles.jsx";

function WorkedOnTab() {
    return (
        <StyledWorkedOnTabBox>
            <StyledNoItemsContainer src={"/others/no_items.png"} alt={"no items found"} height={"5rem"}/>
        </StyledWorkedOnTabBox>
    );
}

export default WorkedOnTab;