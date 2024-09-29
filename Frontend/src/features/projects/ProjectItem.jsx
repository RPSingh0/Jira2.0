import {Avatar, Box, Button, Paper, styled, Typography} from "@mui/material";
import {teal} from "@mui/material/colors";

const StyledProjectItemPaper = styled(Paper)(() => ({
    display: "flex",
    gap: "5%",
    padding: "0.5rem",
    alignItems: "center",
}));

const StyledProjectItemHeading = styled(Typography)(({theme}) => ({
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

const StyledOtherProjectItemBox = styled(Box)(({theme}) => ({
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

const StyledLeadAvatar = styled(Avatar)(() => ({
    width: 24,
    height: 24,
    backgroundColor: teal["600"]
}));

function ProjectItem() {
    return (
        <StyledProjectItemPaper elevation={0}>
            <StyledProjectItemHeading variant="body2" noWrap>
                My First Project
            </StyledProjectItemHeading>
            <StyledOtherProjectItemBox>
                <StyledLeadAvatar>
                    R
                </StyledLeadAvatar>
                <Button>
                    000
                </Button>
            </StyledOtherProjectItemBox>
        </StyledProjectItemPaper>
    );
}

export default ProjectItem;