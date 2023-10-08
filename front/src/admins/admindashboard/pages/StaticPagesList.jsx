import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './staticPages.css'; // Import your CSS file
import Sidebar from '../sidebar';
import "./Sidebar.css"
import Navbar from '../sidebar';

const StaticPagesList = () => {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/static-pages'); 
        setPages(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPages();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/static-pages/${id}`);
      
      setPages((prevPages) => prevPages.filter((page) => page.id !== id));
      setSelectedPage(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReadContent = (content) => {
    setSelectedPage(content);
  };

  return (
    <>
    <Navbar/>
      <div className="static-pages-list-container">
        <h1 className="static-pages-list-title">Static Pages</h1>
        {/* Button to navigate to the "/addStaticPage" route */}
        <Link to="/addStaticPage" className="add-static-page-button">Add Static Page</Link>
        <ul className="static-pages-list">
          {pages.map((page) => (
            <li key={page.id} className="static-pages-list-item">
              <div className="static-pages-list-item-header">
                <strong className="static-pages-list-item-name">{page.name}</strong>
                <div>
                  <Link to={`/edit/${page.id}`} className="static-pages-list-item-link">Edit</Link>
                  <button onClick={() => handleDelete(page.id)} className="static-pages-list-item-button">Delete</button>
                  <button onClick={() => handleReadContent(page.content)} className="static-pages-list-item-button">Read Content</button>
                </div>
              </div>
              {selectedPage && selectedPage === page.content && (
                <div className="selected-page-content">
                  <h2>Selected Page Content</h2>
                  <p>{selectedPage}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default StaticPagesList;
