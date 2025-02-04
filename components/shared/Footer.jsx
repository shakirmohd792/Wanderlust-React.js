import React from 'react'
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { Link } from 'react-router-dom';



const Footer = () => {
  return (
   //  <footer>
       <div className="f-info">
         <div className="f-info-socials f-info-links">
         <Link to="https://www.facebook.com/abdulshakir786"><FaFacebookSquare className='i'/></Link>
         <Link to="https://www.instagram.com/imabdulshakir"><FaInstagramSquare className='i' /></Link>
         <Link to="https://www.linkedin.com/in/er-shakir"><FaLinkedin  className='i'/></Link>
         </div>
         <div className='f-info-brand'>&copy; Wanderlust Private Limited</div>
         <div className="f-info-links">
            <Link to='/privacy' >Privacy</Link>
            <Link to='/terms'>Terms</Link>
         </div>
       </div>
   //  {/* </footer> */}
 )
}

export default Footer

// style={{textDecoration:"none",color:"#222222"}}
