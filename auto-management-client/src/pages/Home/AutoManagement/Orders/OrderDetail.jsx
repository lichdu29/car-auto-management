import dayjs from 'dayjs'
import React, { useEffect, useLayoutEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import NotFound from '../../../../components/NotFound/NotFound'
import { getOrderDetails } from '../../../../redux/order/actions'
import OrderForm from './OrderForm'

const OrderDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state } = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!id) return
    dispatch(getOrderDetails(id))
  }, [dispatch, id])

  const { isLoading, orderDetail } = useSelector((state) => state.order)

  const newOrderDetail = useMemo(() => {
    const customer = {
      label: orderDetail?.customer.customerName,
      value: orderDetail?.customer.customerId,
    }
    const car = {
      label: orderDetail?.car.plateNumber,
      value: orderDetail?.car.carId,
    }
    const startDate = dayjs(orderDetail?.startDate, 'YYYY-MM-DD')
    const endDate = orderDetail?.endDate
      ? dayjs(orderDetail.endDate, 'YYYY-MM-DD')
      : null
    const services = orderDetail?.services.map((service) => ({
      value: service.cost,
      label: service.name,
      key: service.serviceId,
    }))
    const status = orderDetail?.status
    const name = orderDetail?.name
    const payment = orderDetail?.payment.paymentStatus
    return {
      customer,
      car,
      startDate,
      endDate,
      services,
      status,
      name,
      payment,
    }
  }, [orderDetail])

  useLayoutEffect(() => {
    if (!orderDetail) return
    navigate('.', {
      replace: true,
      state: {
        breadcrumb: orderDetail.name,
      },
    })
  }, [orderDetail, navigate, state?.breadcrumb])

  if (!id || (!orderDetail && !isLoading)) {
    return <NotFound />
  }
  return <OrderForm orderDetail={newOrderDetail} type="update" />
}

export default OrderDetail
