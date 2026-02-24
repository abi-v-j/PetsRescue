import axios from 'axios'
import React, { useState } from 'react'

const Category = () => {
  const[Category,setValue]= useState("")
  const handleSave = () => {
    axios.post('http://localhost:5000/category', { name: Category })
    .then(res => { alert(res.data.msg); setValue(''); })

  }
  return (
    <div>
      <center>
        <table>
          <tr>
           <td>Category</td>
           <td>
            <input  placeholder={ 'Enter category'}
                onChange={e => setValue(e.target.value)}
              />
           </td>
           </tr>
           <tr>
            <td>
            <button onClick={handleSave}>save</button>
            </td>
           </tr>
          
        </table>
        </center>
    </div>
  )
}

export default Category