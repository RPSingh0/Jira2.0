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
            c375: 375,
            c500: 500,
            c800: 800,
            c1000: 1000,
            c1360: 1360
        }
    }
});

export default customTheme;