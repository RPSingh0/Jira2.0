import {InputAdornment} from "@mui/material";
import {IconMap} from "../../utils/IconMap.jsx";
import {StyledSearchProjectsTextField} from "./SearchProjectsStyles.jsx";

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