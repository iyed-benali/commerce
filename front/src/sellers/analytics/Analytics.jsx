import React from 'react';
import "../mainPage/MainPage.css"; 
import Navbar from "../navbar/Navbar";
import Footer from '../footer/Footer';

const Analytics = () => {
  const storedAnalyticsData = localStorage.getItem('sellerId');
  console.log(storedAnalyticsData);

  return (
    <div className="main-page">
    <Navbar />
    <Footer/>
  </div>
  );
};

export default Analytics;
