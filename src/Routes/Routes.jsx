import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../pages/Home/Home";
import ItemDetails from "../pages/Home/ItemDetails/ItemDetails";

 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
       {
            path: "/",
            element: <Home></Home>
       },
      ]
    },
    {
        path: '/item/:id',
        element: <ItemDetails></ItemDetails>
   }
  ]);