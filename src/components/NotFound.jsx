import React from 'react'
import nodata from '../assets/nodatafound.png'
import question_mark from '../assets/question-mark-gif.gif'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
const NotFound = () => {
  return (
    <div className='notfound-container'>
      <div className="gif-container">
        <img src={question_mark}/>
      </div>
      <div className="image-container">
        <img src={nodata}/>
      </div>
      <div className="nodata-head">
      <h2 ><span style={{color:"orangered"}}>Bucket</span><span style={{color:"white"}}> Is</span> <span style={{color:"green"}}>Empty..</span></h2>
      </div>
      <Link to='/'>
      <Button variant="contained" size='medium' color='success'>Explore..</Button>
</Link>
      
    </div>
  )
}

export default NotFound
