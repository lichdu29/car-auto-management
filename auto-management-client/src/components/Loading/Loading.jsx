import { Spin } from 'antd'

function Loading() {
  return (
    <div className="w-[100vw] h-[100vh]">
      <Spin tip="Loading" size="large" wrapperClassName="h-full">
        <div className="content"></div>
      </Spin>
    </div>
  )
}

export default Loading
