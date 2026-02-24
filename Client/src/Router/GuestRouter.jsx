import React from 'react'
import { Route, Routes } from 'react-router'
import ShopReg from '../Guest/Pages/ShopReg/ShopReg'

const GuestRouter = () => {
  return (
    <div>
        <Routes>
        <Route path='shopreg' element={<ShopReg/>}></Route>
        </Routes>
    </div>
  )
}

export default GuestRouter