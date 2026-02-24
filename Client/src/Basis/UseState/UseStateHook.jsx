import {useEffect, useEffectHook,useState} from "react"

const UseEffectHook=()=>{
    const[msg,setMsg]=useState('')
   
    const[email,setEmail]=useState('')
  
    const[contact,setContact]=useState('')
    useEffect(()=>{
        setMsg(prompt("enter name"))
     
        setEmail(prompt("enter email"))
      
        setContact(prompt("enter contact"))
    },[])
    return(
        <>
        <div>UseEffectHook</div>
        <div>{msg}</div>
        <div>{email}</div>
        <div>{contact}</div>
        </>
    )
}
export default UseEffectHook