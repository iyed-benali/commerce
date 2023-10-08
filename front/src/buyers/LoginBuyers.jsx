import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import '../sellers/sellers.css';

const LoginBuyers = () => {
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
      const response = await axios.get('http://localhost:8000/api/buyers');
      console.log('Buyers from API:', response.data);
      const buyers = response.data;

      const foundBuyer = buyers.find((buyer) => (
        buyer.email === formData.email && buyer.password === formData.password
      ));

      if (foundBuyer) {
        console.log('Buyer logged in:', foundBuyer);
        localStorage.setItem('buyerId', foundBuyer.id);
        navigate('/productss');
      } else {
        console.log('Invalid credentials. Buyer not found.');
      }
    } catch (error) {
      console.error('Error logging in buyer:', error);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="wrapper">
        <div className="title">
          <span>Login as Buyer</span>
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

export default LoginBuyers;
