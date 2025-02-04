import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import Alert from 'react-bootstrap/Alert';

const Edit = () => {
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      title: "",
      description: "",
      price: "",
      country: "",
      location: ""
    });

    useEffect(() => {
      axios.get(`https://wanderlust-1-1.onrender.com/listings/edit/${id}`, {
        withCredentials: true
      }).then((res) => {
        setFormData(res.data);
      }).catch((err)=>{
        setError(err.response?.data || 'Something went wrong');
      });
    }, [id]);
  
    const handleChange = (e) => {
      setFormData((prevData) => ({
          ...prevData, [e.target.name]: e.target.value
      }));
    };

    const handleFileChange = (e) => {
      setImageFile(e.target.files[0]);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.stopPropagation();
        setValidated(true);
        return;
      }

      setLoading(true);
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("country", formData.country);
      data.append("location", formData.location);
      if (imageFile) {
        data.append("image", imageFile);
      }

      try {
        let res = await axios.put(`https://wanderlust-1-1.onrender.com/listings/${id}`, data, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" }
        });
        
        if (res.data.success) {
          toast.success(res.data.success);
        } else {
          toast.error(res.data.error);
        }
        navigate(`/listings/${id}`);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
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
        <div className="row mt-3">
          <div className="col-md-8 offset-md-2">
            <h3>Update Listing</h3>
            <Form onSubmit={handleSubmit} noValidate validated={validated}>
              <div className="mb-3">
                <label htmlFor="title">Title</label>
                <Form.Control 
                  id="title" type="text" 
                  placeholder='Enter title' 
                  name='title' 
                  onChange={handleChange} 
                  value={formData.title} 
                  required 
                />
                <Form.Control.Feedback type="invalid">
                  Title should be valid
                </Form.Control.Feedback>
              </div>
              <div className="mb-3">
                <label htmlFor="description">Description</label>
                <Form.Control 
                  as="textarea"
                  id="description" 
                  placeholder='Enter description' 
                  name='description' 
                  onChange={handleChange} 
                  value={formData.description} 
                  required 
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a short description
                </Form.Control.Feedback>
              </div>
              <div className="mb-3">
                <label htmlFor="image">Upload New Image</label>
                <Form.Control 
                  id="image" 
                  type="file" 
                  name='image' 
                  onChange={handleFileChange} 
                />
              </div>
              <div className="row">
                <div className="mb-3 col-md-4">
                  <label htmlFor="price">Price</label>
                  <Form.Control 
                    id="price" 
                    type="number" 
                    placeholder='Enter price' 
                    name='price' 
                    onChange={handleChange} 
                    value={formData.price} 
                    required 
                  />
                  <Form.Control.Feedback type="invalid">
                    Price should be valid
                  </Form.Control.Feedback>
                </div>
                <div className="mb-3 col-md-8">
                  <label htmlFor="country">Country</label>
                  <Form.Control 
                    id="country" 
                    type="text" 
                    placeholder='Enter country' 
                    name='country' 
                    onChange={handleChange} 
                    value={formData.country} 
                    required 
                  />
                  <Form.Control.Feedback type="invalid">
                    Country name should be valid
                  </Form.Control.Feedback>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="location">Location</label>
                <Form.Control 
                  id="location" 
                  type="text" 
                  placeholder='Enter location' 
                  name='location' 
                  onChange={handleChange} 
                  value={formData.location} 
                  required 
                />
                <Form.Control.Feedback type="invalid">
                  Location should be valid
                </Form.Control.Feedback>
              </div>
              <button className="btn btn-dark" style={{ backgroundColor: "#fe424d", border: "none" }} disabled={loading}>
                {loading ? 'Updating...' : 'Update'}
              </button>
            </Form>
          </div>
        </div>
      </Container>
    );
};

export default Edit;
