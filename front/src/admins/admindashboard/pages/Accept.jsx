import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './accept.css'; 
import Navbar from '../sidebar';

const Accept = () => {
  const [sellers, setSellers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/sellers'); 
        setSellers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSellers();
  }, []);

  const handleAccept = async (id) => {
    try {
      await axios.put(`http://localhost:8000/api/sellers/${id}`, { accepted: true });

     
      setSellers((prevSellers) =>
        prevSellers.map((seller) => (seller.id === id ? { ...seller, accepted: true } : seller))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredSellers = sellers.filter((seller) => {
    const name = seller.name.toLowerCase();
    const email = seller.email.toLowerCase();
    return (
      name.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <Navbar />
    <div className="seller-list">
      <h1 className="seller-list__title">All Sellers</h1>
      <input
        type="text"
        placeholder="Search..."
        className="seller-list__search"
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul className="seller-list__items">
        {filteredSellers.map((seller) => (
          <li key={seller.id} className="seller-list__item">
            <img
              src={seller.proof_document}
              alt={`Proof Document for ${seller.name}`}
              className="seller-list__image"
            />
            <div className="seller-list__details">
              <strong className="seller-list__name">Name:</strong> {seller.name}<br />
              <strong className="seller-list__email">Email:</strong> {seller.email}<br />
              {!seller.accepted && (
                <button
                  onClick={() => handleAccept(seller.id)}
                  className="seller-list__accept-button"
                >
                  Accept
                </button>
              )}
            </div>
            <hr className="seller-list__divider" />
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default Accept;
