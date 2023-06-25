import { faPlus, faSquareMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Col, Form, Input, InputNumber, Modal, Row } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { updateServiceThunk } from '../../../../redux/service/actions'

const ServicesForm = ({ type, services }) => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const onFinish = (values) => {
    Modal.warning({
      title: `Update ${type}`,
      content: 'Are you sure you want to update?',
      okCancel: true,
      onOk: async () => {
        const payload = {
          update: [],
          add: [],
          delete: [],
        }
        // Handle the update payload
        let updateServices = new Map()
        values[type].forEach((value) => {
          if (value._id) return updateServices.set(value._id, value)
          payload.add.push({ ...value, type })
        })
        services.forEach(({ _id, name, cost }) => {
          const updateService = updateServices.get(_id)
          if (!updateService) return payload.delete.push(_id)
          if (updateService.name !== name || updateService.cost !== cost)
            payload.update.push(updateService)
        })

        dispatch(updateServiceThunk(payload))
      },
    })
  }

  return (
    <Form
      form={form}
      onFinish={onFinish}
      autoComplete="off"
      initialValues={{
        [type]: services,
      }}
    >
      <Form.List name={type}>
        {(fields, { add, remove }) => {
          return (
            <>
              {fields.map((field) => (
                <Row gutter={16} key={field.key} className="w-full flex">
                  <Col span={14}>
                    <Form.Item
                      {...field}
                      wrapperCol={18}
                      name={[field.name, 'name']}
                      rules={[{ required: true, message: 'Missing name' }]}
                      label="Name"
                    >
                      <Input placeholder="Service Name" />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      {...field}
                      label="Price"
                      name={[field.name, 'cost']}
                      rules={[
                        {
                          required: true,
                          message: 'Missing price',
                        },
                      ]}
                    >
                      <InputNumber
                        className="w-full"
                        placeholder="Service Price"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <div className="h-8 flex items-center">
                      <FontAwesomeIcon
                        className="text-red-500 text-lg cursor-pointer"
                        icon={faSquareMinus}
                        onClick={() => {
                          remove(field.name)
                        }}
                      />
                    </div>
                  </Col>
                </Row>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<FontAwesomeIcon icon={faPlus} />}
                >
                  Add service
                </Button>
              </Form.Item>
            </>
          )
        }}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button
          type="default"
          className="ml-5"
          onClick={() => form.resetFields()}
        >
          Reset
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ServicesForm
