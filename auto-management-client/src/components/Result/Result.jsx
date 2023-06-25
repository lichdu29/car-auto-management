import { Button, Result } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

function SuccessResult({ title, subTitle, to, buttonName }) {
  return (
    <Result
      className="bg-white p-6 shadow-md rounded-xl h-[80vh]"
      status="success"
      title={title}
      subTitle={subTitle}
      extra={[
        <Link to={to}>
          <Button size="large" type="primary">
            {buttonName}
          </Button>
        </Link>,
      ]}
    />
  )
}

export default SuccessResult
