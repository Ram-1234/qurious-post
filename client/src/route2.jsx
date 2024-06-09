import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Register from "./users/register";
import Home from "./components/home";
import Contact from "./components/contact";
import About from "./components/about";
import Login from "./users/login";
import {PrivateRoute, PublicRoute} from "./layout/private";
import ProfilePage from './components/profile-page';
import UpdateProfile from "./profile/update-profile";


// not in use right now
function Private(){
    const router = createBrowserRouter([
        {
            path:"/",
            element:<PublicRoute/>,
            children:[
                {
                    path:"/",
                    element:<Home/>
                },
                {
                    path:"/login",
                    element:<Login/>
                },
                {
                    path:"/register",
                    element:<Register/>
                }

            ]
        },
        {
            path:"/",
            element:<PrivateRoute/>,
            children:[
                {
                    path:"/",
                    element:<ProfilePage/>
                },
                {
                    path:"/",
                    element:<UpdateProfile/>
                },
                {
                    path:"/contact",
                    element:<Contact/>
                },
                {
                    path:"/about",
                    element:<About/>
                },
            ]
        }
    ])

    return <RouterProvider router={router}/>
}

export default Private;