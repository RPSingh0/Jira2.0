import {styled, TextField} from "@mui/material";

export const StyledSearchProjectsTextField = styled(TextField)(({theme}) => ({
    input: {color: theme.palette.defaultBlack.main}
}));