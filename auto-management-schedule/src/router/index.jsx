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
    }
]

export default Routes