import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import '../mainPage/MainPage.css';

const Discount = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    category: "",
    // Add more properties for your product (seller_id, image, category, discount, etc.)
  });

  const [imageFile, setImageFile] = useState(null);

  const storedSellerId = localStorage.getItem('sellerId');
  console.log(storedSellerId);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductData({
      ...productData,
      [name]: value
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Create a FormData object to handle file uploads
      const formData = new FormData();
      formData.append("seller_id", storedSellerId);
      formData.append("name", productData.name);
      formData.append("description", productData.description);
      formData.append("price", parseFloat(productData.price));
      formData.append("quantity", parseInt(productData.quantity));
      formData.append("category", productData.category);
     
      if (imageFile) {
        formData.append("image", imageFile);
      }

      
      const response = await axios.post('http://localhost:8000/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });

    
      console.log("Product created:", response.data);
    } catch (error) {
     
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="main-page">
      <Navbar />
      <div className="seller-product-content">
        <h1>Create New Product</h1>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="name">Product Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={productData.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={productData.description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={productData.price}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={productData.quantity}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              name="category"
              value={productData.category}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="image">Product Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <button type="submit">Create Product</button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Discount;
