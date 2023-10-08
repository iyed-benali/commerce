import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../sidebar';

const AddStaticPage = () => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleAddPage = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/static-pages', { name, content });
      if (response.status === 201) {
        setName('');
        setContent('');
        navigate('/page');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const containerStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };

  const titleStyle = {
    fontSize: '24px',
    marginBottom: '20px',
  };

  const formGroupStyle = {
    marginBottom: '20px',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '18px',
    marginBottom: '8px',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  const textareaStyle = {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    resize: 'vertical',
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '18px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const buttonDisabledStyle = {
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  };

  return (
    <>
    <Navbar />
    <div style={containerStyle}>
      <h1 style={titleStyle}>Add New Static Page</h1>
      <div style={formGroupStyle}>
        <label htmlFor="name" style={labelStyle}>Name:</label>
        <input
          type="text"
          id="name"
          style={inputStyle}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div style={formGroupStyle}>
        <label htmlFor="content" style={labelStyle}>Content:</label>
        <textarea
          id="content"
          style={textareaStyle}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button
        onClick={handleAddPage}
        style={name && content ? buttonStyle : { ...buttonStyle, ...buttonDisabledStyle }}
        disabled={!name || !content}
      >
        Add Page
      </button>
    </div>
    </>
  );
};

export default AddStaticPage;
