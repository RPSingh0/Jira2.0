import {useMediaQuery, useTheme} from "@mui/material";

function useMatchBreakpointUp(size) {
    const theme = useTheme();
    return useMediaQuery(theme.breakpoints.up(size));
}

export default useMatchBreakpointUp;