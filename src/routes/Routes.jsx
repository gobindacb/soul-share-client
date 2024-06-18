import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PostDetails from "../pages/PostDetails";
import AddVolunteerPost from "../pages/AddVolunteerPost";
import ManageMyPost from "../pages/ManageMyPost";
import UpdatePost from "../pages/UpdatePost";
import PrivateRoute from "./PrivateRoute";
import MyRequested from "../pages/MyRequested";
import NeedVolunteer from "../pages/NeedVolunteer";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        errorElement: <ErrorPage/>,
        children: [
        {
            index: true,
            element: <Home/>,
            loader: () => fetch(`${import.meta.env.VITE_API_URL}/posts`)
        },
        {
            path: '/login',
            element: <Login/>
        },
        {
            path: '/register',
            element: <Register/>
        },
        {
            path: '/post/:id',
            element: <PrivateRoute><PostDetails/></PrivateRoute>,
            loader: ({params}) => fetch (`${import.meta.env.VITE_API_URL}/post/${params.id}`)
        },
        {
            path: '/add-post',
            element: <PrivateRoute><AddVolunteerPost/></PrivateRoute>
        },
        {
            path: '/manage-my-post',
            element: <PrivateRoute><ManageMyPost/></PrivateRoute>
        },
        {
            path: '/updatePost/:id',
            element: <PrivateRoute><UpdatePost/></PrivateRoute>,
            loader: ({params}) => fetch (`${import.meta.env.VITE_API_URL}/post/${params.id}`)
        },
        {
            path: '/my-requested',
            element: <PrivateRoute><MyRequested/></PrivateRoute>
        },
        {
            path: '/need-volunteer',
            element: <NeedVolunteer/>
        }
    ]
    }
])

export default router;