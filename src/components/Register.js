import { Box } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';

const Register = () => {

  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const navigate=useNavigate();
  const register=async()=>{
    let result=await fetch('http://localhost:8000/register',{
      method:"Post",
      body:JSON.stringify({name,email,password}),
      headers:{
        'Content-Type':"application/json"
      }
    })
    
    result=await result.json();
 
    if(result.result){
      
      sessionStorage.setItem("user",JSON.stringify(result));
      navigate('/');
    }
    else if(result.reslt){
      alert(`${result.reslt}`);
      setName("");
      setEmail("");
      setPassword("");
    }
    else{
      alert(`${result.err}`);
      navigate('/register');
    }
   
    let sndmail=await fetch('http://localhost:8000/email',{
      method:"Post",
      body:JSON.stringify({email,name}),
      headers:{
        "Content-Type":"application/json"
      }
    })
    sndmail=await sndmail.json();
  }
  return (
    <Box sx={{background:"#000"}}>
        <div className="main-container">
    <div className='form'>
        <br/>
        <h2 className='main-heading'>Register Now</h2>
        <br/>
        <input type='text' value={name} onChange={(e)=>{setName(e.target.value)}}  placeholder='Enter your Name'/>
        <br />
        <input type='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Enter your Email'/>
        <br />
        <input type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Enter your Password'/>
        <br />
        <button className='regbtn' onClick={register}>Create Account</button>
        <p>Already have an account?? <Link to='/signin'>LOG IN</Link></p>
    </div>
</div>
    </Box>
  )
}

export default Register
