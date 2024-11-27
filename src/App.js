
import React, { useEffect } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import SignIn from './components/SignIn'
import Register from './components/Register'
import Cart from './components/Cart'
import Orders from './components/Orders'
import Chat from './components/Chat'
import {Box} from '@mui/material'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <BrowserRouter>  
    <Box>  
         <Navbar/>    
         <Routes>
             <Route path='/' element={<Home/>}/>
             <Route path='/signin' element={<SignIn/>}/>
             <Route path='/register' element={<Register/>}/>
             <Route path='/cart/:id' element={<Cart/>}/>
             <Route path='/orders/:id' element={<Orders/>}/>
             <Route path='/chats' element={<Chat/>}/>

         </Routes>
    </Box>
    <ToastContainer position='top-center' theme='dark'/>
 </BrowserRouter>
  );
}

export default App;
