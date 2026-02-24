import React from 'react'

const Place = () => {
  return (
    <div>
         <form>
                <center><h1>Place</h1></center>
                <table>
                    <tr>
                        <td>District</td>
                        <td>
                            <input type="text" placeholder='enter your district'/>
                        </td>
                    </tr>
                    <tr>
                        <td>Place</td>
                        <td>
                            <input type="text" placehholder="enter place"/>
                            
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

export default Place