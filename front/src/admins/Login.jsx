import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import '../sellers/sellers.css';

const Login = () => {
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
      const response = await axios.get('http://localhost:8000/api/admins');
      const admins = response.data;

      const foundAdmin = admins.find((admin) => (
        admin.email === formData.email && admin.password === formData.password
      ));

      if (foundAdmin) {
        localStorage.setItem('loggedInAdminId', foundAdmin.id);
        navigate('/layout');
      } else {
        console.log('Invalid credentials. Admin not found.');
      }
    } catch (error) {
      console.error('Error logging in admin:', error);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAdmins() {
      try {
        const response = await axios.get('http://localhost:8000/api/admins');
        console.log('Admins from API:', response.data);
      } catch (error) {
        console.error('Error fetching admins:', error);
      }
    }

    fetchAdmins();
  }, []);

  return (
    <div className="container">
      <div className="wrapper">
        <div className="title">
          <span>Login as Admin</span>
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

export default Login;
