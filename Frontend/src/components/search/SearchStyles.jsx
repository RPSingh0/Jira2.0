import {styled, TextField} from "@mui/material";

export const StyledSearchTextField = styled(TextField)(({theme}) => ({
    input: {color: theme.palette.defaultBlack.main}
}));