import YourProjectsSection from "./projectSection/YourProjectsSection.jsx";
import WorkSection from "./workedOnSection/WorkSection.jsx";
import {StyledDashboardBox} from "./DashboardStyles.jsx";

function Dashboard() {
    return (
        <StyledDashboardBox id={'dashboard-main'}>
            <YourProjectsSection/>
            <WorkSection/>
        </StyledDashboardBox>
    );
}

export default Dashboard;