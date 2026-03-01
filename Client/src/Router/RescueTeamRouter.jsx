import React from 'react'

import { Route, Routes } from 'react-router'
import MyProfile from '../RescueTeam/pages/MyProfile/MyProfile'
import EditProfile from '../RescueTeam/pages/EditProfile/EditProfile'
import ChangePassword from '../RescueTeam/pages/ChangePassword/ChangePassword'
import AddGallery from '../RescueTeam/pages/AddGallery/AddGallery'

const RescueTeamRouter = () => {
  return (
    <div>
         <Routes>
                  <Route path='Myprofile' element={<MyProfile/>}></Route>
                 
                  <Route path='Editprofiles' element={<EditProfile/>}></Route>
                  <Route path='Changepass' element={<ChangePassword/>}></Route>
                  <Route path='addgallery' element={<AddGallery/>}></Route>

                 
          </Routes>
    </div>
  )
}

export default RescueTeamRouter