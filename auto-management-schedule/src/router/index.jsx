import AboutUs from "../pages/Aboutus/AboutUs";
import Home from "../pages/Home/Home";
import Schedule from "../pages/Schedule/Schedule";

const Routes = [
    {
        path: '/',
        exact: true,
        element: <Home/>
    },
    {
        path: '/schedule',
        exact: true,
        element: <Schedule/>
    },
    {
        path: '/about-us',
        exact: true,
        element: <AboutUs/>
    }
]

export default Routes