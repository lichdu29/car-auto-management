import {
  faMoneyBills,
  faPrint,
  faQrcode,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Button,
  Col,
  Descriptions,
  Modal,
  Radio,
  Row,
  Spin,
  Table,
  Watermark,
} from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'
import dayjs from 'dayjs'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import paymentService from '../../../../api/paymentService'
import SuccessResult from '../../../../components/Result/Result'
import {
  getOrderDetails,
  updateOrderThunk,
} from '../../../../redux/order/actions'
import {
  BANK_ACCOUNT_INFO,
  RATE_USD_TO_VND,
} from '../../../../utils/constants/payment'
import { useReactToPrint } from 'react-to-print'

function OrderPayment() {
  const param = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [paymentMethodValue, setPaymentMethodValue] = useState('cash')
  const [isOpen, setIsOpen] = useState(false)
  const [qrDataURL, setQrDataURL] = useState('')
  const [qrCodeLoading, setQrCodeLoading] = useState(false)
  const [isPrintingStyle, setIsPrintingStyle] = useState(false)

  const printComponentRef = useRef(null)
  const promissResolveRef = useRef(null)
  const { orderDetail } = useSelector((state) => state.order)

  const handlePrint = useReactToPrint({
    content: () => printComponentRef.current,
    onBeforeGetContent: () => {
      return new Promise((resolve) => {
        promissResolveRef.current = resolve
        setIsPrintingStyle(true)
      })
    },
    onAfterPrint: () => {
      promissResolveRef.current = null
      setIsPrintingStyle(false)
    },
  })

  useEffect(() => {
    if (isPrintingStyle && promissResolveRef.current) {
      promissResolveRef.current()
    }
  }, [isPrintingStyle])

  useEffect(() => {
    if (!param.id) return
    dispatch(getOrderDetails(param.id))
  }, [dispatch, param.id])

  useLayoutEffect(() => {
    if (!orderDetail) return
    navigate('.', {
      replace: true,
      state: {
        breadcrumb: orderDetail?.name,
      },
    })
  }, [orderDetail, navigate])

  const handlePaymentMethodChange = (event) => {
    setPaymentMethodValue(event.target.value)
  }

  const handlePaymentClick = () => {
    setIsOpen(true)
    if (paymentMethodValue === 'bankTransfer') {
      if (qrDataURL) return
      setQrCodeLoading(true)
      paymentService
        .generateQrCodePayment({
          accountNo: BANK_ACCOUNT_INFO.accountNo,
          accountName: BANK_ACCOUNT_INFO.accountName,
          acqId: BANK_ACCOUNT_INFO.acqId,
          addInfo: `Pay for order ${orderDetail._id}`,
          amount: orderDetail.totalCost * RATE_USD_TO_VND,
          template: 'compact',
        })
        .then((res) => setQrDataURL(res.data.data.qrDataURL))
        .finally(() => setQrCodeLoading(false))
    }
  }

  const handleOk = () => {
    dispatch(
      updateOrderThunk({
        id: orderDetail._id,
        data: {
          payment: {
            paymentStatus: 'PAID',
            payAtTime: dayjs().format('YYYY-MM-DD'),
          },
        },
      })
    )
    setIsOpen(false)
  }

  if (orderDetail?.payment.paymentStatus === 'PAID')
    return (
      <SuccessResult
        title="Payment order successful!!!"
        subTitle={`The payment status of the order ${orderDetail?._id} has been updated`}
        to={'/auto-management/orders'}
        buttonName="Go to Order List"
      />
    )

  return (
    <Row className="bg-white shadow-md rounded-xl">
      <Col span={9} className="p-6">
        <h2>Payment Method</h2>
        <div className="mt-3">
          <h4>USD to VND Exchange Rate</h4>
          <p className="text-red-500">1 USD = {RATE_USD_TO_VND} VND</p>
        </div>
        <Radio.Group
          onChange={handlePaymentMethodChange}
          value={paymentMethodValue}
          className="flex flex-col my-6"
        >
          <Radio
            value="cash"
            className={`border rounded-xl border-solid px-3 mb-3 me-0 ${
              paymentMethodValue === 'cash'
                ? 'border-blue-500'
                : 'opacity-60 border-gray-500'
            } `}
          >
            <div className="flex justify-center items-center">
              <div className="p-3 text-xl mr-2">
                <FontAwesomeIcon
                  icon={faMoneyBills}
                  width={30}
                  className="text-[#047857]"
                />
              </div>
              <div className="font-medium">
                <span>CASH</span>
                <br />
                <span>Payment in cash</span>
              </div>
            </div>
          </Radio>
          <Radio
            value="bankTransfer"
            className={`border rounded-xl border-solid px-3 me-0 ${
              paymentMethodValue === 'bankTransfer'
                ? 'border-blue-500'
                : 'opacity-60 border-gray-500'
            } `}
          >
            <div className="flex justify-center items-center">
              <div className="p-3 text-xl mr-2">
                <FontAwesomeIcon icon={faQrcode} width={30} />
              </div>
              <div className="font-medium">
                <span>Bank transfer by Qr Code</span>
                <br />
                <span>Money transfer by e-wallet</span>
              </div>
            </div>
          </Radio>
        </Radio.Group>
        <Button
          type="primary"
          className="w-full"
          size="large"
          onClick={handlePaymentClick}
        >
          Payment ${orderDetail?.totalCost}
        </Button>
        <Modal
          width={paymentMethodValue === 'bankTransfer' ? 1000 : 600}
          title="Payment confirmation"
          open={isOpen}
          onOk={handleOk}
          //   confirmLoading={confirmLoading}
          onCancel={() => setIsOpen(false)}
          footer={[
            <Button key="submit" type="primary" onClick={handleOk}>
              Confirm
            </Button>,
            <Button key="back" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>,
          ]}
        >
          <p>
            {paymentMethodValue === 'cash'
              ? 'Are you sure the customer has paid for this order?'
              : 'Please Scan this Qr Code to pay for your order'}
          </p>
          {qrDataURL && paymentMethodValue === 'bankTransfer' && (
            <div className="flex">
              <div className="col-12 flex justify-center items-center">
                <img src={qrDataURL} alt="qrcode" width={300} height={300} />
              </div>
              <div className="col-12">
                <Descriptions title="Bank account info" column={1} bordered>
                  <Descriptions.Item label="Bank">
                    {BANK_ACCOUNT_INFO.bankName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Account number">
                    <Paragraph copyable>
                      {BANK_ACCOUNT_INFO.accountNo}
                    </Paragraph>
                  </Descriptions.Item>
                  <Descriptions.Item label="Account name">
                    <Paragraph copyable>
                      {BANK_ACCOUNT_INFO.accountName}
                    </Paragraph>
                  </Descriptions.Item>
                  <Descriptions.Item label="Description">
                    <Paragraph copyable>
                      Pay for order {orderDetail?._id}
                    </Paragraph>
                  </Descriptions.Item>
                  <Descriptions.Item label="Amount">
                    ${orderDetail?.totalCost} ={' '}
                    {(
                      orderDetail?.totalCost * RATE_USD_TO_VND
                    ).toLocaleString()}{' '}
                    VND
                  </Descriptions.Item>
                </Descriptions>
              </div>
            </div>
          )}
          {qrCodeLoading && (
            <div className=" text-center font-medium">
              <Spin />
              <br />
              <span className="mt-1">Wait a moment...</span>
            </div>
          )}
        </Modal>
      </Col>
      <Col span={15} className="p-6 flex flex-col">
        <Button
          type="ghost"
          onClick={handlePrint}
          className="font-medium text-lg mb-2 ml-auto"
        >
          Print
          <FontAwesomeIcon icon={faPrint} className="ml-2" />
        </Button>
        <div className=" rounded border border-solid border-blue-500">
          <div ref={printComponentRef}>
            <Watermark
              font={{ color: 'rgba(0,0,0,.1)' }}
              content={['Best Shop', 'Quality Seputation']}
            >
              <div
                className={`pl-16 py-12 pr-8 ${
                  isPrintingStyle && 'h-[1030px]'
                }`}
              >
                <h2 className="text-center font-bold text-2xl">BEST SHOP</h2>
                <div className="my-4">
                  <h2 className="font-bold">Order Info</h2>
                  {orderDetail && (
                    <ul className="list-none text-[16px] ps-0">
                      <li>
                        Order number:{' '}
                        <span className="">{orderDetail._id}</span>
                      </li>
                      <li>
                        Customer name:{' '}
                        <span className="font-semibold">
                          {orderDetail.customer.customerName}
                        </span>
                      </li>
                      <li>
                        Car:{' '}
                        <span className="font-semibold">
                          {orderDetail.car.plateNumber}
                        </span>
                      </li>
                      <li>
                        Date:{' '}
                        <span className="">
                          {dayjs().format('MMM DD, YYYY HH:mm:ss')}
                        </span>
                      </li>
                    </ul>
                  )}
                </div>
                <Table
                  className="border rounded-xl border-solid border-gray-200"
                  rowKey={(row) => row._id}
                  // rowClassName={(record, index) => index === 0 && 'bg-blue-300'}
                  columns={[
                    {
                      title: 'Description',
                      dataIndex: 'name',
                      render: (text) => <span>{text}</span>,
                    },
                    {
                      title: 'Price',
                      dataIndex: 'cost',
                      render: (text) => <span>${text}</span>,
                    },
                  ]}
                  dataSource={orderDetail?.services}
                  summary={() => (
                    <Table.Summary.Row className="font-bold">
                      <Table.Summary.Cell index={0} className="font-medium">
                        Total
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={1}>
                        <span type="danger">${orderDetail?.totalCost}</span>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  )}
                  pagination={false}
                ></Table>
              </div>
            </Watermark>
          </div>
        </div>
      </Col>
    </Row>
  )
}

export default OrderPayment
