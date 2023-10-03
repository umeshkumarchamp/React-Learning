import { createBrowserRouter } from "react-router-dom";
import Create from "../pages/create";
import Read from "../pages/read";
import Update from "../pages/update";
import NavLayout from '../layout';
import Register from "../pages/auth/register";
import Login from "../pages/auth/login";

export const router = createBrowserRouter([
    {
        path: "/create",
        element:(
            <NavLayout>
                <Create/>
            </NavLayout>
        ),
    },
    {
        path: "/read",
        element:
        <NavLayout>
                <Read/>
            </NavLayout>,
    },
    {
        path: "/edit/:id",
        element:<Update/>,
    },
    {
        path: "/register",
        element:<Register/>,
    },
    {
        path: "/",
        element : <Login/>,
    }
])