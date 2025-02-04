import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { toast } from 'react-toastify';
import Rating from '@mui/material/Rating';


const Show = ({user}) => {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState({ comment: '', rating: 2 });
  

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://wanderlust-1-1.onrender.com/listings/${id}`, {
        withCredentials: true,
      });
      console.log("show")
      setData(response.data);
    } catch (err) {
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch show data of listing
  useEffect(() => {
   fetchData();
  }, [reviews]);

  if (loading) return <Spinner animation="border" variant="danger" />;
  if (!data) return <p>No data available.</p>;

  // Handles deletion of show page
  const handleDelete = async () => {
    if(user){
      try {
        let res = await axios.delete(`https://wanderlust-1-1.onrender.com/listings/${id}`, {
          withCredentials: true,
        });
        if(res.data.success){
          toast.success(res.data.success);
          navigate('/');
          }else{
            toast.error(res.data.error)
          }
        
      } catch (err) {
        console.error(err);
      }
    }else{
      toast.error("Please login")
      navigate('/login')
    }
  };

  // Handle form input change
  const handleChange = (e) => {
    setReviews((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  // Submits the review form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const response = await axios.post(
        `https://wanderlust-1-1.onrender.com/listings/${id}/reviews`,
        reviews,
        { withCredentials: true }
      );

      toast.success('Successfully created review');
      console.log(response.data)
      setData((prevData) => ({
        ...prevData,
        reviews: [...prevData.reviews, response.data],
      }));

      setReviews({ comment: '', rating: 2 }); // Reset form
    } catch (err) {
      setError(err.response?.data || 'Something went wrong');
    }
  };

  // Handle deletion of review
  const handleDeleteRev = async (revId) => {
    try {
      let res = await axios.delete(`https://wanderlust-1-1.onrender.com/listings/${id}/reviews/${revId}`, {
        withCredentials: true,
      });
      
     toast.success('Review deleted');
    setData((prevData) => ({
        ...prevData,
        reviews: prevData.reviews.filter((review) => review._id !== revId),
      }));
    } catch (err) {
      // console.log(err)
      err.response?.data?toast.error(err.response?.data):console.log(err)
      // setError(err.response?.data || 'Something went wrong');
    }
  };

  return (
    <Container>
      {error && (
        <Alert variant="danger" className="mt-3">
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>{error}</p>
        </Alert>
      )}
      <div className="row">
        <div className="col-lg-8 offset-lg-3 col-md-10 offset-md-2 mt-3">
          <h3>{data.title}</h3>
          <Card className="col mt-3 listing-card">
            <div className="col-lg-9 col-md-10">
              <Card.Img variant="top" src={data.image.url} style={{ height: '30vh' }} />
              <Card.Body>
                <p>Owned by <i>{data.owner.username}</i> </p>
                 <p>{data.description}</p> 
                 <p>&#8377; {data.price} / night </p> 
                 <p>{data.location} </p>
                 <p>{data.country}</p> 
              </Card.Body>
            </div>
          </Card>
          {user&&user._id===(data.owner._id)?(<div className="mt-3">
            <Link to={`edit`}>
              <button className="btn btn-dark" style={{ backgroundColor: '#fe424d', border: 'none' }}>
                Edit
              </button>
            </Link>
            <button onClick={handleDelete} className="btn btn-dark" style={{ marginLeft: '1rem' }}>
              Delete
            </button>
          </div>):<div></div>}

          <div className="mb-3 col-lg-9 col-md-10">
           {user?(<><hr />
            <h4>Leave a Review</h4>
            <Form onSubmit={handleSubmit} noValidate validated={validated}>
              <Form.Group className="mb-3">
                <Form.Label>Rating</Form.Label>
                <Form.Range min={1} max={5} name="rating" value={reviews.rating} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Comments</Form.Label>
                <Form.Control as="textarea" name="comment" value={reviews.comment} onChange={handleChange} required />
                <Form.Control.Feedback type="invalid">Please add some comments for review</Form.Control.Feedback>
              </Form.Group>
              <button className="btn btn-outline-dark">Submit</button>
            </Form></>):<div></div>}
            <hr />
            <p><b>All Reviews</b></p>
            <div className="row">
              {data.reviews?.length > 0 ? (
                data.reviews.map((review) => (
                  <Card key={review._id} className="col-5 ms-3 mb-3">
                    <Card.Body>
                      <Card.Title><h5>@{review.author.username}</h5></Card.Title>
                      <Card.Text>{review.comment}</Card.Text>
                      <Rating name="read-only" value={review.rating} readOnly />
                      <button className="btn btn-sm btn-dark mb-3" onClick={() => handleDeleteRev(review._id)}>Delete</button>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <p>No reviews available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Show;
