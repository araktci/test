import Home from "./page/dashboard/Home";
import City from "./page/settings/cities/City";
import Center from "./page/settings/centers/Center";

//comment from shmp

let routes = [
  { path: "/", element: <Home /> },
  { path: "/settings/cities", element: <City /> },
  { path: "/settings/centers", element: <Center /> },
];

export default routes;
