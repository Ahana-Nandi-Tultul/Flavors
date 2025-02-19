import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../pages/Home/Home";
import ItemDetails from "../pages/Home/ItemDetails/ItemDetails";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Dashboard from "../Layouts/Dashboard";
import AdminHome from "../pages/Dashboard/Admin/AdminHome/AdminHome";
import PrivateRoute from "./PrivateRoute";
import AdminRoutes from "./AdminRoutes";
import CustomerHome from "../pages/Dashboard/Customers/CustomerHome/CustomerHome";
import CustomerRoutes from "./CustomerRoutes";
import AllProducts from "../pages/Dashboard/Admin/Products/AllProducts/AllProducts";
import AddItem from "../pages/Dashboard/Admin/Products/AddItem/AddItem";

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
        path: "dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
          {
            path : "adminHome",
            element: <AdminRoutes><AdminHome></AdminHome></AdminRoutes>
          },
          {
              path: "adminAllItems",
              element: <AdminRoutes><AllProducts></AllProducts></AdminRoutes>
          },
          {
              path: "adminAddItem",
              element: <AdminRoutes><AddItem></AddItem></AdminRoutes>
          },
          {
             path: "customerHome",
             element:<CustomerRoutes><CustomerHome></CustomerHome></CustomerRoutes> 
          }

        ]
    },
    {
        path: '/item/:id',
        element: <ItemDetails></ItemDetails>
   }
  ]);