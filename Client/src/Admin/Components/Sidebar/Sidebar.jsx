import React from 'react'
import Styles from './Sidebar.module.css'
import { Link } from 'react-router'

const Sidebar = () => {
return(
    <div className={Styles.Contain}>
       <div><Link to='/admin/district'>District</Link></div> 
       <div><Link to='/admin/category'>Category</Link></div> 
       <div><Link to='/admin/adminreg'>Admin Register</Link></div> 
       <div><Link to='/admin/place'>Place</Link></div> 
       <div><Link to='/admin/viewcomplaint'>View Complaint</Link></div> 
       <div><Link to='/admin/reply'>Reply</Link></div> 
       <div><Link to='/admin/viewuser'>View User</Link></div> 
       <div><Link to='/admin/verifyshop'>Verify Shop</Link></div> 
       <div><Link to='/admin/viewbookings'>View Bookings</Link></div> 
       <div><Link to='/admin/acceptedshop'>Accepted Shop</Link></div> 
       <div><Link to='/admin/rejectedshop'>Rejected Shop</Link></div> 
       <div><Link to='/admin/verifiedrescueteam'>Verifed Rescue Team</Link></div> 
    </div>
)

}
export default Sidebar