import { Button, Table, Input, Popconfirm } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import useDebounce from '../../../../utils/hooks/useDebounce'
import {
  deleteUserThunk,
  getAllUserThunk,
} from '../../../../redux/user/actions'

const ListAccount = () => {
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const { users, page, limit, totalCount, isLoading } = useSelector(
    (state) => state.user
  )
  useEffect(() => {
    dispatch(
      getAllUserThunk({
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
      getAllUserThunk({
        page,
      })
    )
  }
  return (
    <div className="p-6 rounded-xl bg-white shadow-lg">
      <header className="mb-5 flex justify-between items-center">
        <NavLink to="create-new-account">
          <Button
            type="primary"
            className="font-semibold shadow-xl"
            size="large"
          >
            Create New Account
          </Button>
        </NavLink>
        <div className="h-[40px] flex w-[400px]">
          <Input.Search
            className="h-full"
            placeholder="Search by Name or Phone Number"
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
            title: 'User Name',
            dataIndex: 'username',
            render: (text, record) => (
              <Link
                to={record._id}
                state={{
                  breadcrumb: record.fullName,
                }}
              >
                {text}
              </Link>
            ),
          },
          {
            title: 'Full Name',
            dataIndex: 'fullName',
          },
          {
            title: 'Email Address',
            dataIndex: 'email',
          },
          {
            title: 'Phone Number',
            dataIndex: 'phone',
          },
          {
            title: 'Role',
            dataIndex: 'role',
          },
          {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => (
              <Popconfirm
                title="Delete"
                description="Are you sure you want to delete this account?"
                onConfirm={() => dispatch(deleteUserThunk(record._id))}
              >
                <Button danger size="small">
                  Delete
                </Button>
              </Popconfirm>
            ),
          },
        ]}
        rowKey={(row) => row._id}
        dataSource={users}
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

export default ListAccount
