import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../sidebar';

const AdminLayout = () => {
  return (
    <>
      <Navbar />
    <div className="admin-layout">
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
    </>
  );
};

export default AdminLayout;
