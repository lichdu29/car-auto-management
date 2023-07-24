import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Spin,
  notification,
} from 'antd'
import { useForm, useWatch } from 'antd/es/form/Form'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import axiosInstance from '../../../../api'
import customerService from '../../../../api/customerService'
import orderService from '../../../../api/orderService'
import { updateOrderThunk } from '../../../../redux/order/actions'
import useDebounce from '../../../../utils/hooks/useDebounce'
const layout = {
  labelCol: {
    span: 12,
  },
  wrapperCol: {
    span: 24,
  },
}
const TIME_FORMAT = 'YYYY-MM-DD HH:mm'
/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
}

const messages = {
  create: {
    success: 'Order has been created',
    error: 'Failed to create order, please try again',
  },
  update: {
    success: 'Order has been updated',
    error: 'Failed to update order, please try again',
  },
}

const OrderForm = ({ type = 'create', orderDetail }) => {
  const { id } = useParams()
  const [form] = useForm()
  const dispatch = useDispatch()
  const [searchCtmValue, setSearchCtmValue] = useState('')
  const [searchServiceValue, setSearchServiceValue] = useState('')
  const [ctmOption, setCtmOption] = useState([])
  const [carOption, setCarOption] = useState([])
  const [serviceOption, setServiceOption] = useState([])
  const [fetching, setFetching] = useState(false)
  const debounceCtmValue = useDebounce(searchCtmValue, 500)
  const debounceServiceValue = useDebounce(searchServiceValue, 500)

  const { currentUser } = useSelector((state) => state.auth)

  const services = useWatch('services', form)
  const totalCost = useMemo(() => {
    if (!services) return 0
    return services.reduce((total, item) => {
      const cost = +item.label.split(': ')[1].slice(0, -1)
      return total + cost
    }, 0)
  }, [services])

  useEffect(() => {
    setFetching(true)
    setCtmOption([])
    const getCustomers = async () => {
      const result = await customerService.getAllCustomers({
        page: 1,
        search: debounceCtmValue,
      })
      if (result?.data.length > 0) {
        const options = result.data.map((item) => ({
          value: item._id,
          label: item.name,
        }))
        setCtmOption(options)
      }
      setFetching(false)
    }
    getCustomers()
  }, [debounceCtmValue])

  useEffect(() => {
    setFetching(true)
    setServiceOption([])
    const getServices = async () => {
      const result = await axiosInstance.get('/api/services', {
        params: { page: 1, search: debounceServiceValue },
      })
      if (result?.data.length > 0) {
        const options = result.data.map((item) => ({
          title: item.cost,
          label: item.name + ': ' + item.cost + '$',
          key: item.name,
          value: item._id,
        }))
        setServiceOption(options)
      }
      setFetching(false)
    }
    getServices()
  }, [debounceServiceValue])

  const handleCustomerChange = async (data) => {
    try {
      const customer = await customerService.getCustomerById(data.value)
      if (customer) {
        const cars = customer.cars
        const options = cars.map((car) => ({
          value: car.carId,
          label: car.plateNumber,
        }))
        setCarOption(options)
      }
    } catch (err) {
      notification.error({
        message: err?.error || 'Failed to select customer',
      })
    }
  }

  useEffect(() => {
    if (!orderDetail) return

    const existedServices = orderDetail.services?.map((item) => ({
      title: item.value,
      label: item.label + ': ' + item.value + '$',
      key: item.label,
      value: item.key,
    }))
    orderDetail.services = existedServices

    form.setFieldsValue(orderDetail)
  }, [orderDetail, form])

  const onFinish = async (values) => {
    const name = values.name
    const customer = {
      customerId: values.customer.value,
      customerName: values.customer.label,
    }
    const car = {
      carId: values.car.value,
      plateNumber: values.car.label,
    }
    const services = values.services.map((service) => ({
      serviceId: service.value,
      name: service.key,
      cost: service.title,
    }))

    const startDate = dayjs(values.startDate).format(TIME_FORMAT)
    // console.log(startDate)
    const endDate = values.endDate
      ? dayjs(values.endDate).format(TIME_FORMAT)
      : null
    const status = values.status
    const payment = {
      paymentStatus: values.payment,
      payAtTime: values.payment === 'PAID' ? dayjs().format(TIME_FORMAT) : null,
    }
    const data = {
      name,
      customer,
      car,
      startDate,
      endDate,
      services,
      status,
      totalCost,
      payment,
    }
    try {
      if (type === 'create') {
        const res = await orderService.createOrder(data)
        notification.success({
          message: res.message || messages[type].success,
        })
        form.resetFields()
      } else if (type === 'update') {
        const data = {
          name,
          startDate,
          endDate,
          services,
          status,
          totalCost,
          payment,
        }
        dispatch(updateOrderThunk({ id: id, data: data }))
      }
    } catch (err) {
      notification.error({
        message: err?.error || messages[type].error,
      })
    }
  }
  return (
    <Form
      form={form}
      {...layout}
      layout="vertical"
      onFinish={onFinish}
      className="bg-white p-6 shadow-md rounded-xl"
      validateMessages={validateMessages}
      initialValues={{
        status: 'WORKING',
        startDate: dayjs(),
        endDate: null,
        payment: 'UNPAID',
      }}
      size="large"
    >
      <Form.Item name="name" label="Order name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Row className="justify-between">
        <Col span={11}>
          <Form.Item
            name="customer"
            label="Customer"
            rules={[
              {
                required: true,
                message: 'Please select customer!',
              },
            ]}
          >
            <Select
              disabled={type === 'create' ? false : true}
              value
              labelInValue
              showSearch
              filterOption={false}
              notFoundContent={fetching ? <Spin size="small" /> : null}
              placeholder="Select users"
              onSearch={(value) => setSearchCtmValue(value)}
              onChange={(data) => handleCustomerChange(data)}
              options={ctmOption}
              style={{
                width: '100%',
              }}
            />
          </Form.Item>
        </Col>

        <Col span={11}>
          <Form.Item name="car" label="Car" rules={[{ required: true }]}>
            <Select
              disabled={type === 'create' ? false : true}
              value
              labelInValue
              placeholder="Select car"
              options={carOption}
              style={{
                width: '100%',
              }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="services"
        label="Services"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          mode="multiple"
          labelInValue
          optionLabelProp="label"
          showSearch
          filterOption={false}
          notFoundContent={fetching ? <Spin size="small" /> : null}
          placeholder="Select services"
          onSearch={(value) => setSearchServiceValue(value)}
          options={serviceOption}
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      <h4>Total Cost: ${totalCost}</h4>

      <Row className="justify-between">
        <Col span={5}>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select
              initialvalues="WORKING"
              options={[
                { label: 'WORKING', value: 'WORKING' },
                { label: 'DONE', value: 'DONE' },
                { label: 'PRE ORDER', value: 'PRE_ORDER' },
              ]}
            />
          </Form.Item>
        </Col>

        <Col span={5}>
          <Form.Item
            name="startDate"
            label="Start Date"
            rules={[{ required: true }]}
          >
            <DatePicker
              showTime={{ format: 'HH:mm' }}
              format={TIME_FORMAT}
              className="w-full"
            />
          </Form.Item>
        </Col>

        <Col span={5}>
          <Form.Item
            name="endDate"
            label="End Date"
            dependencies={['startDate', 'status']}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value) {
                    if (dayjs(value) < dayjs(getFieldValue('startDate')))
                      return Promise.reject(
                        new Error(
                          'Start date must be less than or equal to End date'
                        )
                      )
                    if (
                      dayjs(value) < dayjs(getFieldValue('startDate')) &&
                      getFieldValue('status') === 'WORKING'
                    )
                      return Promise.reject(
                        new Error(
                          'Start date must be less than or equal to End date'
                        )
                      )
                    return Promise.resolve()
                  } else {
                    if (getFieldValue('status') !== 'DONE')
                      return Promise.resolve()
                    return Promise.reject(new Error('End date is required'))
                  }
                },
              }),
            ]}
          >
            <DatePicker
              showTime={{ format: 'HH:mm' }}
              format={TIME_FORMAT}
              className="w-full"
            />
          </Form.Item>
        </Col>

        <Col span={5}>
          <Form.Item
            label="Payment Status"
            name="payment"
            rules={[{ required: true }]}
          >
            <Select
              disabled={type === 'create' || currentUser.role === 'STAFF'}
              initialvalues="UNPAID"
              options={[
                { label: 'PAID', value: 'PAID' },
                { label: 'UNPAID', value: 'UNPAID' },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        wrapperCol={{
          ...layout.wrapperCol,
          offset: 0,
        }}
      >
        <Button type="primary" htmlType="submit">
          {type === 'create' ? 'Submit' : 'Update'}
        </Button>
        {type === 'update' && (
          <>
            <Button
              className="ml-4 mr-4"
              type="default"
              onClick={() => {
                form.setFieldsValue(orderDetail)
              }}
            >
              Reset
            </Button>
            {orderDetail?.payment === 'UNPAID' && (
              <Link to="payment">
                <Button ghost type="primary">
                  Payment
                </Button>
              </Link>
            )}
          </>
        )}
      </Form.Item>
    </Form>
  )
}
export default OrderForm
