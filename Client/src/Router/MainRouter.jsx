import React from 'react'
import { Route, Routes } from 'react-router'
import AdminRouter from './AdminRouter'
import UserRouter from './UserRouter'
import Adminlayout from '../Admin/AdminLayout/Adminlayout'
import EditProfiles from '../User/Pages/EditProfiles/EditProfiles'
import Userlayout from '../User/UserLayout/Userlayout'
import ShopLayout from '../Shop/ShopLayout/ShopLayout'
import Guestlayout from '../Guest/GuestLayout/Guestlayout'


const MainRouter = () => {
  return (
    <div>
          <Routes>
                  <Route path='admin/*' element={<Adminlayout/>}></Route>
                <Route path="user/*" element={<Userlayout/>}></Route>
                <Route path="shop/*" element={<ShopLayout/>}></Route>
                <Route path="guest/*" element={<Guestlayout/>}></Route>
          </Routes>

    </div>
  )
}

export default MainRouter