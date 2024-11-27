import React, { useEffect, useState } from 'react'
import NotFound from './NotFound'
import { Box } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteIcon from '@mui/icons-material/Delete';

const Cart = () => {
  let [cart,setCart]=useState([]);
  const auth=JSON.parse(sessionStorage.getItem("user"));
  let [delcount,setDelCount]=useState(1);
  let [sum,setSum]=useState(0);
  useEffect(()=>{
    getData();
 },[delcount])
  const getData=async()=>{
    let result=await fetch(`http://localhost:8000/getcart/${auth.result._id}`,{
      "method":"Get",
      "headers":{
        "Content-Type":"application/json"
      }
    })
      result=await result.json();

      setCart(result.cartdata);
      let subtotal=0;
      result.cartdata.forEach(element => {
        subtotal=subtotal+parseInt(element.price);
      });
      setSum(subtotal);
      
  }
 
  const deleteData=async(id)=>{
    toast.warn("The Selected Product has been removed from your Cart list.");
   
   let userId=auth.result._id
    delcount++;

   let result=await fetch(`http://localhost:8000/cartdelete/${id}`,{
     method:"Put",
     body:JSON.stringify({userId}),
     "headers":{
        "Content-Type":"application/json"
      }
   })
   result=await result.json();
   console.log(delcount)
   if(result.acknowledged){
   
   setDelCount(delcount);
   }
     
  }

  return (
   <>
   {cart&&cart.length>0 ?
   <>
   <h1 style={{textAlign:"center",fontFamily:'"Poppins", serif'}}>Your Cart</h1>
    <div style={{width:"400px",height:"4px",backgroundColor:"rgb(164, 15, 117)",borderRadius:"4px",justifySelf:"center",marginTop:"-14px"}}></div>
    <br/>

    <br/>
    <div style={{ display: "flex", gap: "40px", flexWrap: "wrap",justifyContent:"center",alignItems:"center",Bottom:"2px"}}>
    {cart.map((items,idx)=>(
      <div className="product-card">
        <img src={items.imgurl} className="product-card__image" />
        <div className="product-card__details">
          <h3 className="product-card__name">{items.productname}</h3>
          <p className="product-card__price">₹{items.price}</p>
          <div className="product-card__buttons">
            <button className="product-card__button item-remove" onClick={()=>{deleteData(`${items._id}`)}} >
            <DeleteIcon style={{fontSize:"19px",marginTop:"4px"}}/>
              Remove Item
            </button>
          </div>
        </div>
  </div>
  
    ))}
    </div>
    <br></br>
    <div style={{width:"90%",height:"4px",backgroundColor:"black",borderRadius:"4px",justifySelf:"center",marginTop:"10px"}}></div>
    <h2 style={{textAlign:"center",fontFamily:'"Poppins", serif'}}>Subtotal : ₹{sum}</h2>
   </>: <Box style={{background:"#000"}}>
        <NotFound/>
      </Box>}
   
    </>
  )
}

export default Cart

