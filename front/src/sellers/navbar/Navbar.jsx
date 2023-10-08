import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Discount from '../discount/Discount';

const Navbar = ({ sellerId }) => {
  
 

  return (
    <>
      <nav className="navbar">
        <ul>
          <li>
            <Link to={`/orders`}>Orders</Link>
          </li>
          <li>
            <Link to={`/seller-profile`}>Seller Profile</Link>
          </li>
          
          <li>
            <Link to={`/discount`} >add a product</Link>
          </li>
          <li>
            <Link to={`/seller-products`}>Seller Products</Link>
          </li>
        </ul>
      </nav>
     
   
    </>
  );
};

export default Navbar;
