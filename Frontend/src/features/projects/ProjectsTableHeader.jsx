import {Box, styled, Typography} from "@mui/material";

const StyledTableHeaderBox = styled(Box)(() => ({
    display: "flex",
    gap: "5%",
    alignItems: "center",
    padding: "0.5rem",
    marginTop: "2rem",
}));

const StyledTableHeaderTypography = styled(Typography)(({theme}) => ({
    fontWeight: "bold",
    color: theme.palette.defaultBlack.main,
    width: "80%",

    [theme.breakpoints.down('c500')]: {
        width: "70%"
    },

    [theme.breakpoints.down('c375')]: {
        width: "60%"
    }
}));

const StyledOtherHeadersBox = styled(Box)(({theme}) => ({
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    justifyContent: "space-between",
    minWidth: "20%",

    [theme.breakpoints.down('c500')]: {
        width: "30%"
    },

    [theme.breakpoints.down('c375')]: {
        width: "40%"
    }
}));

function ProjectsTableHeader() {
    return (
        <StyledTableHeaderBox>
            <StyledTableHeaderTypography>
                Name
            </StyledTableHeaderTypography>
            {/* Others are grouped for justifyContent */}
            <StyledOtherHeadersBox>
                <StyledTableHeaderTypography>
                    Lead
                </StyledTableHeaderTypography>
                <StyledTableHeaderTypography textAlign="end">
                    Actions
                </StyledTableHeaderTypography>
            </StyledOtherHeadersBox>
        </StyledTableHeaderBox>
    );
}

export default ProjectsTableHeader;