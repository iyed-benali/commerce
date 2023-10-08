import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../products/navbar';

const Profile = () => {
  const [buyerData, setBuyerData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedPhone, setEditedPhone] = useState('');
  const [editedAddress, setEditedAddress] = useState('');

  const storedBuyerId = localStorage.getItem('buyerId');

  useEffect(() => {
    fetchBuyerData();
  }, []);

  const fetchBuyerData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/buyers/${storedBuyerId}`);
      setBuyerData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching buyer data:', error);
      setError(error);
      setLoading(false);
    }
  };

  const handleNameEdit = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/api/buyers/${storedBuyerId}`, {
        name: editedName,
      });
      setBuyerData(response.data);
      setEditedName('');
    } catch (error) {
      console.error('Error updating buyer name:', error);
    }
  };

  const handleEmailEdit = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/api/buyers/${storedBuyerId}`, {
        email: editedEmail,
      });
      setBuyerData(response.data);
      setEditedEmail('');
    } catch (error) {
      console.error('Error updating buyer email:', error);
    }
  };

  const handlePhoneEdit = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/api/buyers/${storedBuyerId}`, {
        phone: editedPhone,
      });
      setBuyerData(response.data);
      setEditedPhone('');
    } catch (error) {
      console.error('Error updating buyer phone:', error);
    }
  };

  const handleAddressEdit = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/api/buyers/${storedBuyerId}`, {
        address: editedAddress,
      });
      setBuyerData(response.data);
      setEditedAddress('');
    } catch (error) {
      console.error('Error updating buyer address:', error);
    }
  };

  return (
    <div>
        <Navbar />
      <h2>Buyer Profile</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && (
        <div>
          <h3>Your Information</h3>
          <p><strong>Name:</strong> {buyerData.name}</p>
          <p><strong>Email:</strong> {buyerData.email}</p>
          <p><strong>Phone:</strong> {buyerData.phone}</p>
          <p><strong>Address:</strong> {buyerData.address}</p>

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
          <div>
            <label htmlFor="editedPhone">Edit Phone:</label>
            <input
              type="text"
              id="editedPhone"
              value={editedPhone}
              onChange={(e) => setEditedPhone(e.target.value)}
            />
            <button onClick={handlePhoneEdit}>Update Phone</button>
          </div>
          <div>
            <label htmlFor="editedAddress">Edit Address:</label>
            <input
              type="text"
              id="editedAddress"
              value={editedAddress}
              onChange={(e) => setEditedAddress(e.target.value)}
            />
            <button onClick={handleAddressEdit}>Update Address</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
