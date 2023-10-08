// Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="footer">
    <div className="footer-links">
      <Link to={`/help`}>Help</Link>
      <Link to={`/report`}>Report</Link>
      <Link to={`/policies`}>Policies</Link>
      <Link to={`/about`}>About</Link>
    </div>
    <div className="footer-info">
      <p>&copy; 2023 Your Company</p>
    </div>
  </footer>
);

export default Footer;
