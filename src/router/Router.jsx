import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AddArticles from './../Components/AddArticles/AddArticles';
import AllArticles from './../Components/AllArticles/AllArticles';
import MyArticles from './../Components/MyArticles/MyArticles';
import PremiumArticles from './../Components/PremiumArticles/PremiumArticles';
import Subscription from './../Components/Subscription/Subscription';
import Dashboard from './../Components/Dashboard/Dashboard';
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
import AdminRoute from "../Routes/AdminRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "addArticle", element: <AddArticles /> },
            { path: "allArticle", element: <AllArticles /> },
            { path: "articles/:id", element: <AllArticlesDetails /> },
            { path: "myArticles", element: <MyArticles /> },
            { path: "premiumArticles", element: <PremiumArticles /> },
            { path: "subscription", element: <Subscription /> },
            { path: "profile", element: <Profile /> },
            { path: "payment/:id", element: <Payment /> },
            { path: "dashboard", element: <Dashboard /> },
        ],
    },
    {
        path: "/",
        element: <AuthLayout />,
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
        children: [
            { index: true, element: <Dashboard /> },

            { path: "allUser", element: <AllUser /> },
            { path: "allArticleDashboard", element: <AllArticleDashboard /> },
            { path: "addPublisher", element: <AddPublisher /> },
        ],
    }

]);
