import Login from "./features/auth/Login.jsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import WelcomeHome from "./features/welcome/WelcomeHome.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import ProtectedRoute from "./features/auth/ProtectedRoute.jsx";
import AppLayout from "./components/appLayout/AppLayout.jsx";
import {lazy, Suspense} from "react";

const Dashboard = lazy(() => import('./features/dashboard/Dashboard.jsx'));
const Projects = lazy(() => import('./features/projects/Projects.jsx'));
const CreateProject = lazy(() => import('./features/project/create/CreateProject.jsx'));
const ProjectDetail = lazy(() => import('./features/project/detail/ProjectDetail.jsx'));
const FeatureDetail = lazy(() => import('./features/feature/detail/FeatureDetail.jsx'));
const JiraDetail = lazy(() => import('./features/jira/detail/JiraDetail.jsx'));


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
                <Suspense>
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
                                <Route path={":projectKey/feature/:featureKey/:jiraKey"} element={<JiraDetail/>}/>
                            </Route>
                        </Route>
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;