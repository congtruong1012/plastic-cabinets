import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CategoryIcon from '@mui/icons-material/Category';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FeedIcon from '@mui/icons-material/Feed';
import KitchenIcon from '@mui/icons-material/Kitchen';
import PageConstant from 'constants/PageConstant';
import Blogs from 'containers/Pages/Blogs';
import Categories from 'containers/Pages/Categories';
import Dashboard from 'containers/Pages/Dashboard';
import Orders from 'containers/Pages/Orders';
import Products from 'containers/Pages/Products';

const productMenu = [
  {
    path: PageConstant.PAGE_CATEGORIES,
    label: 'Danh mục',
    icon: CategoryIcon,
    element: Categories,
  },
  {
    path: PageConstant.PAGE_PRODUCTS,
    label: 'Sản phẩm',
    icon: KitchenIcon,
    element: Products,
  },
];

export const noMenu = [];

export const mainMenu = [
  {
    path: PageConstant.PAGE_DASHBOARD,
    label: 'Dashboard',
    icon: DashboardIcon,
    element: Dashboard,
  },
  {
    label: 'Quản lý sản phẩm',
    icon: BusinessCenterIcon,
    routes: productMenu,
  },
  {
    path: PageConstant.PAGE_ORDERS,
    label: 'Quản lý đơn hàng',
    icon: CreditCardIcon,
    element: Orders,
  },
  {
    path: PageConstant.PAGE_ORDERS,
    label: 'Blogs',
    icon: FeedIcon,
    element: Blogs,
  },
];

export default [...mainMenu, ...noMenu, ...productMenu];
