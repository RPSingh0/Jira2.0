import {InputAdornment, styled, TextField} from "@mui/material";
import {IconMap} from "../../utils/IconMap.jsx";

const StyledSearchProjectsTextField = styled(TextField)(({theme}) => ({
    input: {color: theme.palette.defaultBlack.main}
}));

function SearchProjects() {
    return (
        <StyledSearchProjectsTextField
            variant="outlined"
            size="small"
            placeholder="Search Projects"
            slotProps={{
                input: {
                    endAdornment: <InputAdornment position="end">
                        {IconMap['search']}
                    </InputAdornment>,
                },
            }}
        />
    );
}

export default SearchProjects;