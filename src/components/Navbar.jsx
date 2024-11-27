import React, { useEffect, useState,useContext } from 'react'
import { Link} from 'react-router-dom'
// import {logo} from '../utils/constants'
import { IconButton, Stack ,Tooltip,Typography} from '@mui/material'
import Menu from './Menu'
import { CounterContext } from './context/count';
import AssistantIcon from '@mui/icons-material/Assistant';



const Navbar = () => {
  let auth=JSON.parse(sessionStorage.getItem("user"));
  const counterContext=useContext(CounterContext);
  useEffect(()=>{
    auth=JSON.parse(sessionStorage.getItem("user"));
  },[6])
  
  return (
    <Stack direction="row" alignItems="center" p={2} sx={{position:
        "sticky",background:"#000",top:"0",justifyContent:"space-between"}}>
            <Link to="/" style={{display:"flex",alignItems:"center"}} >
                {/* <img src={logo} alt="logo" height={40} className='logo-img'/> */}
                <Typography sx={{color:"#fff",paddingLeft:{sm:"4px",md:"4px",lg:"6px"},fontWeight:"bold",fontSize:{xs:"14px",sm:"18px",md:"20px",lg:"30px"}}} >Demo</Typography>
               
            </Link>
            {auth && auth.result ?
          <>
         <Link to='/chats'>
         <Tooltip title="ChatUs" arrow>
             <button className='btn1'>
              <AssistantIcon/>
              </button>
              </Tooltip>
         </Link> 
          <Menu/>

          </>
          
            
          :<>
             
            <Link to='/register'>
                <button className='btn'>Register</button>
            </Link></>}
            </Stack>
  )
}

export default Navbar
