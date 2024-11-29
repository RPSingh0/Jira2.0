import {InputAdornment} from "@mui/material";
import {IconMap} from "../../utils/IconMap.jsx";
import {StyledSearchTextField} from "./SearchStyles.jsx";

function Search({placeholder, value, setValue}) {
    return (
        <StyledSearchTextField
            variant="outlined"
            size="small"
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
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