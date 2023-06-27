import Home from '../pages/Home/Home'
import LogIn from '../pages/LogIn/LogIn'
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
]
