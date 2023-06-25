import { Button, Table, Input, Popconfirm } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import useDebounce from '../../../../utils/hooks/useDebounce'
import { deleteCarThunk, getAllCarThunk } from '../../../../redux/car/actions'

const ListCar = () => {
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const { cars, page, limit, totalCount, isLoading } = useSelector(
    (state) => state.car
  )

  useEffect(() => {
    dispatch(
      getAllCarThunk({
        page: 1,
        search: debouncedSearchTerm,
      })
    )
  }, [debouncedSearchTerm, dispatch])

  const onSearch = (e) => {
    setSearchTerm(e.target.value)
  }
  const handleChangePage = (page) => {
    dispatch(
      getAllCarThunk({
        page,
      })
    )
  }
  return (
    <div className="p-6 rounded-xl bg-white shadow-lg">
      <header className="mb-5 flex justify-between items-center">
        <NavLink to="add-new-car">
          <Button
            type="primary"
            className="font-semibold shadow-xl"
            size="large"
          >
            Add New Car
          </Button>
        </NavLink>
        <div className="h-[40px] flex w-[400px]">
          <Input.Search
            className="h-full"
            placeholder="Search by Plate number, Brand or Model"
            onChange={onSearch}
            value={searchTerm}
            style={{ width: 400 }}
            size="large"
            loading={isLoading}
          />
        </div>
      </header>
      <Table
        className="-mx-6 max-w-none"
        columns={[
          {
            title: 'Plate number',
            dataIndex: 'plateNumber',
            render: (text, record) => (
              <Link
                to={record._id}
                state={{
                  breadcrumb: record.plateNumber,
                }}
              >
                {text}
              </Link>
            ),
          },
          {
            title: 'Brand',
            dataIndex: 'brand',
          },
          {
            title: 'Model',
            dataIndex: 'model',
          },
          {
            title: 'Customer',
            dataIndex: 'customer',
            render: (text, record) => (
              <Link
                to={`/auto-management/customers/${record.customer.customerId}`}
                state={{
                  breadcrumb: text.customerName,
                }}
              >
                {text.customerName}
              </Link>
            ),
          },
          {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => (
              <Popconfirm
                title="Delete"
                description="Are you sure you want to delete this car?"
                onConfirm={() => dispatch(deleteCarThunk(record._id))}
              >
                <Button danger size="small">
                  Delete
                </Button>
              </Popconfirm>
            ),
          },
        ]}
        rowKey={(row) => row._id}
        dataSource={cars}
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

export default ListCar
