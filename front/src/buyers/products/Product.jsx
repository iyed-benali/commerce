import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './navbar';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faTshirt, faBook, faHome } from '@fortawesome/free-solid-svg-icons';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/products');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(error);
      setLoading(false);
    }
  };

  const categories = ['Electronics', 'Clothing', 'Books', 'Home'];

  const filterByCategory = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = products.filter((product) => {
    if (selectedCategory === 'all') {
      return true;
    } else {
      return product.category === selectedCategory;
    }
  }).filter((product) => {
    return product.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      <Navbar />
      <div className="product-page">
        <h1 className="product-title">Products</h1>
        <div className="product-controls">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="product-search"
          />
          <div className="product-categories">
            <button
              className={`category-button ${selectedCategory === 'all' ? 'selected' : ''}`}
              onClick={() => filterByCategory('all')}
            >
              <span className="category-icon">
                <FontAwesomeIcon icon={faBolt} />
              </span>
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={`category-button ${selectedCategory === category ? 'selected' : ''}`}
                onClick={() => filterByCategory(category)}
              >
                {category === 'Electronics' && <FontAwesomeIcon icon={faBolt} />}
                {category === 'Clothing' && <FontAwesomeIcon icon={faTshirt} />}
                {category === 'Books' && <FontAwesomeIcon icon={faBook} />}
                {category === 'Home' && <FontAwesomeIcon icon={faHome} />}
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="product-list">
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-item">
              <Link to={`/product/${product.id}`} className="product-link">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-details">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-category">Category: {product.category}</p>
                  <p className="product-price">${product.price}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
