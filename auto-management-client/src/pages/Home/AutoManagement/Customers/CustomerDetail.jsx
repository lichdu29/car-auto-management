import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import NotFound from '../../../../components/NotFound/NotFound'
import { getCustomerDetails } from '../../../../redux/customer/actions'
import { Col, Row, Table, Timeline } from 'antd'
import CustomerForm from './CustomerForm'
import OrdersTimeline from '../../../../components/OrdersTimeline/OrdersTimeline'
import orderService from '../../../../api/orderService'

const CustomerDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state } = useLocation()
  const dispatch = useDispatch()
  const { isLoading, customerDetail } = useSelector((state) => state.customer)
  const [orderOptions, setOrderOptions] = useState([])

  useEffect(() => {
    if (!id) return
    dispatch(getCustomerDetails(id))
  }, [dispatch, id])

  useEffect(() => {
    if (!customerDetail || state?.breadcrumb) return
    navigate('.', {
      replace: true,
      state: {
        breadcrumb: customerDetail.name,
      },
    })
  }, [customerDetail, navigate, state?.breadcrumb])
  useEffect(() => {
    if (!customerDetail || customerDetail.orders.length === 0) return
    const getOrders = async () => {
      try {
        const res = await orderService.getAllOrders({
          page: 1,
          limit: 999,
          customerId: customerDetail?._id,
        })
        setOrderOptions(res.data)
      } catch (error) {
        throw new Error(error)
      }
    }
    getOrders()
  }, [customerDetail])
  if (!id || (!customerDetail && !isLoading)) {
    return <NotFound />
  }

  if (!id || (!customerDetail && !isLoading)) {
    return <NotFound />
  }
  return (
    <Row gutter={32} className="pb-6">
      <Col span={15}>
        <CustomerForm customerDetail={customerDetail} type="update" />
        <div className="p-6 rounded-xl bg-white shadow-lg mt-8 ">
          <h2 className="">Cars</h2>
          <Table
            className="-mx-6 max-w-none"
            columns={[
              {
                title: 'Plate',
                dataIndex: 'plateNumber',
                render: (text, record) => (
                  <Link
                    to={`/auto-management/cars/${record.carId}`}
                    state={{
                      breadcrumb: text,
                    }}
                  >
                    {text}
                  </Link>
                ),
              },
              {
                title: 'Car ID',
                dataIndex: 'CarId',
              },
            ]}
            rowKey={(row) => row.carId}
            dataSource={customerDetail?.cars || []}
          />
        </div>
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

export default CustomerDetail
