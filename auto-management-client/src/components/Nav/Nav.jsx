import { Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Link, NavLink, useLocation } from 'react-router-dom'
import logoUrl from '../../assets/logo.png'
import { useMemo } from 'react'
import { menuConfig } from '../../utils/config/config'
import { useSelector } from 'react-redux'

const getItem = ({ path, name, children, icon, parentPath, type }) => {
  const isMenuHeader = type === 'menuHeader'
  return {
    key: parentPath ? `/${parentPath}/${path}` : path,
    type: isMenuHeader && 'group',
    className: !isMenuHeader && 'menu-item',
    style: !isMenuHeader
      ? {
          paddingLeft: 0,
          margin: 0,
          padding: 0,
          height: '52px',
          width: '211px',
          marginBottom: '8px',
        }
      : {},
    label: isMenuHeader ? (
      <span className="text-[#8c8c8c] font-bold uppercase">{name}</span>
    ) : (
      <NavLink
        to={`/${parentPath}/${path}`}
        className="py-[10px] px-4 flex items-center rounded-[8px]"
      >
        <span className="icon">{icon}</span>
        <span className="text-[#141414]">{name}</span>
      </NavLink>
    ),
    children: children?.map((args) => getItem({ ...args, parentPath: path })),
    pathname: parentPath ? `/${parentPath}/${path}` : null,
  }
}
function Sidenav() {
  const currentUser = useSelector((state) => state.auth.currentUser)
  const items = useMemo(() => {
    return (
      menuConfig
        // check if role is admin
        .filter((item) =>
          currentUser?.role === 'ADMIN'
            ? item
            : item.path !== 'admin-management'
        )
        .map(getItem)
    )
  }, [currentUser])
  const { pathname } = useLocation()
  const activeKey = useMemo(() => {
    return items
      .reduce((memo, item) => memo.concat(item.children), [])
      .find((child) => pathname.includes(child.pathname))?.key
  }, [items, pathname])
  return (
    <Sider
      className="bgc-fa fixed left-0 z-50 h-[100vh] overflow-auto m-0 px-5 ml-5"
      width={250}
    >
      <Link
        to="/"
        className="flex w-full items-center justify-center h-[62px] mt-[10px] mb-[28px] "
      >
        <img src={logoUrl} alt="logo" width={100} />
      </Link>
      <hr />
      <Menu
        className="bgc-fa mt-[13px]"
        style={{ borderInlineEnd: 'none' }}
        mode="inline"
        selectedKeys={[activeKey]}
        items={items}
      ></Menu>
    </Sider>
  )
}

export default Sidenav
