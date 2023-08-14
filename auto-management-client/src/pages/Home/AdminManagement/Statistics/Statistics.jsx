import {
  faCircleDollarToSlot,
  faCopy,
  faFileInvoice,
  faSackDollar,
} from '@fortawesome/free-solid-svg-icons'
import { Radio, Table, Select } from 'antd'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState, useRef, useCallback } from 'react'
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
import { getAllUserThunk } from '../../../../redux/user/actions'
function Statistics() {
  const chartRef = useRef(null)
  const dispatch = useDispatch()
  const { orders } = useSelector((state) => state.order)
  const [salesChartType, setSalesChartType] = useState('day')
  const [optionOrderName, setOptionOrderName] = useState([])
  const [selectNameOrder, setSelectNameOrder] = useState('')
  const [orderChartType, setOrderChartType] = useState('day')
  const [status, setStatus] = useState('ALL')
  const { users } = useSelector((state) => state.user)
  const [orderList, setOrderList] = useState([])
  const { salesData, orderData, paidData, unPaidData, delivery, undelivery } =
    useGenerateChartData(orders, salesChartType, orderChartType, 'day')
  const { salesData: salesDatabyDay, orderData: orderDataByDay } =
    useGenerateChartData(orders, 'day', 'day', 'day')

  useEffect(() => {
    dispatch(
      getAllOrderThunk({
        page: 1,
        limit: 1000,
        status: status === 'ALL' ? null : status,
        search: selectNameOrder,
      })
    )
    return () => dispatch(reset())
  }, [dispatch, status, selectNameOrder])

  useEffect(() => {
    dispatch(
      getAllUserThunk({
        page: 1,
      })
    )
  }, [dispatch])

  useEffect(() => {
    const result = Object.values(
      [...paidData, ...unPaidData].reduce(
        (acc, { idEmployee, paid, unpaid }) => {
          if (!acc[idEmployee]) {
            acc[idEmployee] = { idEmployee, paid: 0, unpaid: 0 }
          }
          if (
            paidData.some(
              (item) => item.idEmployee === idEmployee && item.paid === paid
            )
          ) {
            acc[idEmployee].paid += paid
          }
          if (
            unPaidData.some(
              (item) => item.idEmployee === idEmployee && item.unpaid === unpaid
            )
          ) {
            acc[idEmployee].unpaid += unpaid
          }
          return acc
        },
        {}
      )
    )
    setOrderList(result)
  }, [paidData, unPaidData])

  useEffect(() => {
    const getList = () => {
      let tmpOptionOrderName = [
        {
          value: '',
          label: 'All',
        },
      ]
      getListOrderNameChart().forEach((item) => {
        tmpOptionOrderName.push({
          value: item,
          label: item,
        })
      })
      setOptionOrderName(tmpOptionOrderName)
    }
    if (selectNameOrder === '') {
      getList()
    }
  }, [orders])

  const getListOrderNameChart = () => {
    let listName = []
    orders.forEach((item) => {
      let name = item?.customer?.customerName
      if (!listName.includes(name)) {
        listName.push(name)
      }
    })
    return listName
  }

  const getListDataChart = () => {
    let tmpListStatus = ['WORKING', 'DONE', 'PRE_ORDER', 'DELIVERED']
    let listDataName = []
    let dataList = []
    let listName = getListOrderNameChart()
    tmpListStatus.forEach((status) => {
      let dataItemStatus = []
      for (let i = 0; i < listName.length; i++) {
        dataItemStatus.push(0)
      }
      listName?.forEach((name, indexName) => {
        let indexData = orders.filter((o) => {
          return name === o?.customer?.customerName && o?.status === status
        })
        dataItemStatus[indexName] = indexData?.length
      })
      dataList.push({
        name: status,
        data: dataItemStatus,
      })
    })
    return dataList
  }

  const optionsHightChart = {
    chart: {
      type: 'column',
    },
    title: {
      text: '',
      align: 'left',
    },
    xAxis: {
      categories: getListOrderNameChart(),
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Count trophies',
      },
      stackLabels: {
        enabled: true,
      },
    },
    legend: {
      align: 'left',
      x: 70,
      verticalAlign: 'top',
      y: 70,
      floating: true,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || 'white',
      borderColor: '#CCC',
      borderWidth: 1,
      shadow: false,
    },
    tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}',
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: getListDataChart(),
  }

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
      <div className="flex gap-8 mb-8">
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
            <Select
              defaultValue="All"
              style={{ width: 120 }}
              onChange={(e) => {
                let newStatus = ''
                switch (e) {
                  case 'Preorder':
                    newStatus = 'PRE_ORDER'
                    break
                  case 'Working':
                    newStatus = 'WORKING'
                    break
                  case 'Done':
                    newStatus = 'PRE_ORDER'
                    break
                  case 'Delivered':
                    newStatus = 'DELIVERED'
                    break
                  default:
                    break
                }
                setStatus(newStatus)
              }}
              options={[
                { value: 'All', label: 'All' },
                { value: 'Preorder', label: 'Preorder' },
                { value: 'Working', label: 'Working' },
                { value: 'Done', label: 'Done' },
                { value: 'Delivered', label: 'Delivered' },
              ]}
            />
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

      <div className="flex gap-8 mb-8">
        <div className="p-8 basis-3/5 bg-neutral-100 shadow-md rounded-md">
          <div className="flex justify-between items-center">
            <div className="">Chart order theo ngươi</div>
            <div className="" style={{ textAlign: 'left' }}>
              <Select
                defaultValue="All"
                style={{ width: 120 }}
                onChange={(e) => {
                  setSelectNameOrder(e)
                }}
                options={optionOrderName}
              />
            </div>
          </div>
          <HighchartsReact
            ref={chartRef}
            highcharts={Highcharts}
            options={optionsHightChart}
          />
        </div>
      </div>

      <div>
        <Radio.Group>
          <Radio.Button value="today">Today</Radio.Button>
        </Radio.Group>
        <Table
          className=" max-w-none"
          columns={[
            {
              title: 'User Account',
              dataIndex: 'idEmployee',
              render: (record) => {
                const user = users.find((item) => item._id === record)

                return user ? user.fullName : 'Other Account'
              },
            },
            {
              title: 'Paid',
              dataIndex: 'paid',
            },
            {
              title: 'Unpaid',
              dataIndex: 'unpaid',
            },
          ]}
          rowKey={(row) => row._id}
          dataSource={orderList}
        />
      </div>
    </>
  )
}

export default Statistics
