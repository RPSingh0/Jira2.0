import {Divider} from "@mui/material";
import YourProjectsSection from "./projectSection/YourProjectsSection.jsx";
import WorkSection from "./workedOnSection/WorkSection.jsx";
import {StyledDashboardBox, StyledDashboardHeading} from "./DashboardStyles.jsx";

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