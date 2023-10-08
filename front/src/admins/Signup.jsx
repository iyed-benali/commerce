import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

import "../sellers/sellers.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    level: 'intern'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/admins', formData);
      console.log('Admin created:', response.data);
      navigate('/login-admin');
    } catch (error) {
      console.error('Error creating admin:', error);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="wrapper">
        <div className="title">
          <span>Sign Up as Admin</span>
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
            <select
              id="level"
              name="level"
              value={formData.level}
              onChange={handleChange}
              required
            >
              <option value="boss">Boss</option>
              <option value="assistant">Assistant</option>
              <option value="intern">Intern</option>
            </select>
            <label htmlFor="level">Level:</label>
          </div>
          <div className="row button">
            <button type="submit">Sign Up</button>
          </div>
        </form>
        <div className="row">
          <p>Already have an account?</p>
          <Link to="/login-admin">Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
