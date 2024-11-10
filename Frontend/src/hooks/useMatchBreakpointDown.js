import {useMediaQuery, useTheme} from "@mui/material";

function useMatchBreakpointDown(size) {
    const theme = useTheme();
    return useMediaQuery(theme.breakpoints.down(size));
}

export default useMatchBreakpointDown;