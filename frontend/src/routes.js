import Comments from "./Pages/Comments/Comments";
import Home from "./Pages/Home/Home";
import Orders from "./Pages/Orders/Orders";
import Products from "./Pages/Products/Products";
import Users from "./Pages/Users/Users";

let routes = [
  { path: "/", element: <Home /> },
  { path: "/comments", element: <Comments /> },
  { path: "/orders", element: <Orders /> },
  { path: "/products", element: <Products /> },
  { path: "/users", element: <Users /> },
];

export default routes;
