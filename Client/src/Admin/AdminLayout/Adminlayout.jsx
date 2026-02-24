import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import AdminRouter from '../../Router/AdminRouter'
import Sidebar from '../Components/Sidebar/Sidebar'
import styles from './Adminlayout.module.css'

const Adminlayout =() =>{
    return(
        <div className={styles.container}>
             <div> <Sidebar/></div>
             <div>
                <div> <Navbar/></div>
                <div style={{marginLeft:'600px',marginTop:'100px'}}><AdminRouter/></div>
             </div>
            
        </div>
    )
}
export default Adminlayout