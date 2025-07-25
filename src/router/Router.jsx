import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AddArticles from "../Components/AddArticles/AddArticles";
import AllArticles from "../Components/AllArticles/AllArticles";
import MyArticles from "../Components/MyArticles/MyArticles";
import PremiumArticles from "../Components/PremiumArticles/PremiumArticles";
import Subscription from "../Components/Subscription/Subscription";
import Dashboard from "../Components/Dashboard/Dashboard";
import AllArticlesDetails from "../Components/AllArticles/AllArticlesDetails";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import Profile from "../Components/Profile/Profile";
import Payment from "../Components/Payment/Payment";
import DashboardLayout from "../layouts/DashboardLayout";
import AllUser from "../Pages/Dashboard/AllUser";
import AddPublisher from "../Pages/Dashboard/AddPublisher";
import AllArticleDashboard from "../Pages/Dashboard/AllArticleDashboard";
import Error from "../Pages/Shared/Error/Error";
import PrivateRoute from './../Routes/PrivateRoute';
import AdminRoute from './../Routes/AdminRoute';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <Error />,
        children: [
            { index: true, element: <Home /> },
            {
                path: "addArticle",
                element: (
                    <PrivateRoute>
                        <AddArticles />
                    </PrivateRoute>
                ),
            },
            { path: "allArticle", element: <AllArticles /> },
            { path: "articles/:id", element: <AllArticlesDetails /> },
            {
                path: "myArticles",
                element: (
                    <PrivateRoute>
                        <MyArticles />
                    </PrivateRoute>
                ),
            },
            {
                path: "premiumArticles",
                element: (
                    <PrivateRoute>
                        <PremiumArticles />
                    </PrivateRoute>
                ),
            },
            {
                path: "subscription",
                element: (
                    <PrivateRoute>
                        <Subscription />
                    </PrivateRoute>
                ),
            },
            {
                path: "profile",
                element: (
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>
                ),
            },
            {
                path: "payment/:id",
                element: (
                    <PrivateRoute>
                        <Payment />
                    </PrivateRoute>
                ),
            },
            {
                path: "dashboard",
                element: (
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                ),
            },
        ],
    },
    {
        path: "/",
        element: <AuthLayout />,
        errorElement: <Error />,
        children: [
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
        ],
    },
    {
        path: "/dashboard",
        element: (
            <AdminRoute>
                <DashboardLayout />
            </AdminRoute>
        ),
        errorElement: <Error />,
        children: [
            { index: true, element: <Dashboard /> },
            { path: "allUser", element: <AllUser /> },
            { path: "allArticleDashboard", element: <AllArticleDashboard /> },
            { path: "addPublisher", element: <AddPublisher /> },
        ],
    },
    { path: "*", element: <Error /> },
]);
