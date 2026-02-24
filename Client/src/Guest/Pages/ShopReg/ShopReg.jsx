import React from 'react'

const ShopReg = () => {
  return (
    <div>
         <form>
                <center><h1>Shop Registeration</h1></center>
                <table>
                    <tr>
                        <td>Name</td>
                        <td>
                            <input type="text" placeholder='enter your name'/>
                        </td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>
                            <input type="text" placehholder="enter mail id"/>
                            
                        </td>
                    </tr>
                    <tr>
                        <td>password</td>
                        <td>
                            <input type="text" placehholder="enter ur password"/>
                            
                        </td>
                    </tr>
                    <tr>
                        <td>Id Proof</td>
                        <td>
                            <input type="file" />
                            
                        </td>
                    </tr>
                    <tr>
                        <td>Photo</td>
                        <td>
                            <input type="file" />
                            
                        </td>
                    </tr>
                    
                    <tr>
                        <td>Address</td>
                        <td>
                            <input type="text" placehholder="enter ur Address"/>
                            
                        </td>
                    </tr>
                    <tr>
                        <td>District</td>
                        <td>
                            <input type="text" placehholder="enter district"/>
                            
                        </td>
                    </tr>
                    <tr>
                        <td>place</td>
                        <td>
                            <input type="text" placehholder="enter ur place"/>
                            
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="button" value="Submit"/>
                        </td>
                    </tr>
                </table>
            </form>
    </div>
  )
}

export default ShopReg