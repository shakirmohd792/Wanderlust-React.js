import React, {useState } from 'react'
import axios from 'axios'
import { useNavigate} from 'react-router-dom'
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';

const SignUp = ({fetchData}) => {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    email:"",
    username:"",
    password:""
  })

  const handleChange= (e)=>{
    setUserData((prevData)=>({
        ...prevData,[e.target.name]:e.target.value
       }))
  }

 const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
       e.preventDefault();
       e.stopPropagation();
       setValidated(true);
       return;
    }

   e.preventDefault();
   axios.post('https://wanderlust-1-1.onrender.com/signup',userData,{
     withCredentials:true
   }).then((res)=>{
     toast.success(`Welcome to Wanderlust, ${res.data.username}`);
     fetchData();
     navigate(`/`)
   }).catch((err)=>{
    toast.error(err.response.data);
    // console.log(err.response.data)
 })
}

  

  return (
    <Container>
     <div className="row mt-3">
      <div className="col-md-8 offset-md-2 ">
      <h3>SignUp for Wanderlust</h3>
      <div className='mt-3'>
         <Form onSubmit={handleSubmit} noValidate validated={validated}>
          <div className="mb-3">
              <Form.Label htmlFor="email" >Email</Form.Label>
              <Form.Control 
              id="email" type="email" 
              placeholder='Enter email' 
              name='email' 
              onChange={handleChange} 
              value={userData.email}
              required/>
            <Form.Control.Feedback type="invalid">
              Email should be valid
           </Form.Control.Feedback>
          </div>
          <div className="mb-3">
              <Form.Label htmlFor="username" >Username</Form.Label>
              <Form.Control 
              id="username" 
              type="text" 
              placeholder='enter username' 
              name='username' 
              onChange={handleChange} 
              value={userData.username}
              required/>
            <Form.Control.Feedback type="invalid">
              Please enter username
            </Form.Control.Feedback>
          </div>
          <div className="mb-3">
              <Form.Label htmlFor="password" >Password</Form.Label>
              <Form.Control 
              id="password" 
              type="password" 
              placeholder='enter password' 
              name='password' 
              onChange={handleChange} 
              value={userData.password}
              required/>
            <Form.Control.Feedback type="invalid">
              Please enter password
            </Form.Control.Feedback>
          </div>
         <button className="btn btn-dark" style={{backgroundColor:"#fe424d", border:"none"}}>SignUp</button>
      </Form>
      </div>
      </div>
    </div>
    </Container>
  )
}

export default SignUp
