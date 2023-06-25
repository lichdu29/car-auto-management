import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CarDetail from './CarDetail'
import ListCar from './ListCar'
import CreateNewCar from './CarForm'

const Cars = () => {
  return (
    <>
      <Routes>
        <Route path="/add-new-car" element={<CreateNewCar />} />
        <Route path="/:id" element={<CarDetail />} />
        <Route path="/" element={<ListCar />} />
      </Routes>
    </>
  )
}

export default Cars
