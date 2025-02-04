import React, {useState } from 'react'
import axios from 'axios'
import { useNavigate ,useLocation} from 'react-router-dom'
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';

const Login = ({fetchData}) => {
  const location = useLocation()
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
   axios.post('https://wanderlust-1-1.onrender.com/login',userData,{
     withCredentials:true
   }).then((res)=>{
    fetchData();
     toast.success(`Welcome back to Wanderlust, ${res.data.username}`);
     
    //  console.log(res)
     navigate(`/`)
    console.log(location.state?.from)
    // navigate(location.state?.from || '/');
     
   }).catch((err)=>{
    toast.error("Password or username is incorrect");
    console.log(err)
 })
}

  
return (
    <Container>
     <div className="row mt-3">
      <div className="col-md-8 offset-md-2 ">
      <h3>Login</h3>
      <div className='mt-3'>
         <Form onSubmit={handleSubmit} noValidate validated={validated}>
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
         <button className="btn btn-dark" style={{backgroundColor:"#fe424d", border:"none"}}>Login</button>
      </Form>
      </div>
      </div>
    </div>
    </Container>
  )
}

export default Login
