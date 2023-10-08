import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


import './sellers.css';

const LoginSeller = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:8000/api/sellers');
      const sellers = response.data;

      const foundSeller = sellers.find((seller) => (
        seller.email === formData.email && seller.password === formData.password
      ));

      if (foundSeller) {
        console.log('Seller logged in:', foundSeller.id); 
        localStorage.setItem('sellerId', foundSeller.id);

        navigate(`/sellerUI-page/${foundSeller.id}`);
      } else {
        console.log('Invalid credentials. Seller not found.');
      }
    } catch (error) {
      console.error('Error logging in seller:', error);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="wrapper">
        <div className="title">
          <span>Login as Seller</span>
        </div>
        <form onSubmit={handleSubmit}>
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
          <div className="row button">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginSeller;
