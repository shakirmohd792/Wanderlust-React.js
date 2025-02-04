import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link} from 'react-router-dom';
import { FaRegCompass } from "react-icons/fa";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import { FaMagnifyingGlass } from "react-icons/fa6";


const Nvbar = ({handleLogout,user}) => {
  
  return (
    <>
    <Navbar expand="md" className="bg-body-light border-bottom sticky-top">
      {/* <Container> */}
        <Navbar.Brand as={Link} to="/"><FaRegCompass className='fa-compass'/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
           <Nav.Link as={Link} to="/" style={{color:"black"}}>Explore</Nav.Link>
          </Nav>

          <Form>
             <Row>
              <Col xs="auto">
              <Form.Control
              type="text"
              placeholder="Search destinations"
              className=" mr-sm-2 search-inp"
            />
              </Col>
             <Col xs="auto">
            <button type="submit" className='btn btn-outline search'><i><FaMagnifyingGlass /></i>Search</button>
            </Col>
           </Row>
         </Form>

          <Nav className="ms-auto">
          <Nav.Link as={Link} to="/listings/new" style={{color:"black"}}>Airbnb your home</Nav.Link>
           {!user?(<><Nav.Link as={Link} to="/signup" style={{color:"black"}}><b>Signup</b></Nav.Link>
            <Nav.Link as={Link} to="/login" style={{color:"black"}}><b>Login</b></Nav.Link></>):(
            <Nav.Link as={Link} to="/" style={{color:"black"}} onClick={handleLogout}><b>Logout</b></Nav.Link>)}
          </Nav>
        </Navbar.Collapse>
      {/* </Container> */}
    </Navbar>
    </>
  )
}

export default Nvbar
