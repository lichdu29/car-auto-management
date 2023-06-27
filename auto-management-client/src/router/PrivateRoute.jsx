import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import Loading from '../components/Loading/Loading'
import { getProfileThunk } from '../redux/auth/actions'

const PrivateRoute = ({ children }) => {
  const location = useLocation()
  const { currentUser, isLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    if (currentUser) return
    dispatch(getProfileThunk())
  }, [currentUser, dispatch])

  if (isLoading) return <Loading />

  if (!isLoading && !currentUser)
    return <Navigate to={'/login'} state={location} />
  else return children
}

export default PrivateRoute
