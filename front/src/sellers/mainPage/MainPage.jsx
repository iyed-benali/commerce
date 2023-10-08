import React from 'react';
import { useParams } from 'react-router-dom';
import './MainPage.css';
import Navbar from "../navbar/Navbar";
import Footer from '../footer/Footer';
import Discount from '../discount/Discount';


const MainPage = () => {
  const { sellerId } = useParams();

  return (
    <div className="main-page">
      <Navbar sellerId={sellerId} />
      <Footer sellerId={sellerId} />
    </div>
  );
};

export default MainPage;
