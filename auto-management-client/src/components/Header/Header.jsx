import React, { useMemo } from 'react'
import { Header as AntdHeader } from 'antd/es/layout/layout'
import { Breadcrumb } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { mapPathToBreadcrumb } from '../../utils/config/config'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'

const Header = () => {
  const { pathname, state } = useLocation()
  const currentUser = useSelector((state) => state.auth.currentUser)
  const items = useMemo(() => {
    const arr = pathname.split('/')
    arr.shift()
    let link = ''
    const res = arr.map((path, index) => {
      link = link + '/' + path
      if (index !== arr.length - 1) {
        return {
          title: (
            <Link className="!text-inherit" to={link}>
              {mapPathToBreadcrumb[path] || state?.breadcrumb || path}
            </Link>
          ),
        }
      } else {
        return {
          title: (
            <span>
              {mapPathToBreadcrumb[path] || state?.breadcrumb || path}
            </span>
          ),
        }
      }
    })
    return res
    // let res = []
    // let temp = JSON.parse(JSON.stringify(menuConfig))
    // while (arr.length > 0 && temp) {
    //   const i = temp?.find((item) => item.path === arr[0])
    //   arr.shift()
    //   if (!i) return {}
    //   res.push({ title: i.name })
    //   temp = i?.children
    // }

    // return res
  }, [pathname, state?.breadcrumb])

  const handleLogout = () => {
    localStorage.removeItem('_at')
    localStorage.removeItem('_rt')
    window.location.reload()
  }
  return (
    <AntdHeader className="bgc-fa h-[78px] p-4 my-[10px] mx-5 flex items-center">
      <div className="flex flex-col justify-between h-full">
        <Breadcrumb items={items} />
        <h2 className="leading-none font-bold text-lg mt-3">
          {items[items.length - 1]?.title}
        </h2>
      </div>
      <h3 className="leading-none ml-auto text-[18px] font-semibold flex gap-2 items-center">
        Hello, {currentUser.fullName}
        <span
          className=" ml-4 leading-none  text-gray-500 text-[14px] font-semibold flex gap-2 items-center cursor-pointer hover:opacity-70"
          onClick={handleLogout}
        >
          Sign out
          <FontAwesomeIcon icon={faSignOut} />
        </span>
      </h3>
    </AntdHeader>
  )
}

export default Header
