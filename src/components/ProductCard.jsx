import React ,{useEffect} from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"


const ProductCard = ({ image, productname, price}) => {
  const auth=JSON.parse(sessionStorage.getItem("user"));
 
 
 let userId,imgurl;
 useEffect(() => {
  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.async = true;
  document.body.appendChild(script);
}, []);
  
 
   const cart=async()=>{
      
     if(auth && auth.result){
       userId=auth.result._id;
       imgurl= image;  
    }
     
   let cartdata=[{productname:productname,imgurl:imgurl,price:price}];
 
    
     
 
     
     let result=await fetch(`http://localhost:8000/cart/${userId}`, {
       method:"Post",
       body:JSON.stringify({userId,cartdata}),
       headers:{
         "Content-Type":"application/json"
       }
     })
     result=await result.json();
    
     toast.success("Product is added to your Cart Successfully..");
   }
   const handlePayment = async (amount) => {
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded. Please try again.");
      return;
    }
 
      console.log(amount);
    // Create an order on the server
    const { data } = await axios.post("http://localhost:8000/create-order", {
      amount: amount,
    });
   
    const { order } = data;
    let userId;
    let orderdata=[{productname:productname,imgurl:image,price:price,orderId:order.id,orderdate:new Date().toLocaleDateString()}];
    if(auth && auth.result){
      userId=auth.result._id;  
   }
    
    
    // Razorpay Checkout options
    const options = {
      key: "rzp_test_2LnXStGVLcIKe7", // Replace with your Razorpay key_id
      amount: order.amount,
      currency: order.currency,
      name: "The Fithub",
      description: "Test Transaction",
      order_id: order.id,
      handler: async (response) => {
        // Send payment verification to the server
        const verificationResponse = await axios.post(
          "http://localhost:8000/verify-payment",
          response
        );

        if (verificationResponse.data.success) {
          let result=await fetch(`http://localhost:8000/order/${userId}`, {
            method:"Post",
            body:JSON.stringify({userId,orderdata}),
            headers:{
              "Content-Type":"application/json"
            }
          })
          result=await result.json();
         
          
          toast.success("Payment Successfully Done and Verified!!")
          toast.success("Product is added to your Cart Successfully..");
        } else {
          toast.warn("Payment Verification Failed!");
        }
      },
      prefill: {
        name: auth.result.name,
        email: auth.result.email,
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };
   

  return (
    <div className="product-card">
    <img src={image} className="product-card__image" />
    <div className="product-card__details">
      <h3 className="product-card__name">{productname}</h3>
      <p className="product-card__price">₹{price}</p>
     {auth && auth.result && <>
      <div className="product-card__buttons">
        <button className="product-card__button buy-now" onClick={()=>{handlePayment(price)}}>
          Buy Now
        </button>
        
        <button className="product-card__button add-to-cart" onClick={cart}>
        <ShoppingCartIcon style={{fontSize:"16px",marginTop:"4px"}}/>
          Add to Cart
        </button>
      </div>
     </>}
    </div>
  </div>
  )
}

export default ProductCard
