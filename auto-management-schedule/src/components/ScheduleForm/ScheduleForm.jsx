import React from 'react'
import { Button, DatePicker, Form, Input, notification } from 'antd'
import { useState } from 'react'
import axios from 'axios'
// import moment from 'moment'
const { RangePicker } = DatePicker

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}

const config = {
  rules: [{ type: 'object', required: true, message: 'Please select time!' }],
}

const rangeConfig = {
  rules: [{ type: 'array', required: true, message: 'Please select time!' }],
}

const ScheduleForm = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const disabledDate = (current) => {
    // Disable weekends (Saturday and Sunday)
    return current && (current.day() === 0 || current.day() === 6)
  }

  const disabledDateTime = () => {
    // Set the disabled time range (e.g., 8:00 AM to 6:00 PM)
    const disabledStart = new Date()
    disabledStart.setHours(18, 0, 0) // 6:00 PM
  
    const disabledEnd = new Date()
    disabledEnd.setHours(8, 0, 0) // 8:00 AM
  
    return {
      disabledHours: () => {
        // Disable hours outside the range (before 8:00 AM and after 6:00 PM)
        return Array.from({ length: 24 }, (_, hour) => hour).filter(
          (hour) => hour < disabledEnd.getHours() || hour > disabledStart.getHours()
        )
      },
      disabledMinutes: (hour) => {
        // Disable minutes for all hours
        // You can adjust this to allow specific minutes if needed
        return Array.from({ length: 60 }, (_, minute) => minute).filter((minute) => minute !== 0);
      },
    };
  };

  const onFinish = async (fieldsValue) => {
    try {
      setLoading(true);
      const dateTimePicker = fieldsValue['date-time-picker']
        ? fieldsValue['date-time-picker'].startOf('hour').format('YYYY-MM-DD HH:mm')
        : '';
      const values = {
        ...fieldsValue,
        dateTimePicker: fieldsValue['date-time-picker'].format('YYYY-MM-DD HH:mm'),
        fullname: fieldsValue['fullname'],
        phoneNumber: fieldsValue['phone-number'],
      };
  
      // Make the API call to submit the form data
      const response = await axios.post('http://65.108.79.164:4000/api/schedule/', values);
  
      if (response.status === 200) {
        console.log('Form submitted successfully');
        // Show success notification
        notification.success({
          message: 'Success',
          description: 'Form submitted successfully!',
        });
        // Reset the form fields after successful submission
        form.resetFields();
      } else {
        console.error('Failed to submit form');
        // Show error notification
        notification.error({
          message: 'Error',
          description: 'Failed to submit form!',
        });
      }
    } catch (error) {
      console.error('Error while submitting form:', error);
      // Show error notification
      notification.error({
        message: 'Error',
        description: error.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="time_related_controls"
      onFinish={onFinish}
      style={{ maxWidth: '700px', margin: '0 auto' }}
    >
      <Form.Item
        name="date-time-picker"
        label="DatePicker[showTime]"
        {...config}
      >
        <DatePicker
          showTime
          format="YYYY-MM-DD HH:mm"
          disabledDate={disabledDate}
          disabledTime={disabledDateTime}
        />
      </Form.Item>
      <Form.Item
        label="Your full name"
        name="fullname"
        rules={[
          { required: true, message: 'Please enter your Username!' },
          {
            min: 6,
            message: 'The full name must be at least 6 characters',
          },
        ]}
      >
        <Input className="p-2" placeholder="Enter your full name" />
      </Form.Item>
      <Form.Item
        label="Your phone number"
        name="phone-number"
        rules={[
          { required: true, message: 'Please enter your Username!' },
          {
            min: 10,
            max: 11,
            message: 'The username must be at least 10 characters',
          },
        ]}
      >
        <Input className="p-2" placeholder="Enter your phone number" />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          xs: { span: 24, offset: 0 },
          sm: { span: 16, offset: 8 },
        }}
      >
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ScheduleForm
