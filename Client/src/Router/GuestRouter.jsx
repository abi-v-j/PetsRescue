import React from 'react'
import { Route, Routes } from 'react-router'
import User from '../Guest/Pages/UserReg/UserReg'
import RescueTeam from '../Guest/Pages/RescueTeamReg/RescueTeamReg'
import Shop from '../Guest/Pages/ShopReg/ShopReg'
import Login from '../Guest/Pages/login/Login'

const GuestRouter = () => {
  return (
    <div>
        <Routes>
        <Route path='shopreg' element={<Shop/>}></Route>
        <Route path='userreg' element={<User/>}></Route>
        <Route path='rescueteam' element={<RescueTeam/>}></Route>
        <Route path='login' element={<Login/>}></Route>
        </Routes>
    </div>
  )
}

export default GuestRouter