import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Onboarding } from "../components/Authentication/Onboarding/Onboarding"
import { OnboardingProvider } from '../providers/Onboarding.providers';
import { Login } from "../components/Authentication/Login/Login";
import { LoginProvider } from "../providers/Login.providers";
import { HideAuthRoute, ProtectedRoute } from "./ProtectedRoute";
import { CompleteProfile } from "../components/Authentication/CompleteProfile/CompleteProfile";
import { AuthProvider } from "../providers/Auth.providers";
import { Home } from "../pages/Home/Home";
import { Chat } from "../pages/Chat/Chat";




export const AppRouter = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <ProtectedRoute><Home /></ProtectedRoute>
        },
        {
            path: '/signup',
            element: <HideAuthRoute><Onboarding /></HideAuthRoute>
        },
        {
            path: '/login',
            element:<HideAuthRoute><Login /></HideAuthRoute>
        },
        {
            path: '/complete-profile',
            element:<CompleteProfile />
        },
        {
            path:'/chat/:id',
            element:<ProtectedRoute><Chat /></ProtectedRoute>
        }

    ])

    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <LoginProvider>
                    <OnboardingProvider>
                        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
                        <RouterProvider router={router} />
                    </OnboardingProvider>
                </LoginProvider>
            </AuthProvider>
        </QueryClientProvider>
    )
}