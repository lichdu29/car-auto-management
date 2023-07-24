import { useEffect, useState } from 'react'
import {
  generateDataByMonth,
  generateDataByWeek,
  generateOrdersData,
  generateSalesData,
} from '..'

function useGenerateChartData(data, salesType, orderType) {
  const [salesData, setSalesData] = useState([])
  const [orderData, setOrderData] = useState([])
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

  return { salesData, orderData }
}

export default useGenerateChartData
