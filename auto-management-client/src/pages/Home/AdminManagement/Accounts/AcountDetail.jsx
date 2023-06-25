import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import NotFound from '../../../../components/NotFound/NotFound'
import { getUserDetails } from '../../../../redux/user/actions'
import CustomerForm from './AccountForm'

const CustomerDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state } = useLocation()
  const dispatch = useDispatch()
  const { isLoading, userDetail } = useSelector((state) => state.user)
  useEffect(() => {
    if (!id) return
    dispatch(getUserDetails(id))
  }, [dispatch, id])

  useEffect(() => {
    if (!userDetail || state?.breadcrumb) return
    navigate('.', {
      replace: true,
      state: {
        breadcrumb: userDetail.fullName,
      },
    })
  }, [userDetail, navigate, state?.breadcrumb])
  if (!id || (!userDetail && !isLoading)) {
    return <NotFound />
  }
  return <CustomerForm userDetail={userDetail} type="update" />
}

export default CustomerDetail
