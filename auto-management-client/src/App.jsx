import { notification } from 'antd'
import 'antd/dist/reset.css'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRoutes } from 'react-router-dom'
import './App.css'
import { routes } from './router'
import { openNotification } from './utils/notification'

const App = () => {
  const [api, contextHolder] = notification.useNotification()
  const notifi = useSelector((state) => state.notifi)

  // set api show notifications
  useEffect(() => {
    if (notifi.type) openNotification[notifi.type](api, notifi.description)
  }, [notifi, api])

  const element = useRoutes(routes)

  return (
    <>
      {contextHolder}
      {element}
    </>
  )
}

export default App
