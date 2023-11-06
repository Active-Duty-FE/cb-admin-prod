import { MenuItemType } from '@/types'
import HomeIcon from '@mui/icons-material/Home'
import PeopleIcon from '@mui/icons-material/People'
import WidgetsIcon from '@mui/icons-material/Widgets'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import ListAltIcon from '@mui/icons-material/ListAlt'
import QueryStatsIcon from '@mui/icons-material/QueryStats'
import ListIcon from '@mui/icons-material/List'
import CategoryIcon from '@mui/icons-material/Category'

export const menuItem: MenuItemType[] = [
  {
    label: '홈',
    icon: <HomeIcon />,
    to: '/'
  },
  {
    label: '관리자',
    icon: <PeopleIcon />,
    children: [{ label: '리스트', icon: <ListIcon />, to: '/user-list' }]
  },
  {
    label: '권한관리',
    icon: <AdminPanelSettingsIcon />,
    children: [
      {
        label: '롤 리스트',
        icon: <ListIcon />,
        to: '/role-list'
      },
      {
        label: '권한 리스트',
        icon: <ListIcon />,
        to: '/permission'
      }
    ]
  },
  {
    label: '상품관리',
    icon: <LocalMallIcon />,
    children: [
      {
        label: '리스트',
        icon: <ListIcon />,
        to: '/product'
      },
      {
        label: '파라미터',
        icon: <WidgetsIcon />,
        to: '/param'
      },
      {
        label: '분류',
        icon: <CategoryIcon />,
        to: '/category'
      }
    ]
  },
  {
    label: '주문',
    icon: <ListAltIcon />,
    children: [
      {
        label: '리스트',
        icon: <ListIcon />,
        to: '/order'
      }
    ]
  },
  {
    label: '데이터',
    icon: <QueryStatsIcon />,
    children: [
      {
        label: '리스트',
        icon: <ListIcon />,
        to: '/data-view'
      }
    ]
  }
]
