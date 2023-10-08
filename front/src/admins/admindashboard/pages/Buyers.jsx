import React, { useState, useEffect } from 'react';
import './buyers.css';
import axios from 'axios';
import Sidebar from '../sidebar';
import './Sidebar.css';
import Navbar from '../sidebar';

const Buyers = () => {
  const [buyers, setBuyers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loggedInAdmin, setLoggedInAdmin] = useState(null);

  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/buyers');
        if (!response.ok) {
          throw new Error('Failed to fetch buyers.');
        }
        const data = await response.json();
        setBuyers(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchLoggedInAdmin = async () => {
      try {
        const loggedInAdminId = localStorage.getItem('loggedInAdminId');
        if (loggedInAdminId) {
          const response = await axios.get(`http://localhost:8000/api/admins/${loggedInAdminId}`);
          setLoggedInAdmin(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.error('Error fetching logged-in admin:', error);
      }
    };

    fetchBuyers();
    fetchLoggedInAdmin();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleBan = async (id) => {
    try {
      if (loggedInAdmin && loggedInAdmin.level === 'boss') {
        const response = await axios.delete(`http://localhost:8000/api/buyers/${id}`);
        if (response.status === 204) {
          setBuyers((prevBuyers) => prevBuyers.filter((buyer) => buyer.id !== id));
        }
      } else {
        console.log("You don't have permission to ban.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filteredBuyers = buyers.filter((buyer) => {
    const name = buyer.name.toLowerCase();
    const email = buyer.email.toLowerCase();
    const phone = buyer.phone.toLowerCase();
    const address = buyer.address.toLowerCase();
    return (
      name.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase()) ||
      phone.includes(searchTerm.toLowerCase()) ||
      address.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <Navbar />
      <div className="buyer-list">
        <h1 className="buyer-list__title">All Buyers</h1>
        <input
          type="text"
          placeholder="Search..."
          className="buyer-list__search"
          value={searchTerm}
          onChange={handleSearch}
        />
        <ul className="buyer-list__items">
          {filteredBuyers.map((buyer) => (
            <li key={buyer.id} className="buyer-list__item">
              <strong className="buyer-list__name">Name:</strong> {buyer.name}<br />
              <strong className="buyer-list__email">Email:</strong> {buyer.email}<br />
              <strong className="buyer-list__phone">Phone:</strong> {buyer.phone}<br />
              <strong className="buyer-list__address">Address:</strong> {buyer.address}<br />
              <strong className="buyer-list__created-at">Created At:</strong> {buyer.created_at}<br />
              <strong className="buyer-list__updated-at">Updated At:</strong> {buyer.updated_at}<br />
              {loggedInAdmin && loggedInAdmin.level === 'boss' && (
                <button
                  className="ban-button"
                  onClick={() => handleBan(buyer.id)}
                  style={{ backgroundColor: 'red', color: 'white', fontWeight: 'bold' }}
                >
                  Ban
                </button>
              )}
              <hr className="buyer-list__divider" />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Buyers;
