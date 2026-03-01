import React from 'react'
import EditProfiles from '../User/Pages/EditProfiles/EditProfiles'
import MyProfile from '../User/Pages/Myprofile/MyProfile'
import { Route, Routes } from 'react-router'
import ChangePassword from '../User/Pages/ChangePassword/ChangePassword'
import ViewProducts from '../User/Pages/ViewProducts/ViewProducts'
import ViewShops from '../User/Pages/ViewShops/ViewShops'
import MyCart from '../User/Pages/MyCart/MyCart'
import Payment from '../User/Pages/Payment/Payment'

const UserRouter = () => {
  return (
    <div>
      <Routes>
        <Route path='Myprofile' element={<MyProfile />}></Route>

        <Route path='Editprofiles' element={<EditProfiles />}></Route>
        <Route path='Changepass' element={<ChangePassword />}></Route>
        <Route path='serachShop' element={<ViewShops />}></Route>
        <Route path='serachProduct/:shopId' element={<ViewProducts />}></Route>
        <Route path="/mycart" element={<MyCart />} />
        <Route path="/payment/:bookingId" element={<Payment />} />


      </Routes>
    </div>
  )
}

export default UserRouter