import {Box, Divider, styled, Typography} from "@mui/material";
import YourProjectsSection from "./YourProjectsSection.jsx";

const StyledDashboardBox = styled(Box)(({theme}) => ({

    [theme.breakpoints.up('sm')]: {
        padding: '2rem'
    }
}));


function Dashboard() {
    return (
        // main container for dashboard
        <StyledDashboardBox id={'dashboard-main'}>
            <Typography variant={'h6'} gutterBottom sx={{color: '#172b4d'}}>
                Your Work
            </Typography>
            <Divider flexItem sx={{marginBottom: "1rem"}}/>
            <YourProjectsSection/>
        </StyledDashboardBox>
    );
}

export default Dashboard;