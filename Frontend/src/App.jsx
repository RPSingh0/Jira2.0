import Login from "./features/auth/Login.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import WelcomeHome from "./features/home/WelcomeHome.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

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
                    <Route path={"/"} element={<WelcomeHome/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;