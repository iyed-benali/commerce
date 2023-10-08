import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [sellerId, setSellerId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [buyers, setBuyers] = useState([]);

  useEffect(() => {
    const storedSellerId = localStorage.getItem('sellerId');
    if (storedSellerId) {
      setSellerId(storedSellerId);
    }
  }, []);

  useEffect(() => {
    if (sellerId) {
      fetchOrdersForSeller();
    }
  }, [sellerId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/buyers');
        setBuyers(response.data);
      } catch (error) {
        console.error('Error fetching buyers data:', error);
      }
    };

    fetchData();
  }, []);

  const fetchOrdersForSeller = async () => {
    try {
      setLoading(true);
      setError(null);

      const productsResponse = await axios.get(`http://localhost:8000/api/products?seller_id=${sellerId}`);
      const productIds = productsResponse.data.map(product => product.id);

      const ordersResponse = await axios.get(`http://localhost:8000/api/orders?product_ids=${productIds.join(',')}`);
      setOrders(ordersResponse.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError(error);
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId, status) => {
    try {
      const response = await axios.patch(`http://localhost:8000/api/orders/${orderId}/status`, {
        status: status,
      });
      console.log('Order status updated:', response.data);
      // You can also update the local state to reflect the change in UI
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div className="main-page">
      <Navbar />
      <div className="orders-container">
        <h2>Orders</h2>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        <div className="order-list">
          {orders.map(order => {
            const buyer = buyers.find(b => b.id === order.buyer_id);
            const buyerName = buyer ? buyer.name : order.buyer_id;

            const createdAtFormatted = format(new Date(order.created_at), 'MMM dd, yyyy hh:mm a');

            return (
              <div key={order.id} className="order-item">
                <div className="order-header">
                  <h3>Order ID: {order.id}</h3>
                  <p>Buyer Name: {buyerName}</p>
                </div>
                <div className="order-details">
                  <p>Quantity: {order.quantity}</p>
                  <p>Payment Method: {order.payment_method}</p>
                  <p>Total: ${order.total}</p>
                  <p>Status: {order.status}</p>
                  <p>Created At: {createdAtFormatted}</p>
                </div>
                <div className="order-actions">
                  {/* Button to update status to "shipped" */}
                  <button
                    onClick={() => handleUpdateStatus(order.id, 'shipped')}
                    disabled={order.status === 'shipped'}
                  >
                    {order.status === 'shipped' ? 'Order Shipped' : 'Update Status to Shipped'}
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(order.id, 'delivered')}
                    disabled={order.status === 'delivered'}
                  >
                    {order.status === 'delivered' ? 'Order Delivered' : 'Update Status to Delivered'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
