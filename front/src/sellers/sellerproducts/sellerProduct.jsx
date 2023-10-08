import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import '../mainPage/MainPage.css';

const SellerProduct = () => {
  const storedAnalyticsData = localStorage.getItem('sellerId');
  console.log(storedAnalyticsData);

  const [products, setProducts] = useState([]);
  const sellerId = storedAnalyticsData; // Assuming the sellerId is retrieved from localStorage
  const [error, setError] = useState(null);

  useEffect(() => {
    // Make a request to your API using Axios to fetch products for the seller with the sellerId
    axios.get(`http://localhost:8000/api/sellers/${sellerId}/products`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setError(error);
      });
  }, [sellerId]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="main-page">
      <Navbar />

      {/* Render the seller's products */}
      <div className="seller-product-content">
        <h1>Seller Product Page</h1>
        <h2>Featured Products</h2>
        <div className="product-list">
          {products.map(product => (
            <div key={product.id} className="product-item">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SellerProduct;
