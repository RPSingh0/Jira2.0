import {InputAdornment} from "@mui/material";
import {IconMap} from "../../utils/IconMap.jsx";
import {StyledSearchTextField} from "./SearchStyles.jsx";

function Search({placeholder}) {
    return (
        <StyledSearchTextField
            variant="outlined"
            size="small"
            placeholder={placeholder}
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

export default Search;