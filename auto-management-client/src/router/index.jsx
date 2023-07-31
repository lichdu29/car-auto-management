import Home from '../pages/Home/Home'
import LogIn from '../pages/Login/Login'
// import { Home as HomeSchedule, Schedule } from '../pages/Schedule/Schedule'
import { Schedule } from '../pages/Schedule/Schedule'
import { menuConfig } from '../utils/config/config'
import PrivateRoute from './PrivateRoute'

export const routes = [
  {
    path: '/',
    exact: true,
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
  {
    path: '/login',
    exact: true,
    element: <LogIn />,
  },
  ...menuConfig.map(({ path, children }) => ({
    path: '/' + path,
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
    children: children.map((child) => {
      const Component = child.component
      return {
        path: child.path + '/*',
        element: <Component />,
      }
    }),
  })),
  // {
  //   path: '/client',
  //   exact: true,
  //   element: <HomeSchedule />,
  // },
  {
    path: '/client/schedule',
    exact: true,
    element: <Schedule />,
  },
]
