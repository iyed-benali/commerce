import React, { useState, useEffect } from 'react';
import './sellers.css';
import axios from 'axios'; // Import Axios
import Sidebar from '../sidebar';
import './Sidebar.css';
import Navbar from '../sidebar';
const Sellers = () => {
  const [sellers, setSellers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/sellers');
        if (!response.ok) {
          throw new Error('Failed to fetch sellers.');
        }
        const data = await response.json();
        setSellers(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSellers();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/sellers/${id}`);
      if (response.status === 204) {
        setSellers((prevSellers) => prevSellers.filter((seller) => seller.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
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
                <strong className="seller-list__phone">Phone:</strong> {seller.phone}<br />
                <strong className="seller-list__address">Address:</strong> {seller.address}<br />
                <button
                  className="delete-button"
                  onClick={() => handleDelete(seller.id)}
                  
                  style={{ backgroundColor: 'red', color: 'white', fontWeight: 'bold' }}
                >
                  Delete
                </button>
              </div>
              <hr className="seller-list__divider" />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sellers;
