import React from 'react'
import { Route, Routes } from 'react-router'
import User from '../Guest/Pages/UserReg/UserReg'
import RescueTeam from '../Guest/Pages/RescueTeamReg/RescueTeamReg'
import Shop from '../Guest/Pages/ShopReg/ShopReg'

const GuestRouter = () => {
  return (
    <div>
        <Routes>
        <Route path='shopreg' element={<Shop/>}></Route>
        <Route path='userreg' element={<User/>}></Route>
        <Route path='rescueteam' element={<RescueTeam/>}></Route>
        </Routes>
    </div>
  )
}

export default GuestRouter