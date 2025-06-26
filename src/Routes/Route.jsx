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
import VerifyCode from "../Pages/Authentication/VerifyCode";
import PrivetRoute from "./PrivetRoute";
import DashBoardLayout from "../Layouts/DashBoardLayout";
import MyParcels from "../Pages/Dashboard/MyParcels";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashboardError from "../Pages/Dashboard/DashboardError";
import Payment from "../Pages/Dashboard/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory";
import TrackParcel from "../Pages/Dashboard/TrackParcel";

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
                path: "/add-parcel",
                element: <PrivetRoute><SendParcel/></PrivetRoute>,
                loader: () => fetch("./data/warehouses.json"),
                hydrateFallbackElement: <Loading/>
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
            },
            {
                path: "/verify-code",
                element: <VerifyCode/>
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivetRoute><DashBoardLayout/></PrivetRoute>,
        errorElement: <DashboardError/>,
        children: [
            {
                path: "my-parcels",
                element: <MyParcels/>
            },
            {
                path: "payment/:id",
                element: <Payment/>
            },
            {
                path: "payment-history",
                element: <PaymentHistory/>
            },
            {
                path: "track-parcel",
                element: <TrackParcel/>
            }
        ]
    }
]);