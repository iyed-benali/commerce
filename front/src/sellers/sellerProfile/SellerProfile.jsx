import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import '../mainPage/MainPage.css';

const SellerProfile = () => {
  const [sellerData, setSellerData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');

  const storedSellerId = localStorage.getItem('sellerId');

  useEffect(() => {
    fetchSellerData();
  }, []);

  const fetchSellerData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/sellers/${storedSellerId}`);
      setSellerData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching seller data:', error);
      setError(error);
      setLoading(false);
    }
  };

  const handleNameEdit = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/api/sellers/${storedSellerId}`, {
        name: editedName,
      });
      setSellerData(response.data);
      setEditedName('');
    } catch (error) {
      console.error('Error updating seller name:', error);
    }
  };

  const handleEmailEdit = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/api/sellers/${storedSellerId}`, {
        email: editedEmail,
      });
      setSellerData(response.data);
      setEditedEmail('');
    } catch (error) {
      console.error('Error updating seller email:', error);
    }
  };

  return (
    <div className="main-page">
      <Navbar />
      <div className="seller-profile">
        <h2>Seller Profile</h2>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {!loading && !error && (
          <div className="profile-details">
            <h3>Your Information</h3>
            <p><strong>Name:</strong> {sellerData.name}</p>
            <p><strong>Email:</strong> {sellerData.email}</p>
            
            <h3>Edit Profile</h3>
            <div>
              <label htmlFor="editedName">Edit Name:</label>
              <input
                type="text"
                id="editedName"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
              <button onClick={handleNameEdit}>Update Name</button>
            </div>
            <div>
              <label htmlFor="editedEmail">Edit Email:</label>
              <input
                type="email"
                id="editedEmail"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
              />
              <button onClick={handleEmailEdit}>Update Email</button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SellerProfile;
