import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

import './sellers.css';

const SignupSeller = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    proof_document: null,
    accepted: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/sellers', formData);
      console.log('Seller created:', response.data);
      navigate('/login-seller');
    } catch (error) {
      console.error('Error creating seller:', error);
    }
    console.log(formData);
  };

  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="wrapper">
        <div className="title">
          <span>Sign Up as Seller</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label htmlFor="name">Name:</label>
          </div>
          <div className="row">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Email:</label>
          </div>
          <div className="row">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Password:</label>
          </div>
          <div className="row">
            <input type="file" id="proof_document" name="proof_document" onChange={handleChange} />
            <label htmlFor="proof_document">Proof Document:</label>
          </div>
          <div className="row button">
            <button type="submit">Sign Up</button>
          </div>
        </form>
        <div className="row">
          <p>Already have an account?</p>
          <Link to="/login-seller">Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupSeller;
