import Home from "../pages/Home";
import Detial from '../pages/detial'
import Create from "../pages/create";
import ComingSoon from "../pages/ComingSoon";
import Search from "../pages/Search";
import { createBrowserRouter  } from "react-router-dom";
import Layout from "../pages/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "/books/:id",
        element: <Detial />
      },
      {
        path: "/create",
        element: <Create />
      },
      {
        path: '/edit/:id',
        element: <Create />
      },
      {
        path: "/comingSoon",
        element: <ComingSoon />
      },
      {
        path: "/search",
        element: <Search />
      }
    ]
  }
]);

export default router;
