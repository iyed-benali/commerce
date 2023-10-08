import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditStaticPage = () => {
  const { id } = useParams();
  const [page, setPage] = useState({});
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/static-pages/${id}`); // Use the API ID
        setPage(response.data);
        setContent(response.data.content);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPage();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8000/api/static-pages/${id}`, { content }); // Use the API ID
      // Update the local state or navigate back to the listing page
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Edit Page: {page.name}</h1>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default EditStaticPage;
