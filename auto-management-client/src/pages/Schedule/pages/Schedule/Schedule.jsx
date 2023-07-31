import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import axios from 'axios'
import { Modal, Form, DatePicker, Input, Button } from 'antd'
import ScheduleForm from '../../components/ScheduleForm/ScheduleForm'

const Schedule = () => {
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [form] = Form.useForm()
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
          (hour) =>
            hour < disabledEnd.getHours() || hour > disabledStart.getHours()
        )
      },
    }
  }
  const config = {
    rules: [{ type: 'object', required: true, message: 'Please select time!' }],
  }
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

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3002/api/schedule/')
      const transformedEvents = response.data.map((item) => {
        const id = item._id
        const start = moment(item.dateTimePicker).toDate()
        const end = moment(start.getTime() + 60 * 60 * 1000).toDate() // Adding 1 hour
        const title = `${item.fullname} ${item.phoneNumber}`
        const name = item.fullname
        const phone = item.phoneNumber

        return {
          id,
          start,
          end,
          title,
          name,
          phone,
        }
      })
      setEvents(transformedEvents)
    }
    fetchData()
  }, [<ScheduleForm />, form])

  useEffect(() => {
    // Set initial form values when the modal opens
    if (modalVisible && selectedEvent) {
      form.setFieldsValue({
        'date-time-picker': moment(selectedEvent.start),
        fullname: selectedEvent.name,
        'phone-number': selectedEvent.phone,
      })
      // setDateTimePickerValue(moment(selectedEvent.start)); // Optional: If you want to update dateTimePickerValue
    }
  }, [modalVisible, selectedEvent, form])

  const localizer = momentLocalizer(moment)

  const handleDoubleClickEvent = (event) => {
    setSelectedEvent(event)
    setModalVisible(true)
  }

  const onFinish = async (fieldsValue) => {
    try {
      // Handle form submission here
      const values = {
        ...fieldsValue,
        dateTimePicker: fieldsValue['date-time-picker'].toDate(), // Convert moment object to Date
        fullname: fieldsValue['fullname'],
        phoneNumber: fieldsValue['phone-number'],
      };
  
      // Send a PUT request to update the event with the new information
      await axios.put(`http://localhost:3002/api/schedule/${selectedEvent.id}`, values);
  
      setModalVisible(false);
  
      // Fetch the updated data to refresh the events in the calendar
      fetchData();
    } catch (error) {
      console.error('Error updating event:', error);
      // Handle error, show error message, etc.
    }
  };

  const onDelete = async () => {
    try {
      await axios.delete(`http://localhost:3002/api/schedule/${selectedEvent.id}`);
  
      setModalVisible(false);
    } catch (error) {
      console.error('Error delete event:', error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <>
      <div style={{ height: '90vh', marginTop: '50px', marginBottom: '50px' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onDoubleClickEvent={handleDoubleClickEvent}
        />
      </div>
      <Modal
        title="Update or Delete Schedule"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          onFinish={onFinish}
          {...formItemLayout}
          {...formItemLayout}
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
            <Input className="p-2" />
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
            <Input className="p-2" />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 16, offset: 8 },
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: '8px' }}
            >
              Update
            </Button>
            <Button
              type="primary"
              htmlType="button"
              onClick={onDelete}
              style={{ backgroundColor: 'red' }}
            >
              Delete
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <ScheduleForm />
    </>
  )
}

export default Schedule
