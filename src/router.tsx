import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/layout";
import Products, {
  loader as productLoader,
  action as productAction,
} from "./pages/Products";
import NewProduct, { action as newProductAction } from "./pages/NewProduct";
import EditProducts, {
  loader as editProductLoader,
  action as editProductAction,
} from "./pages/EditProducts";
import { action as actionProductDetails } from "./components/ProductDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "Products",
        element: <Products />,
        index: true,
        loader: productLoader,
        action: productAction,
      },
      {
        path: "New",
        element: <NewProduct />,
        action: newProductAction,
      },

      {
        path: "edit/:id",
        element: <EditProducts />,
        loader: editProductLoader,
        action: editProductAction,
      },
      {
        path: "delete/:id",
        action: actionProductDetails,
      },
    ],
  },
]);
