import {styled, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const StyledTypography = styled(Typography)(() => ({
    "&:hover": {
        cursor: "pointer"
    }
}));

StyledTypography.defaultProps = {
    variant: "caption"
}

function ViewAllNavigate({text, link}) {

    const navigate = useNavigate();

    function handleClickText() {
        navigate(link);
    }

    return (
        <StyledTypography onClick={handleClickText}>
            {text}
        </StyledTypography>
    );
}

export default ViewAllNavigate;