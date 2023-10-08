import React from 'react';
import './About.css'; // Import CSS file for styling
import Navbar from '../buyers/products/navbar';
const About = () => {
  return (
    <div className="about-container">
      <Navbar />
      <h1>About Nachd E-commerce</h1>
      <p className="about-description">
        Welcome to Nachd E-commerce! We're dedicated to bringing you the best online shopping experience. Our mission is to provide high-quality products, excellent customer service, and a seamless shopping journey.
      </p>
      <h2>Our Products</h2>
      <p className="products-description">
        Discover a wide range of products that cater to your needs. From the latest fashion trends to cutting-edge electronics, we have something for everyone.
      </p>
      <h2>Why Choose Us</h2>
      <p className="why-choose-us-description">
        At Nachd E-commerce, we pride ourselves on the following:
      </p>
      <ul className="why-choose-us-list">
        <li>High-quality products</li>
        <li>Fast and reliable shipping</li>
        <li>Secure online transactions</li>
        <li>Responsive customer support</li>
      </ul>
      <h2>Contact Us</h2>
      <p className="contact-description">
        Have questions, suggestions, or feedback? We'd love to hear from you!
      </p>
      <ul className="contact-list">
        <li>Email: info@nachd.com</li>
        <li>Phone: (123) 456-7890</li>
      </ul>
    </div>
  );
};

export default About;
