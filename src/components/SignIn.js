import { Box } from '@mui/material';
import React, { useState,useContext } from 'react'
import { useNavigate,Link } from 'react-router-dom';
import { CounterContext } from './context/count';



const SignIn = () => {
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const navigate=useNavigate();
  const counterContext=useContext(CounterContext);
  const login=async()=>{
    let result=await fetch('http://localhost:8000/login',{
      method:"Post",
      body:JSON.stringify({email,password}),
      headers:{
        'Content-Type':"application/json"
      }
    })
   
    result=await result.json();
  
    if(result.result){
      sessionStorage.setItem('user',JSON.stringify(result));
      navigate('/');
      counterContext.setLog(counterContext.log+1);
    }
    else{
      alert(`${result.err}`);
      setEmail("");
      setPassword("");
    }
  
}


  return (
    <Box sx={{background:'#000'}}>
    <div className="main-container">
    <div className='login-form'>
        <br/>
        <h2 className='main-heading'>Login to Account</h2>
        <br/>
       
        <input type='email'  value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Enter your Email'/>
        <br />
        <input type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Enter your Password'/>
        <br />
       <br/>
        <button className='regbtn' onClick={login} >SignIn</button>
        <p><Link to='/forgot-password'><a style={{color:"rgb(28, 160, 212)"}}>Forgot Password?</a></Link></p>
        <p>Don't have a account?? <Link to='/register'><a style={{color:"rgb(28, 160, 212)"}}>Register Now</a></Link></p>
    </div>
</div>
</Box>
  )
}

export default SignIn
