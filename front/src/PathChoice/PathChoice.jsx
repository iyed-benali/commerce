import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart, AiOutlineShop } from 'react-icons/ai';
import "../PathChoice/pathChoice.css";



const PathChoice = () => {
  return (
    <div className="path-choice-container">
  
      <header className="path-choice-header">
        <img src="https://cdn.dribbble.com/users/4553005/screenshots/13436219/ecommerce_logo_3-01.png" alt="Logo" className="logo" />
      </header>

      <div className="path-choice-wrapper">
        <h1 className="path-choice-title">Welcome to Our Website!</h1>
        <p className="path-choice-subtitle">Choose your role:</p>
        <div className="path-choice-options">
          <div className="path-choice-option">
            <AiOutlineShoppingCart className="role-icon" />
            <h3 className="role-title">Buyer</h3>
            <p className="role-description">Find and purchase products you love!</p>
            <Link to="/signup-buyer" className="btn btn-buyer">
              Get Started
            </Link>
          </div>
          <div className="path-choice-option">
            <AiOutlineShop className="role-icon" />
            <h3 className="role-title">Seller</h3>
            <p className="role-description">Start selling your products to a wide audience!</p>
            <Link to="/signup-seller" className="btn btn-seller">
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Copyrights section */}
      <footer className="path-choice-footer">
        <p className="copyright">
          © {new Date().getFullYear()} Nachd.co All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default PathChoice;
