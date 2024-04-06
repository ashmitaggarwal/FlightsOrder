import Home from "../views/Home/home";
import Flights from "../views/Flights/flights";
import Flight from "../views/Flight/flight";
import Orders from "../views/Orders/orders";

const routes = [
  {
    label: "Home",
    path: "/",
    component: <Home/>,
    exact: true,
  },
  {
    label: "Flights",
    path: "/flights",
    component: <Flights/>,
    exact: true,
  },
  {
    label: "Orders",
    path: "/orders",
    component: <Orders/>,
    exact: true,
  },
  {
    label: "Selected flight",
    path: "/flight",
    component: <Flight/>,
    exact: true,
  },
];

export default routes;
