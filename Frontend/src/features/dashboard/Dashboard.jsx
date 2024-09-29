import {Box, Divider, styled, Typography} from "@mui/material";
import YourProjectsSection from "./YourProjectsSection.jsx";
import WorkSection from "./WorkSection.jsx";

const StyledDashboardBox = styled(Box)(({theme}) => ({

    [theme.breakpoints.up('sm')]: {
        padding: '2rem'
    }
}));

const StyledDashboardHeading = styled(Typography)(({theme}) => ({
    color: theme.palette.defaultBlack.dark
}));


function Dashboard() {
    return (
        // main container for dashboard
        <StyledDashboardBox id={'dashboard-main'}>
            <StyledDashboardHeading variant={'h6'} gutterBottom>
                Your Work
            </StyledDashboardHeading>
            <Divider flexItem sx={{marginBottom: "1rem"}}/>
            <YourProjectsSection/>
            <WorkSection/>
        </StyledDashboardBox>
    );
}

export default Dashboard;