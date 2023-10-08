import React from 'react';
import './Help.css'; // Import CSS file for styling

const Help = () => {
  const faqs = [
    {
      question: "How do I create an account?",
      answer:
        "To create an account on Nachd, go to the Sign Up page and provide your email, choose a username and password, and follow the instructions."
    },
    {
      question: "How can I reset my password?",
      answer:
        "If you've forgotten your password, click on the 'Forgot Password' link on the Sign In page, and we'll send you a password reset link to your email."
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept major credit and debit cards, as well as popular online payment methods such as PayPal and Apple Pay."
    },
  ];

  return (
    <div className="help-container">
      <h1 className="help-title">Welcome to Nachd Help</h1>
      <p className="help-description">If you need assistance with using Nachd, you're in the right place. Below, you'll find answers to some common questions:</p>
      <div className="section">
        <h2>Frequently Asked Questions (FAQs)</h2>
        <ul className="faqs-list">
          {faqs.map((faq, index) => (
            <li key={index}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="section">
        <h2>User Guides</h2>
        <p>We're currently working on creating detailed user guides for various features of Nachd. Please check back soon for updates!</p>
      </div>
      <div className="section">
        <h2>Contact Us</h2>
        <p>If you couldn't find the information you're looking for or need further assistance, feel free to reach out to our support team:</p>
        <ul className="contact-list">
          <li>Email: support@nachd.com</li>
          <li>Phone: (123) 456-7890</li>
        </ul>
      </div>
    </div>
  );
};

export default Help;
