import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateNewAccount from './AccountForm'
import ListAccount from './ListAccount'
import AccountDetail from './AcountDetail'

const Accounts = () => {
  return (
    <>
      <Routes>
        <Route path="/create-new-account" element={<CreateNewAccount />} />
        <Route path="/:id" element={<AccountDetail />} />
        <Route path="/" element={<ListAccount />} />
      </Routes>
    </>
  )
}

export default Accounts
