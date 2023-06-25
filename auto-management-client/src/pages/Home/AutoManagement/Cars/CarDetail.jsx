import { Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import orderService from '../../../../api/orderService'
import NotFound from '../../../../components/NotFound/NotFound'
import OrdersTimeline from '../../../../components/OrdersTimeline/OrdersTimeline'
import { getCarDetails } from '../../../../redux/car/actions'
import CarForm from './CarForm'

const CarDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state } = useLocation()
  const dispatch = useDispatch()
  const [orderOptions, setOrderOptions] = useState([])
  const { isLoading, carDetail } = useSelector((state) => state.car)
  const customerName = carDetail?.customer.customerName
  const newCarDetail = { ...carDetail, customer: customerName }

  useEffect(() => {
    if (!id) return
    dispatch(getCarDetails(id))
  }, [dispatch, id])

  useEffect(() => {
    if (!carDetail?.plateNumber || carDetail?._id !== id) return
    const getOrders = async () => {
      try {
        const res = await orderService.getAllOrders({
          page: 1,
          limit: 100,
          search: carDetail?.plateNumber,
        })
        setOrderOptions(res.data)
      } catch (error) {
        throw new Error(error)
      }
    }
    getOrders()
  }, [carDetail?.plateNumber, carDetail?._id, id])

  useEffect(() => {
    if (!carDetail) return
    navigate('.', {
      replace: true,
      state: {
        breadcrumb: carDetail.plateNumber,
      },
    })
  }, [carDetail, navigate, state?.breadcrumb])
  if (!id || (!carDetail && !isLoading)) {
    return <NotFound />
  }
  return (
    <Row gutter={32} className="pb-6">
      <Col span={15}>
        <CarForm carDetail={newCarDetail} type="update" />
      </Col>
      <Col span={9}>
        <div className="p-6 rounded-xl bg-white shadow-lg h-full ">
          <h2 className="mb-5">Orders</h2>
          <OrdersTimeline orderOptions={orderOptions} />
        </div>
      </Col>
    </Row>
  )
}

export default CarDetail
