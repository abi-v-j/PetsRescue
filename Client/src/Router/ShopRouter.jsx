import React from 'react'
import MyProfile from './Router/Shop/Pages/Myprofile'
import EditProfile from './Router/Shop/Pages/editprofile'
import Changepass from './Router/Shop/Pages/changepassword'

const ShopRouter = () => {
  return (
    <div>
         <Routes>
                  <Route path='Myprofile' element={<MyProfile/>}></Route>
                 
                  <Route path='Editprofile' element={<EditProfile/>}></Route>
                  <Route path='Changepassword' element={<Changepass/>}></Route>
                  </Routes>
    </div>

  )
}

export default ShopRouter