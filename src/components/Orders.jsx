import React, { useEffect, useState } from 'react'
import NotFound from './NotFound'
import { Box } from '@mui/material'

const Orders = () => {
  let [order,setOrder]=useState([]);
  const auth=JSON.parse(sessionStorage.getItem("user"));
  let [delcount,setDelCount]=useState(1);
  let [sum,setSum]=useState(0);
  useEffect(()=>{
    getData();
  })

  const getData=async()=>{
    let result=await fetch(`http://localhost:8000/getorder/${auth.result._id}`,{
      "method":"Get",
      "headers":{
        "Content-Type":"application/json"
      }
    })
      result=await result.json();

      setOrder(result.orderdata);  
  }

  return (
    <>
    {order&&order.length>0 ?
    <>
    <h1 style={{textAlign:"center",fontFamily:'"Poppins", serif'}}>Your Orders</h1>
     <div style={{width:"400px",height:"4px",backgroundColor:"rgb(164, 15, 117)",borderRadius:"4px",justifySelf:"center",marginTop:"-14px"}}></div>
     <br/>
 
     <br/>
     <div style={{ display: "flex", gap: "40px", flexWrap: "wrap",justifyContent:"center",alignItems:"center",Bottom:"2px"}}>
     {order.map((items,idx)=>(
       <div className="product-card">
         <img src={items.imgurl} className="product-card__image" />
         <div className="product-card__details">
         <h3 className="product-card__name">{items.orderId}</h3>
           <h3 className="product-card__name">{items.productname}</h3>
           <p className="product-card__price">₹{items.price}</p>
           
         </div>
   </div>
   
     ))}
     </div>
    
    </>: <Box style={{background:"#000"}}>
         <NotFound/>
       </Box>}
    
     </>
  )
}

export default Orders
