import React, { useState, useEffect } from 'react';
import './products.css';
import axios from 'axios'; // Import Axios
import Sidebar from '../sidebar';
import './Sidebar.css';
import Navbar from '../sidebar';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products.');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/products/${id}`);
      if (response.status === 204) {
        
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filteredProducts = products.filter((product) => {
    const name = product.name.toLowerCase();
    const description = product.description.toLowerCase();
    return (
      name.includes(searchTerm.toLowerCase()) ||
      description.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <Navbar />
      <div className="product-list">
        <h1 className="product-list__title">All Products</h1>
        <input
          type="text"
          placeholder="Search..."
          className="product-list__search"
          value={searchTerm}
          onChange={handleSearch}
        />
        <ul className="product-list__items">
          {filteredProducts.map((product) => (
            <li key={product.id} className="product-list__item">
              <img
                src={product.image}
                alt={product.name}
                className="product-list__image"
              />
              <div className="product-list__details">
                <strong className="product-list__name">Product Name:</strong> {product.name}<br />
                <strong className="product-list__description">Description:</strong> {product.description}<br />
                <strong className="product-list__price">Price: ${product.price}</strong><br />
                {/* "Delete" button to delete the product */}
                <button
                  className="delete-button"
                  onClick={() => handleDelete(product.id)}
                  style={{ backgroundColor: 'red', color: 'white', fontWeight: 'bold' }}
                >
                  Delete
                </button>
              </div>
              <hr className="product-list__divider" />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Products;
