import React from 'react'
import Category from '../Admin/Pages/Category/Category'
import District from '../Admin/Pages/District/District'
import { Route, Routes } from 'react-router'
import AdminReg from '../Admin/AdminReg/AdminReg'
import Place from '../Admin/Place/Place'
import ViewComplaint from '../Admin/Pages/ViewComplaint/ViewComplaint'
import Reply from '../Admin/Pages/Reply/Reply'
import ViewUser from '../Admin/Pages/ViewUser/ViewUser'
import VerifyShop from '../Admin/Pages/VerifyShop/VerifyShop'
import AcceptedShop from '../Admin/Pages/AcceptedShop/AcceptedShop'
import { RejectedShop } from '../Admin/Pages/RejectedShop/RejectedShop'
import VerifiedRescueTeam from '../Admin/Pages/VerifiedRescueTeam/VerifiedRescueTeam'
import ViewBookings from '../Admin/Pages/ViewBookings/ViewBookings'

const AdminRouter = () => {
  return (
    <div>
      <Routes>
                  <Route path='category' element={<Category/>}></Route>
                  <Route path='district' element={<District/>}></Route>
                  <Route path='AdminReg' element={<AdminReg/>}></Route>
                  <Route path='Place' element={<Place/>}></Route>
                  <Route path='ViewComplaint' element={<ViewComplaint/>}></Route>
                  <Route path='Reply' element={<Reply/>}></Route>
                   <Route path='ViewUser' element={<ViewUser/>}></Route>
                  <Route path='VerifyShop' element={<VerifyShop/>}></Route>
                   <Route path='ViewBookings' element={<ViewBookings/>}></Route>
                  <Route path='AcceptedShop' element={<AcceptedShop/>}></Route>
                  <Route path='RejectedShop' element={<RejectedShop/>}></Route>
                  <Route path='VerifyRescueTeam' element={<VerifiedRescueTeam/>}></Route> 
                  
          </Routes>
    </div>
  )
}

export default AdminRouter