import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

import '../sellers/sellers.css';

const SignupBuyers = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/buyers', formData);
      console.log('Buyer created:', response.data);
      navigate('/login-buyer');
    } catch (error) {
      console.error('Error creating buyer:', error);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="wrapper">
        <div className="title">
          <span>Sign Up as Buyer</span>
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
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <label htmlFor="phone">Phone:</label>
          </div>
          <div className="row">
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            <label htmlFor="address">Address:</label>
          </div>
          <div className="row button">
            <button type="submit">Sign Up</button>
          </div>
        </form>
        <div className="row">
          <p>Already have an account?</p>
          <Link to="/login-buyer">Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupBuyers;
