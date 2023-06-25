import { Table } from 'antd'
import React from 'react'
import moment from 'moment'
const TableService = ({ data }) => {
  return (
    <Table
      className="-mx-6 max-w-none"
      columns={[
        {
          title: 'Name',
          dataIndex: 'name',
          render: (text, record) => (
            <strong className="text-gray-500">{text}</strong>
          ),
          width: '40%',
        },
        {
          title: 'Price',
          dataIndex: 'cost',
          width: '30%',
          className: 'text-blue-500',
          render: (text, record) => text + '$',
        },

        {
          title: 'Updated Date',
          dataIndex: 'date',
          render: (date, record) => moment(date).format('YYYY-MM-DD'),
          width: '30%',
        },
      ]}
      rowKey={(row) => row._id}
      dataSource={data}
      pagination={false}
    />
  )
}

export default TableService
