import {StyledNoItemsContainer, StyledWorkedOnTabBox} from "./StoriesTabStyles.jsx";

function StoriesTab() {
    return (
        <StyledWorkedOnTabBox>
            <StyledNoItemsContainer src={"/others/no_items.png"} alt={"no items found"} height={"5rem"}/>
        </StyledWorkedOnTabBox>
    );
}

export default StoriesTab;