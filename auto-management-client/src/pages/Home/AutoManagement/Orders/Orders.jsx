import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ListOrder from './ListOrder.jsx'
import OrderDetail from './OrderDetail.jsx'
import CreateNewOrder from './OrderForm.jsx'
import OrderPayment from './OrderPayment.jsx'

const Orders = () => {
  return (
    <>
      <Routes>
        <Route path="/create-new-order" element={<CreateNewOrder />} />
        <Route path="/:id/payment" element={<OrderPayment />} />
        <Route path="/:id" element={<OrderDetail />} />
        <Route path="/" element={<ListOrder />} />
      </Routes>
    </>
  )
}

export default Orders
