import React from 'react';
import './Policies.css'; // Import CSS file for styling

const Policies = () => {
  return (
    <div className="policies-container">
      <h1>Our Policies</h1>
      <h2>Privacy Policy</h2>
      <p className="policy-description">
        Your privacy is important to us. Read our detailed privacy policy to understand how we collect, use, and protect your personal information.
      </p>
      <h2>Return Policy</h2>
      <p className="policy-description">
        We want you to be satisfied with your purchase. Review our return policy to learn about our guidelines for returning products.
      </p>
      <h2>Terms and Conditions</h2>
      <p className="policy-description">
        By using our website, you agree to abide by our terms and conditions. Please read the terms carefully to understand your rights and responsibilities.
      </p>
    </div>
  );
};

export default Policies;
