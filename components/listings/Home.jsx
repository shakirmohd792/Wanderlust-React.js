import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import FiltersBtn from './FiltersBtn';

const Home = () => {
    const [data, setData] = useState([])

    useEffect(()=>{
        axios.get("https://wanderlust-1-1.onrender.com/listings",{
          withCredentials:true
        }).then((result)=>{
          // console.log(result)
           setData(result.data)
           console.log("home")
        }).catch((error)=>{
          // console.log(error)
          console.log("Error fetching data", error)
        })
    },[]);

  return (
    <Container className='container mt-1'>
     <FiltersBtn/>
      <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 mt-0">
       {data.map((el)=>{
        return <Link to={`/listings/${el._id}`} className='listing-link' key={el._id} >
               <Card className='col listing-card'>
               <Card.Img variant="top" src={el.image.url} style={{height:"20rem"}}/>
               <Card.ImgOverlay></Card.ImgOverlay>
               <Card.Body>
                 <Card.Text><b>{el.title}</b>
                 <br />
                  &#8377; {el.price} / night 
                  <i className='tax-info'> &nbsp; &nbsp; +18 % GST </i>
                 </Card.Text>
               </Card.Body>
             </Card>
             </Link>
             }
             )}
       </div>
       </Container>
  )
}

export default Home
