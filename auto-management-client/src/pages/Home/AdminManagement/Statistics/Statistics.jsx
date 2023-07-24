import {
  faCircleDollarToSlot,
  faCopy,
  faFileInvoice,
  faSackDollar,
} from '@fortawesome/free-solid-svg-icons'
import { Radio } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import StatisticsCard from '../../../../components/StatisticsCard/StatisticsCard'
import { getAllOrderThunk } from '../../../../redux/order/actions'
import useGenerateChartData from '../../../../utils/hooks/useGenerateChartData'
import { growthCalculator, handleGrowthColor } from '../../../../utils'
import { reset } from '../../../../redux/order/orderSlice'

function Statistics() {
  const dispatch = useDispatch()
  const { orders } = useSelector((state) => state.order)
  const [salesChartType, setSalesChartType] = useState('day')
  const [orderChartType, setOrderChartType] = useState('day')

  const { salesData, orderData } = useGenerateChartData(
    orders,
    salesChartType,
    orderChartType
  )
  const { salesData: salesDatabyDay, orderData: orderDataByDay } =
    useGenerateChartData(orders, 'day', 'day')

  useEffect(() => {
    dispatch(
      getAllOrderThunk({
        page: 1,
        limit: 1000,
      })
    )
    return () => dispatch(reset())
  }, [dispatch])

  const handleSalesTypeChange = (event) => {
    setSalesChartType(event.target.value)
  }

  const handleOrderTypeChange = (event) => {
    setOrderChartType(event.target.value)
  }

  const totalCost = useMemo(() => {
    if (!salesData) return
    return salesData.reduce((total, cur) => total + cur.cost, 0)
  }, [salesData])

  const totalOrders = useMemo(() => {
    if (!orderData) return
    return orderData.reduce((total, cur) => total + cur.totalOrders, 0)
  }, [orderData])

  return (
    <>
      <div className="flex justify-between gap-8 min-h-24 mb-8">
        <StatisticsCard
          title="Today's Revenue"
          value={`$${salesDatabyDay.at(-1)?.cost?.toLocaleString()}`}
          icon={faCircleDollarToSlot}
          growth={growthCalculator(salesDatabyDay, 'cost')}
        />
        <StatisticsCard
          title="Today's Orders"
          value={orderDataByDay.at(-1)?.totalOrders?.toLocaleString()}
          icon={faFileInvoice}
          growth={growthCalculator(orderDataByDay, 'totalOrders')}
        />
        <StatisticsCard
          title="Total orders"
          value={totalOrders}
          icon={faCopy}
        />
        <StatisticsCard
          title="Total Revenue"
          value={`$${totalCost?.toLocaleString()}`}
          icon={faSackDollar}
        />
      </div>
      <div className="flex gap-8">
        <div className="p-8 basis-2/5 bg-neutral-100 shadow-md rounded-md">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg mb-0">Total orders</h3>
              <h4 className="font-[400] text-gray-400 mb-5">
                Growth{' '}
                <span
                  className={`font-medium ${handleGrowthColor(
                    growthCalculator(orderData, 'totalOrders')
                  )}`}
                >
                  {growthCalculator(orderData, 'totalOrders')}%
                </span>
              </h4>
            </div>
            <Radio.Group onChange={handleOrderTypeChange}>
              <Radio.Button value="day">Day</Radio.Button>
              <Radio.Button value="week">Week</Radio.Button>
              <Radio.Button value="month">Month</Radio.Button>
            </Radio.Group>
          </div>
          <ResponsiveContainer width="100%" aspect={2} height="60%">
            <BarChart data={orderData}>
              <XAxis
                dataKey="day"
                tickMargin={6}
                tick={{ stroke: '#999', strokeWidth: 0.5 }}
                tickFormatter={(day) => {
                  return dayjs(day, 'YYYY-MM-DD').format('MMM, DD') !==
                    'Invalid Date'
                    ? dayjs(day, 'YYYY-MM-DD').format('MMM, DD')
                    : day
                }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickCount={3}
                tick={{ stroke: '#999', strokeWidth: 0.5 }}
              />
              <CartesianGrid strokeDasharray="0" vertical={false} />
              <Tooltip />
              <Bar
                type="monotone"
                dataKey="totalOrders"
                fill="orange"
                maxBarSize={80}
              />
              <Legend
                iconType="plainline"
                iconSize={20}
                formatter={(_) => (
                  <span className="font-[400] text-[18px]">Total Orders</span>
                )}
              />
            </BarChart>
          </ResponsiveContainer>

          <p className="font-[500] text-gray-700 mt-auto mb-1">Note: </p>
          <span className="text-gray-500">
            A Week is defined from this Sunday to the next Sunday{' '}
          </span>
        </div>
        <div className="p-8 basis-3/5 bg-neutral-100 shadow-md rounded-md">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg mb-0">Revenue</h3>
              <h4 className="font-[400] text-gray-400 mb-5">
                Growth{' '}
                <span
                  className={`font-medium ${handleGrowthColor(
                    growthCalculator(salesData, 'cost')
                  )}`}
                >
                  {growthCalculator(salesData, 'cost')}%
                </span>
              </h4>
            </div>
            <Radio.Group onChange={handleSalesTypeChange}>
              <Radio.Button value="day">Day</Radio.Button>
              <Radio.Button value="week">Week</Radio.Button>
              <Radio.Button value="month">Month</Radio.Button>
            </Radio.Group>
          </div>
          <ResponsiveContainer aspect={2}>
            <LineChart data={salesData}>
              <XAxis
                dataKey="day"
                tickMargin={6}
                tick={{ stroke: '#999', strokeWidth: 0.5 }}
                tickFormatter={(day) => {
                  return dayjs(day, 'YYYY-MM-DD').format('MMM, DD') !==
                    'Invalid Date'
                    ? dayjs(day, 'YYYY-MM-DD').format('MMM, DD')
                    : day
                }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickCount={4}
                tick={{ stroke: '#999', strokeWidth: 0.5 }}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <CartesianGrid strokeDasharray="0" vertical={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="cost"
                stroke="orange"
                strokeWidth={2}
              />
              <Legend
                iconType="plainline"
                iconSize={20}
                formatter={(_) => (
                  <span className="font-[400] text-[18px]">Total Revenue</span>
                )}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  )
}

export default Statistics
