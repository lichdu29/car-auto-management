import { Button, Form, Input, notification } from 'antd'
import customerService from '../../../../api/customerService'
import { useForm } from 'antd/es/form/Form'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateCustomerThunk } from '../../../../redux/customer/actions'
const layout = {
  labelCol: {
    span: 3,
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
    success: 'Customer has been created',
    error: 'Failed to create customer, please try again',
  },
  update: {
    success: 'Customer has been updated',
    error: 'Failed to update customer, please try again',
  },
}

const CustomerForm = ({ type = 'create', customerDetail }) => {
  const [form] = useForm()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!customerDetail) return
    form.setFieldsValue(customerDetail)
  }, [customerDetail, form])

  const onFinish = async (values) => {
    try {
      if (type === 'create') {
        const res = await customerService.createCustomer(values)
        notification.success({
          message: res.message || messages[type].success,
        })
        form.resetFields()
      } else if (type === 'update') {
        dispatch(updateCustomerThunk({ data: values, id: customerDetail._id }))
      }
    } catch (err) {
      notification.error({
        message: err?.message || messages[type].error,
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
      size="large"
    >
      <Form.Item
        name={'name'}
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, type: 'email' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="address"
        label="Address"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Phone"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

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
              form.setFieldsValue(customerDetail)
            }}
          >
            Reset
          </Button>
        )}
      </Form.Item>
    </Form>
  )
}
export default CustomerForm
