import React from 'react'
import ProductCard from './ProductCard'
import products from '../assets/Items'

const Home = () => {
  return (
<>
    <h1 style={{textAlign:"center",fontFamily:'"Poppins", serif'}}>Our Products</h1>
    <div style={{width:"400px",height:"4px",backgroundColor:"rgb(164, 15, 117)",borderRadius:"4px",justifySelf:"center",marginTop:"-14px"}}></div>
    <br/>

    <br/>
    <div style={{ display: "flex", gap: "40px", flexWrap: "wrap",justifyContent:"center",alignItems:"center",Bottom:"2px"}}>
    
    {products.map((product,idx) => (
      <ProductCard
        key={idx}
        image={product.imgurl}
        productname={product.productname}
        price={product.price}
      />
    ))}
  </div>
  </>
      
 
  )
}

export default Home
