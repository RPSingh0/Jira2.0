import {grey} from "@mui/material/colors";
import {Paper, styled} from "@mui/material";
import {useNavigate} from "react-router-dom";

const StyledFeatureListItemPaper = styled(Paper)(() => ({
    padding: "1rem 0.5rem",
    transition: "all 0.5s ease",

    "&:hover": {
        backgroundColor: grey[200],
        cursor: "pointer"
    }
}));

StyledFeatureListItemPaper.defaultProps = {
    variant: "outlined"
}

function FeatureListItem({featureKey, optionText}) {

    const navigate =  useNavigate();

    function handleClickFeatureListItem() {
        navigate(`feature/${featureKey}`);
    }

    return (
        <StyledFeatureListItemPaper onClick={handleClickFeatureListItem}>
            {optionText}
        </StyledFeatureListItemPaper>
    );
}

export default FeatureListItem;