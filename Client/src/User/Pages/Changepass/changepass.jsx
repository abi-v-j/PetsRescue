import React from 'react'

const Changepass = () => {
  return (
    <div>
         <form>
                <center><h1>Change Password</h1></center>
                <table>
                    <tr>
                        <td>Old Password</td>
                        <td>
                            <input type="text" placeholder='enter your old password'/>
                        </td>
                    </tr>
                    <tr>
                        <td>New Password</td>
                        <td>
                            <input type="text" placehholder="enter your new password"/>
                            
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Re-Type Password
                        </td>
                        <td>
                            <input type="text" placeholder="Re type your Password"/>
                        </td>
                    </tr>
                    
            
                
                    <tr>
                        <td>
                            <input type="button" value="Change Password"/>
                        </td>
                        <td>
                            <input type="button" value="Cancel"/>
                        </td>
                    </tr>
                </table>
            </form>
    </div>
  )
}

export default Changepass