import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Select,
  Spin,
  notification,
} from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import carService from '../../../../api/carService'
import customerService from '../../../../api/customerService'
import { updateCarThunk } from '../../../../redux/car/actions'
import useDebounce from '../../../../utils/hooks/useDebounce'
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
}

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
    success: 'Car has been created',
    error: 'Failed to create car, please try again',
  },
  update: {
    success: 'Car has been updated',
    error: 'Failed to update car, please try again',
  },
}

const CarForm = ({ type = 'create', carDetail }) => {
  const [form] = useForm()
  const dispatch = useDispatch()
  const [searchValue, setSearchValue] = useState('')
  const [options, setOptions] = useState([])
  const [fetching, setFetching] = useState(false)
  const debouncevalue = useDebounce(searchValue, 500)

  const handleSearch = (value) => setSearchValue(value)
  useEffect(() => {
    setFetching(true)
    setOptions([])
    const getCustomers = async () => {
      const result = await customerService.getAllCustomers({
        page: 1,
        search: debouncevalue,
      })
      if (result.data.length > 0) {
        const options = result.data.map((item) => {
          return { value: item._id, label: item.name }
        })
        setOptions(options)
      }
      setFetching(false)
    }
    getCustomers()
  }, [debouncevalue])

  useEffect(() => {
    if (!carDetail) return
    form.setFieldsValue(carDetail)
  }, [carDetail, form])
  const onFinish = async (values) => {
    try {
      if (type === 'create') {
        let { customer, ...rest } = values
        customer = { customerId: customer.value, customerName: customer.label }
        const newCar = { ...rest, customer }
        const res = await carService.createCar(newCar)
        notification.success({
          message: res.message || messages[type].success,
        })
        form.resetFields()
      } else if (type === 'update') {
        let { customer, ...rest } = values
        dispatch(updateCarThunk({ data: rest, id: carDetail._id }))
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
        isRepaired: false,
        isAtWorkShop: false,
      }}
      size="large"
    >
      <Form.Item
        name={'plateNumber'}
        label="Plate Number"
        rules={[
          {
            required: true,
          },
          {
            validator: async (_, value) => {
              if (
                /^(?:\d{2}[A-Z]-\d{3}\.\d{2}|\d{2}[A-Z]-\d{4})$/.test(value) ||
                !value
              ) {
                return Promise.resolve()
              } else return Promise.reject(new Error())
            },
            message: 'Invalid plate number',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="brand" label="Brand Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="model"
        label="Model"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="year"
        label="Year"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber className="w-full" />
      </Form.Item>

      {type === 'create' ? (
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
            value
            labelInValue
            showSearch
            filterOption={false}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            placeholder="Select users"
            onSearch={handleSearch}
            options={options}
            style={{
              width: '100%',
            }}
          />
        </Form.Item>
      ) : (
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
          <Input disabled />
        </Form.Item>
      )}

      {type === 'create' ? (
        <>
          <Form.Item
            name="isRepaired"
            valuePropName="checked"
            wrapperCol={{
              span: 16,
            }}
          >
            <Checkbox>Repaired</Checkbox>
          </Form.Item>

          <Form.Item
            name="isAtWorkShop"
            valuePropName="checked"
            wrapperCol={{
              span: 16,
            }}
          >
            <Checkbox>At Work Shop</Checkbox>
          </Form.Item>
        </>
      ) : null}

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
          <Button
            className="ml-4"
            type="default"
            onClick={() => {
              form.setFieldsValue(carDetail)
            }}
          >
            Reset
          </Button>
        )}
      </Form.Item>
    </Form>
  )
}
export default CarForm
