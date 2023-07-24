import {
  Badge,
  Button,
  Input,
  Popconfirm,
  Radio,
  Table,
  Tag,
  Tooltip,
} from 'antd'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import {
  deleteOrderThunk,
  getAllOrderThunk,
} from '../../../../redux/order/actions'
import useDebounce from '../../../../utils/hooks/useDebounce'

const STATUS = {
  DONE: {
    label: 'Done',
    variant: 'success',
  },
  PRE_ORDER: {
    label: 'Pre Order',
    variant: 'default',
  },
  WORKING: {
    label: 'Working',
    variant: 'processing',
  },
}

const ListOrder = () => {
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState('')
  const [status, setStatus] = useState('ALL')
  const [paymentStatus, setPaymentStatus] = useState('ALL')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const { orders, page, limit, totalCount, isLoading } = useSelector(
    (state) => state.order
  )

  useEffect(() => {
    dispatch(
      getAllOrderThunk({
        page: 1,
        search: debouncedSearchTerm,
        status: status === 'ALL' ? null : status,
        paymentStatus: paymentStatus === 'ALL' ? null : paymentStatus,
      })
    )
  }, [debouncedSearchTerm, dispatch, status, paymentStatus])

  const onSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleChangePage = (page) => {
    dispatch(
      getAllOrderThunk({
        page,
      })
    )
  }
  const handleStatusChange = (event) => {
    setStatus(event.target.value)
  }

  const handlePaymentStatusChange = (event) => {
    setPaymentStatus(event.target.value)
  }

  return (
    <div className="p-6 rounded-xl bg-white shadow-lg">
      <header className="mb-5 flex items-center">
        <NavLink to="create-new-order">
          <Button
            type="primary"
            className="font-semibold shadow-xl"
            size="large"
          >
            Create New Order
          </Button>
        </NavLink>
        <div className="h-[40px] flex w-[400px] ml-auto mr-6">
          <Input.Search
            className="h-full"
            placeholder="Search by Order name, Plate number or Customer"
            onChange={onSearch}
            value={searchTerm}
            style={{ width: 400 }}
            size="large"
            loading={isLoading}
          />
        </div>
      </header>

      <div className="flex justify-end mb-4">
        <Radio.Group
          className="me-6"
          onChange={handleStatusChange}
          optionType="button"
          options={[
            {
              label: 'All',
              value: 'ALL',
            },
            {
              label: 'Working',
              value: 'WORKING',
            },
            {
              label: 'Done',
              value: 'DONE',
            },
            {
              label: 'Pre Order',
              value: 'PRE_ORDER',
            },
          ]}
        />
        <Radio.Group
          className="me-6"
          onChange={handlePaymentStatusChange}
          optionType="button"
          options={[
            {
              label: 'ALL',
              value: 'ALL',
            },
            {
              label: 'PAID',
              value: 'PAID',
            },
            {
              label: 'UNPAID',
              value: 'UNPAID',
            },
          ]}
        />
      </div>

      <Table
        className="-mx-6 max-w-none"
        columns={[
          {
            title: 'Order Name',
            dataIndex: 'name',
            fixed: 'left',
            render: (text, record) => (
              <Link
                to={record._id}
                state={{
                  breadcrumb: record.name,
                }}
              >
                {text}
              </Link>
            ),
          },
          {
            title: 'Customer',
            dataIndex: 'customer',
            fixed: 'left',
            render: (text) => <span>{text.customerName}</span>,
          },
          {
            title: 'Car',
            dataIndex: 'car',
            render: (text, record) => (
              <Link
                to={`/auto-management/cars/${record.car.carId}`}
                state={{
                  breadcrumb: text.plateNumber,
                }}
              >
                {text.plateNumber}
              </Link>
            ),
          },
          {
            title: 'Start Date',
            dataIndex: 'startDate',
            render: (text) => <span>{dayjs(text).format('YYYY-MM-DD')}</span>,
            sorter: (a, b) => dayjs(a.startDate) - dayjs(b.startDate),
          },
          {
            title: 'Status',
            dataIndex: 'status',
            render: (value) => {
              console.log(STATUS[value].variant)
              return (
                <Badge
                  status={STATUS[value].variant}
                  text={STATUS[value].label}
                />
              )
            },
          },
          {
            title: 'Payment Status',
            dataIndex: 'payment',
            render: (text, record) => {
              if (text.paymentStatus === 'PAID') {
                return (
                  <Tag
                    color={
                      text.paymentStatus === 'PAID' ? 'success' : 'processing'
                    }
                  >
                    {text.paymentStatus}
                  </Tag>
                )
              }
              return (
                <Tooltip
                  title="Pay for this order"
                  color="#108ee9"
                  placement="left"
                  mouseEnterDelay={0.02}
                >
                  <Link to={`${record._id}/payment`}>
                    <Tag
                      color={
                        text.paymentStatus === 'PAID' ? 'success' : 'processing'
                      }
                    >
                      {text.paymentStatus}
                    </Tag>
                  </Link>
                </Tooltip>
              )
            },
          },
          {
            title: 'Actions',
            dataIndex: 'actions',
            fixed: 'right',
            render: (_, record) => (
              <Popconfirm
                title="Delete"
                description="Are you sure you want to delete this order?"
                onConfirm={() => dispatch(deleteOrderThunk(record._id))}
              >
                <Button danger size="small">
                  Delete
                </Button>
              </Popconfirm>
            ),
          },
        ]}
        rowKey={(row) => row._id}
        dataSource={orders}
        pagination={{
          pageSize: limit,
          current: page,
          total: totalCount,
          onChange: handleChangePage,
        }}
      />
    </div>
  )
}

export default ListOrder
