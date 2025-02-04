import React, { useEffect, useState } from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "../components/listings/Home.jsx"
import Show from "../components/listings/Show.jsx"
import New from "../components/listings/New.jsx"
import Edit from "../components/listings/Edit.jsx"
import Nvbar from "../components/shared/Nvbar.jsx"
import Footer from "../components/shared/Footer.jsx"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignUp from "../components/users/SignUp.jsx"
import Login from "../components/users/Login.jsx"
import axios from "axios"
import { toast } from 'react-toastify';

function App() {
  const [user, setUser] = useState(null);

  // fetches user data
  const fetchData = async () => {
    try {
      const response = await axios.get("https://wanderlust-1-1.onrender.com/listings/auth", {
        withCredentials: true,
      });
      console.log("main")
      // console.log(response.data.user)
      setUser(response.data.user);
    } catch (err) {
      // Handle error
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = ()=>{
    axios.get('https://wanderlust-1-1.onrender.com/logout',{
      withCredentials:true
    }).then((res)=>{
      // console.log(res)
      toast.success("Successfully logged out")
      setUser(null)
      // fetchData();
      navigate('/')
    }).catch((err)=>{
      // console.log(err)
    })
   }

  
  return (
    <>
      <BrowserRouter>
       <ToastContainer />
       <Nvbar handleLogout={handleLogout} user={user}/>
        <Routes>
         <Route path="/" element={<><Home/></>}/>
         <Route path="/listings/:id" element={<><Show user={user}/></>}/>
         <Route path="/listings/new" element={<>{user?(<New/>):(<><Login fetchData={fetchData}/></>)}</>}/>
         <Route path="/listings/:id/edit" element={<>{user?(<Edit/>):<Login fetchData={fetchData}/>}</>}/>
         <Route path="/signup" element={<><SignUp fetchData={fetchData}/></>}/>
         <Route path="/login" element={<><Login fetchData={fetchData}/></>}/>
         <Route path="*" element={<><Login/></>}/>
       </Routes>
       <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
