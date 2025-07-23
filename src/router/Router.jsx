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

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            { index: true, Component: Home },
            { path: "addArticle", Component: AddArticles },
            { path: "allArticle", Component: AllArticles },
            { path: "articles/:id", Component: AllArticlesDetails },
            { path: "MyArticles", Component: MyArticles },
            { path: "premiumArticles", Component: PremiumArticles },
            { path: "subscription", Component: Subscription },
            { path: "profile", Component: Profile },
            { path: "payment/:id", Component: Payment },
            { path: "dashboard", Component: Dashboard },
        ],
    },
    {
        path: "/",
        Component: AuthLayout,
        children: [
            { path: "login", Component: Login },
            { path: "register", Component: Register },
        ],
    },
    {
        path: "/dashboard",
        Component: DashboardLayout,
        children: [
            { index: true, Component: Dashboard },           // Dashboard main page as default under /dashboard
            { path: "allUser", Component: AllUser },
            { path: "allArticleDashboard", Component: AllArticleDashboard },
            { path: "addPublisher", Component: AddPublisher },
        ],
    },
]);
