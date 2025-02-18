import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../pages/Home/Home";
import ItemDetails from "../pages/Home/ItemDetails/ItemDetails";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";

 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
       {
            path: "/",
            element: <Home></Home>,
            loader: () => fetch(`http://localhost:5000/totalItems`)
       },
       {
            path: "/login",
            element:<Login></Login>
       },
       {
          path: "/signup",
          element: <Signup></Signup>
       }
      ]
    },
    {
        path: '/item/:id',
        element: <ItemDetails></ItemDetails>
   }
  ]);