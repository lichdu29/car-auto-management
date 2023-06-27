import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Form, Input, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'
import { getProfileThunk, logInThunk } from '../../redux/auth/actions'
import { useEffect } from 'react'

function LogIn() {
  const dipatch = useDispatch()
  const { currentUser, isLoading } = useSelector((state) => state.auth)
  const { state } = useLocation()
  const handleSubmit = (e) => {
    dipatch(logInThunk(e))
  }
  useEffect(() => {
    if (currentUser) return
    dipatch(getProfileThunk())
  }, [currentUser, dipatch])

  const check = localStorage.getItem('_at')

  if (isLoading && check) return <Loading />
  if (currentUser) return <Navigate to={state || '/'} />

  return (
    <div className="flex justify-center h-[100vh] bg-slate-100">
      <div
        style={{ width: '400px', height: '400px' }}
        className="container drop-shadow rounded-lg p-[30px] bg-white flex flex-col items-center mt-[10%] max-w-[100%]"
      >
        <Typography.Title>Sign In</Typography.Title>
        <Form className="w-full mt-6" onFinish={handleSubmit}>
          <Form.Item
            name="username"
            rules={[
              { required: true, message: 'Please enter your Username!' },
              {
                min: 6,
                message: 'The username must be at least 6 characters',
              },
            ]}
          >
            <Input
              className="p-2"
              placeholder="Enter your username"
              prefix={
                <FontAwesomeIcon icon={faUser} style={{ color: '#999' }} />
              }
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please enter your Password!' },
              {
                min: 6,
                message: 'The username must be at least 6 characters',
              },
            ]}
          >
            <Input
              className="p-2"
              type="password"
              placeholder="Enter your password"
              prefix={
                <FontAwesomeIcon icon={faLock} style={{ color: '#999' }} />
              }
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" block size="large">
            Sign In
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default LogIn
