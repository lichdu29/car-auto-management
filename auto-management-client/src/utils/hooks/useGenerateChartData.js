import { useEffect, useState } from 'react'
import {
  generateDataByMonth,
  generateDataByWeek,
  generateOrdersData,
  generateSalesData,
  generatePaidData,
  generateUnPaidData,
  generateDeliveryData,
  generateunDeliveryData,
} from '..'

function useGenerateChartData(
  data,
  salesType,
  orderType,
  paymentType,
  deliveryType = 'day'
) {
  const [salesData, setSalesData] = useState([])
  const [orderData, setOrderData] = useState([])
  const [paidData, setPaidData] = useState([])
  const [unPaidData, setUnPaidData] = useState([])
  const [delivery, setDelivery] = useState([])
  const [undelivery, setUnDelivery] = useState([])
  useEffect(() => {
    if (salesType === 'day') setSalesData(generateSalesData(data))
    if (salesType === 'week')
      setSalesData(generateDataByWeek(generateSalesData(data), 'cost'))
    if (salesType === 'month')
      setSalesData(generateDataByMonth(generateSalesData(data), 'cost'))
  }, [salesType, data])

  useEffect(() => {
    if (orderType === 'day') setOrderData(generateOrdersData(data))
    if (orderType === 'week')
      setOrderData(generateDataByWeek(generateOrdersData(data), 'totalOrders'))
    if (orderType === 'month')
      setOrderData(generateDataByMonth(generateOrdersData(data), 'totalOrders'))
  }, [orderType, data])

  useEffect(() => {
    if (paymentType === 'day') setPaidData(generatePaidData(data))
    if (paymentType === 'week')
      setPaidData(generateDataByWeek(generatePaidData(data), 'paidOrder'))
    if (paymentType === 'month')
      setPaidData(generateDataByMonth(generatePaidData(data), 'paidOrder'))
  }, [paymentType, data])

  useEffect(() => {
    if (paymentType === 'day') setUnPaidData(generateUnPaidData(data))
    if (paymentType === 'week')
      setUnPaidData(generateDataByWeek(generateUnPaidData(data), 'unpaidOrder'))
    if (paymentType === 'month')
      setUnPaidData(
        generateDataByMonth(generateUnPaidData(data), 'unpaidOrder')
      )
  }, [paymentType, data])

  useEffect(() => {
    if (deliveryType === 'day') setDelivery(generateDeliveryData(data))
    if (deliveryType === 'week')
      setDelivery(generateDataByWeek(generateDeliveryData(data), 'delivery'))
    if (deliveryType === 'month')
      setDelivery(generateDataByMonth(generateDeliveryData(data), 'delivery'))
  }, [deliveryType, data])

  useEffect(() => {
    if (deliveryType === 'day') setUnDelivery(generateunDeliveryData(data))
    if (deliveryType === 'week')
      setUnDelivery(
        generateDataByWeek(generateunDeliveryData(data), 'delivery')
      )
    if (deliveryType === 'month')
      setUnDelivery(
        generateDataByMonth(generateunDeliveryData(data), 'delivery')
      )
  }, [deliveryType, data])

  return { salesData, orderData, paidData, unPaidData, delivery, undelivery }
}

export default useGenerateChartData
