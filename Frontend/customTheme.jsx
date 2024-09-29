import {createTheme} from "@mui/material";

const customTheme = createTheme({
    palette: {
        ...createTheme().palette,
        defaultBlack: {
            main: '#224073',
            light: '#626f86',
            dark: '#172b4d',
        }
    },
    breakpoints: {
        values: {
            ...createTheme().breakpoints.values,
            c500: 500,
            c375: 375
        }
    }
});

export default customTheme;