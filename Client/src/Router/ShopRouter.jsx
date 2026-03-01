import React from 'react'

import AddProduct from '../Shop/Pages/AddProduct/AddProduct'
import MyProfile from '../Shop/Pages/Myprofile/MyProfile'
import EditProfiles from '../Shop/Pages/EditProfiles/EditProfiles'
import ChangePassword from '../Shop/Pages/ChangePassword/ChangePassword'
import { Route, Routes } from 'react-router'
import AddStock from '../Shop/Pages/AddStock/AddStock'

const ShopRouter = () => {
  return (
    <div>
      <Routes>
        <Route path='Myprofile' element={<MyProfile />}></Route>
        <Route path='Editprofile' element={<EditProfiles />}></Route>
        <Route path='Changepassword' element={<ChangePassword />}></Route>
        <Route path='addProduct' element={<AddProduct />}></Route>
        <Route path='addStock/:productId' element={<AddStock />}></Route>
      </Routes>
    </div>

  )
}

export default ShopRouter