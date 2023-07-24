import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
dayjs.extend(weekOfYear)

export function camelize(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, '')
}

export function sortDaysArray(daysArray) {
  daysArray.sort((a, b) => {
    const dateA = dayjs(a.day, 'YYYY-MM-DD')
    const dateB = dayjs(b.day, 'YYYY-MM-DD')
    if (dateA.isBefore(dateB)) {
      return -1
    } else return 1
  })
}

export function generateSalesData(orders) {
  const data = []
  orders.forEach((order) => {
    if (order.payment.paymentStatus === 'PAID') {
      const day = dayjs(order.payment.payAtTime).format('YYYY-MM-DD')
      const index = data.findIndex((item) => item.day === day)
      if (index === -1) {
        data.push({ day: day, cost: order.totalCost })
      } else {
        data[index].cost += order.totalCost
      }
    }
  })
  sortDaysArray(data)
  return data
}

export function generateOrdersData(orders) {
  const data = []
  orders.forEach((order) => {
    const day = dayjs(order.startDate).format('YYYY-MM-DD')
    const index = data.findIndex((item) => item.day === day)
    if (index === -1) {
      data.push({ day, totalOrders: 1 })
    } else {
      data[index].totalOrders += 1
    }
  })
  sortDaysArray(data)
  return data
}

export function generateDataByWeek(data, valueType) {
  const dataByWeekObj = {}
  data.forEach((item) => {
    const yearWeek = `${dayjs(item.day).year()}-${dayjs(item.day).week()}`
    if (!dataByWeekObj[yearWeek]) {
      dataByWeekObj[yearWeek] = item[valueType]
    } else {
      dataByWeekObj[yearWeek] += item[valueType]
    }
  })
  const arr = Object.entries(dataByWeekObj).map(([day, value]) => ({
    day,
    [valueType]: value,
  }))
  return arr
}

export function generateDataByMonth(data, valueType) {
  const dataByMonthObj = {}
  data.forEach((item) => {
    const yearMonth = `${dayjs(item.day).year()}-${dayjs(item.day).month() + 1}`
    if (!dataByMonthObj[yearMonth]) {
      dataByMonthObj[yearMonth] = item[valueType]
    } else {
      dataByMonthObj[yearMonth] += item[valueType]
    }
  })
  const arr = Object.entries(dataByMonthObj).map(([day, value]) => ({
    day,
    [valueType]: value,
  }))
  return arr
}

export function growthCalculator(data, valueType) {
  if (data.length <= 1) return
  return (
    (data.at(-1)[valueType] / data.at(-2)[valueType]) * 100 -
    100
  ).toFixed(2)
}

export function handleGrowthColor(value) {
  if (value > 0) {
    return 'text-green-500'
    // eslint-disable-next-line eqeqeq
  } else if (value == 0) {
    return 'text-yellow-500'
  } else return 'text-red-500'
}
