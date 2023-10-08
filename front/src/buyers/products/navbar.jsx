import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css"

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/productss">Home</Link>
        </li>
        <li>
          <Link to="/about">About Us</Link>
        </li>
        <li>
          <Link to="/bascket">cart</Link>
        </li>
        <li>
          <Link to="/buyer-profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
