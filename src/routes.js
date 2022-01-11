import Home from "./pages/home";
import Created from "./pages/created";

const homeRoutes=[
    {
        path:"/",
        exact:true,
        component:Home
    },
    {
        path:"/create-product",
        exact:false,
        component:Created
    }
]

export {homeRoutes}