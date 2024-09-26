import Login from "./features/auth/Login.jsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import WelcomeHome from "./features/welcome/WelcomeHome.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import ProtectedRoute from "./features/auth/ProtectedRoute.jsx";
import AppLayout from "./components/appLayout/AppLayout.jsx";
import Dashboard from "./features/dashboard/Dashboard.jsx";

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
                    <Route path={"/"} element={
                        <ProtectedRoute>
                            <AppLayout/>
                        </ProtectedRoute>}>
                        <Route index element={<Navigate replace to={"dashboard"}/>}/>
                        <Route path={"dashboard"} element={<Dashboard/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;