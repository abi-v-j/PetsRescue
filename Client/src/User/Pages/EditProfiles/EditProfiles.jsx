import React from 'react'

const EditProfiles = () => {
    return (

        <div>
            <form>
                <center><h1>Edit Profile</h1></center>
                <table>
                    <tr>
                        <td>Name</td>
                        <td>
                            <input type="text" placeholder='enter name'/>
                        </td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>
                            <input type="text" placehholder="enter email id"/>
                            
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Contact
                        </td>
                        <td>
                            <input type="text" placeholder="enter contact number"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Address
                        </td>
                        <td>
                            <input type="text" placeholder="enter address"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="button" value="Update"/>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
    )
}



export default EditProfiles