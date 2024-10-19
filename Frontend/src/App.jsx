import Login from "./features/auth/Login.jsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import WelcomeHome from "./features/welcome/WelcomeHome.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import ProtectedRoute from "./features/auth/ProtectedRoute.jsx";
import AppLayout from "./components/appLayout/AppLayout.jsx";
import Dashboard from "./features/dashboard/Dashboard.jsx";
import Projects from "./features/projects/Projects.jsx";
import CreateProject from "./features/project/CreateProject.jsx";
import ProjectDetail from "./features/project/ProjectDetail.jsx";
import FeatureDetail from "./features/feature/FeatureDetail.jsx";
import JiraDetail from "./features/jira/JiraDetail.jsx";
import {JiraDetailContextProvider} from "./features/jira/JiraDetailContext.jsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0
        }
    }
})

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false}/>
            <BrowserRouter>
                <Routes>
                    <Route index path={"welcome"} element={<WelcomeHome/>}/>
                    <Route path={"login"} element={<Login/>}/>
                    <Route path={"/"} element={<ProtectedRoute><AppLayout/></ProtectedRoute>}>
                        <Route index element={<Navigate replace to={"dashboard"}/>}/>
                        <Route path={"dashboard"} element={<Dashboard/>}/>
                        <Route path={"project"}>
                            <Route index element={<Projects/>}/>
                            <Route path={"create"} element={<CreateProject/>}/>
                            <Route path={":projectKey"} element={<ProjectDetail/>}/>
                            <Route path={":projectKey/feature/:featureKey"} element={<FeatureDetail/>}/>
                            <Route path={":projectKey/feature/:featureKey/:jiraKey"} element={
                                <JiraDetailContextProvider>
                                    <JiraDetail/>
                                </JiraDetailContextProvider>
                            }/>
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;