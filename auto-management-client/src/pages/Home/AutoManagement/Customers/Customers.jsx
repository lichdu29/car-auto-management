import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateNewCustomer from './CustomerForm'
import ListCustomer from './ListCustomer'
import CustomerDetail from './CustomerDetail'

const Customers = () => {
  return (
    <>
      <Routes>
        <Route path="/create-new-customer" element={<CreateNewCustomer />} />
        <Route path="/:id" element={<CustomerDetail />} />
        <Route path="/" element={<ListCustomer />} />
      </Routes>
    </>
  )
}

export default Customers
