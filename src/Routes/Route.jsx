import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Pages/ErrorPage";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import Forgot from "../Pages/Authentication/Forgot";
import Coverage from "../Pages/Coverage/Coverage";
import Loading from "../Components/Loading";
import MyProfile from "../Pages/Profile/MyProfile";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: "/coverage",
                element: <Coverage/>,
                loader: () => fetch("./data/warehouses.json"),
                hydrateFallbackElement: <Loading/>
            },
            {
                path: "/my-profile",
                element: <MyProfile/>,
            },
        ]
    },
    {
        path: "",
        element: <AuthLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "forgot-password",
                element: <Forgot/>
            },
            {
                path: "/register",
                element: <Register/>
            }
        ]
    }
]);