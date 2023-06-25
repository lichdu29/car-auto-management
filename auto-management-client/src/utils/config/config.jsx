import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Services from '../../pages/Home/AutoManagement/Services/Services'
import AdminServices from '../../pages/Home/AdminManagement/Services/Services'
import {
  faCar,
  faFileInvoice,
  faGears,
  faScrewdriverWrench,
  faUserGear,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'
import Customer from '../../pages/Home/AutoManagement/Customers/Customers'
import Orders from '../../pages/Home/AutoManagement/Orders/Orders'
import Cars from '../../pages/Home/AutoManagement/Cars/Cars'
import Accounts from '../../pages/Home/AdminManagement/Accounts/Accounts'

export const menuConfig = [
  {
    path: 'auto-management',
    name: 'Auto Management',
    type: 'menuHeader',
    children: [
      {
        path: 'services',
        name: 'Services',
        component: Services,
        icon: <FontAwesomeIcon icon={faScrewdriverWrench} />,
      },
      {
        path: 'customers',
        name: 'Customers',
        component: Customer,
        icon: <FontAwesomeIcon icon={faUsers} />,
      },
      {
        path: 'orders',
        name: 'Orders',
        component: Orders,
        icon: <FontAwesomeIcon icon={faFileInvoice} />,
      },
      {
        path: 'cars',
        name: 'Cars',
        component: Cars,
        icon: <FontAwesomeIcon icon={faCar} />,
      },
    ],
  },
  {
    path: 'admin-management',
    name: 'Admin Management',
    type: 'menuHeader',
    children: [
      {
        path: 'accounts',
        name: 'Accounts',
        component: Accounts,
        icon: <FontAwesomeIcon icon={faUserGear} />,
      },
      {
        path: 'services',
        name: 'Services',
        component: AdminServices,
        icon: <FontAwesomeIcon icon={faGears} />,
      },
    ],
  },
]

export const mapPathToBreadcrumb = {
  'auto-management': 'Auto Management',
  'admin-management': 'Admin Management',
  services: ' Services',
  customers: ' Customers',
  orders: ' Orders',
  cars: ' Cars',
  accounts: ' Accounts',
  'create-new-customer': 'Create New Customer',
  payment: 'payment',
}
