import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../products/navbar';
import "./OneProduct.css";
import StarRating from './StarRating';
import AverageRating from './AverageRating';
import StarRatingg from './StarRatingg';


const OneProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [ratingValue, setRatingValue] = useState(0);
  const [ratingComment, setRatingComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const buyerId = localStorage.getItem('buyerId');
  const [prodRatings,setProdRatings]=useState([])

  useEffect(() => {
    fetchProduct();
    getRatingsForProduct()
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/products/${id}`);
      setProduct(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setError(error);
      setLoading(false);
    }
  };


  const getRatingsForProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/products/${id}/ratings`);
      setProdRatings(response.data.ratings);
      console.log(prodRatings);
    } catch (error) {
      console.error('Error fetching ratings:', error);
    }
  };
 


  const handleAddToCart = async () => {
    try {
      const cartItem = {
        buyer_id: (buyerId),
        product_id: product.id,
        quantity: 1,
      };

      const response = await axios.post('http://localhost:8000/api/add-to-cart', cartItem);
      console.log('Product added to cart:', response.data);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const handleRatingChange = (newValue) => {
    setRatingValue(newValue);
  };

  const handleCommentChange = (event) => {
    setRatingComment(event.target.value);
  };

  const handleAddRating = async () => {
    try {
      const newRating = {
        product_id: product.id,
        buyer_id: buyerId,
        value: ratingValue,
        comment: ratingComment,
      };

      const response = await axios.post('http://localhost:8000/api/ratings', newRating);
      console.log('Rating added:', response.data);
    } catch (error) {
      console.error('Error adding rating:', error);
    }
  };
  const calculateAverageRating = () => {
    if (prodRatings.length === 0) {
      return 0;
    }
  
    const totalRating = prodRatings.reduce((sum, rating) => sum + rating.value, 0);
    const average = totalRating / prodRatings.length;
    return average;
  };

  return (
    <div>
      <Navbar />
      <div className="product-details-page">
    <p>Average Rating: <StarRating value={calculateAverageRating()} /></p>  
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {product && (
          <div className="product-details">
            <img src={product.image} alt={product.name} className="product-image" />
            <h2 className="product-name">{product.name}</h2>
            <p className="product-description">{product.description}</p>
            <p className="product-price">${product.price}</p>
            <p className="product-category">Category: {product.category}</p>
            
            <div className="rating-input">
    <label htmlFor="ratingValue">Rate the product:</label>
    <StarRating value={ratingValue} onRatingChange={handleRatingChange} />
    <textarea
      placeholder="Add a comment (optional)"
      value={ratingComment}
      onChange={handleCommentChange}
    ></textarea>
    <button onClick={handleAddRating}>Add Rating</button>
  </div>;

            <button onClick={handleAddToCart}>Add to Cart</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OneProduct;
