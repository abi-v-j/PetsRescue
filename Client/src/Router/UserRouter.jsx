import React from 'react'
import EditProfiles from '../User/Pages/EditProfiles/EditProfiles'
import MyProfile from '../User/Pages/Myprofile/MyProfile'
import { Route, Routes } from 'react-router'
import Changepass from '../User/Pages/Changepass/changepass'

const UserRouter = () => {
  return (
    <div>
         <Routes>
                  <Route path='Myprofile' element={<MyProfile/>}></Route>
                 
                  <Route path='Editprofiles' element={<EditProfiles/>}></Route>
                  <Route path='Changepass' element={<Changepass/>}></Route>

                 
          </Routes>
    </div>
  )
}

export default UserRouter