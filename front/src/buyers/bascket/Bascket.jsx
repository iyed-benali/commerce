import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Bascket.css'
import Navbar from '../products/navbar';

const Bascket = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/carts', {
        params: {
          buyer_id: localStorage.getItem('buyerId'),
        },
      }); 
      setCartItems(response.data);
      setLoading(false);
      console.log(cartItems);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      setLoading(false);
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
     
      const updatedCart = cartItems.filter(item => item.id !== cartItemId);
     
      setCartItems(updatedCart);
  
      await axios.delete(`http://localhost:8000/api/carts/${cartItemId}`);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const fetchProductDetails = async (productId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product details:', error);
      return null;
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        buyer_id: localStorage.getItem('buyerId'),
        payment_method: 'credit_card',
      };
  
      
      const orderResponse = await axios.post('http://localhost:8000/api/orders', orderData);
      console.log("Order creation response:", orderResponse.data);
  
      
      if (orderResponse.data.message === "Order created successfully") {
       
        const ordersResponse = await axios.get('http://localhost:8000/api/orders', {
          params: {
            buyer_id: localStorage.getItem('buyerId'),
          },
        });
  
        
        const sortedOrders = ordersResponse.data.sort(
          (orderA, orderB) =>
            new Date(orderB.created_at).getTime() - new Date(orderA.created_at).getTime()
        );
  
       
        const latestOrder = sortedOrders[0];
        const extractedOrderId = latestOrder.id;
        console.log("Extracted order ID:", extractedOrderId);
  
        
        await handleOrderItems(extractedOrderId);
      } else {
        console.error("Order creation failed:", orderResponse.data.message);
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };
  const handleOrderItems = async (orderId) => {
    try {
      const promises = cartItems.map(async (item) => {
        const orderItemData = {
          order_id: orderId,
          product_id: item.product_id,
          quantity: item.quantity,
        };
        console.log(orderItemData);
        return axios.post('http://localhost:8000/api/order-items', orderItemData);
      });
      await Promise.all(promises);
      console.log('Order items added successfully');
      setCartItems([]);
    } catch (error) {
      console.error('Error adding order items:', error);
    }
  };

  return (
    <div className="bascket">
      <Navbar />
    <h1 className="bascket-title">Cart</h1>
    {loading ? <p>Loading cart...</p> : (
      <div>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="bascket-items">
            {cartItems.map((item) => (
              <CartItem
                key={item.product_id}
                item={item}
                onRemove={handleRemoveItem}
                fetchProductDetails={fetchProductDetails}
              />
            ))}
          </ul>
        )}
      </div>
    )}
    {cartItems.length > 0 && (
      <div>
        <button className="bascket-place-order" onClick={handlePlaceOrder}>Place Order</button>
      </div>
    )}
  </div>
  );
};

const CartItem = ({ item, onRemove, fetchProductDetails }) => {
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    async function fetchDetails() {
      const details = await fetchProductDetails(item.product_id);
      setProductDetails(details);
    }
    fetchDetails();
  }, [item.product_id, fetchProductDetails]);

  return (
    <li className="bascket-item">
    {productDetails ? (
      <div className="bascket-item-details">
        <h3 className="bascket-item-title">{productDetails.name}</h3>
        <p className="bascket-item-quantity">Quantity: {item.quantity}</p>
        <button
          className="bascket-item-remove"
          onClick={() => onRemove(item.id)}
        >
          Remove
        </button>
      </div>
    ) : (
      <p>Product details not available.</p>
    )}
  </li>
  );
};

export default Bascket;
