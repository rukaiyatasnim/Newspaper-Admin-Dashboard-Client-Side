import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AddArticles from './../Components/AddArticles/AddArticles';
import AllArticles from './../Components/AllArticles/AllArticles';
import Dashboard from './../Components/Dashboard/Dashboard';
import MyArticles from './../Components/MyArticles/MyArticles';
import PremiumArticles from './../Components/PremiumArticles/PremiumArticles';
import Subscription from './../Components/Subscription/Subscription';
import AllArticlesDetails from "../Components/AllArticles/AllArticlesDetails";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import Profile from "../Components/Profile/Profile";
import Payment from "../Components/Payment/Payment"; // <-- Import wrapper with Elements

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            { index: true, Component: Home },
            { path: "addArticle", Component: AddArticles },
            { path: "allArticle", Component: AllArticles },
            { path: "articles/:id", Component: AllArticlesDetails },
            { path: "Dashboard", Component: Dashboard },
            { path: "MyArticles", Component: MyArticles },
            { path: "premiumArticles", Component: PremiumArticles },
            { path: "subscription", Component: Subscription },
            { path: "profile", Component: Profile },
            { path: "payment/:id", Component: Payment }, // Use Payment here, NOT PaymentForm
        ]
    },
    {
        path: "/",
        Component: AuthLayout,
        children: [
            { path: 'login', Component: Login },
            { path: 'register', Component: Register },
        ]
    }
]);
