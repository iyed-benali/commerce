import React from 'react';
import { Link } from 'react-router-dom';
import "../admindashboard/pages/Sidebar.css" // Update the CSS import

const Navbar = () => { // Renamed the component to Navbar
  return (
    <nav className="navbar"> {/* Updated class name */}
      <Link to="/" className="navbar-logo">Admin Dashboard</Link> {/* Updated class name */}
      <ul className="navbar-nav"> {/* Updated class name */}
        <li>
          <Link to="/accept" className="navbar-link"> {/* Updated class name */}
            <i className="fas fa-check-circle"></i>
            Accept
          </Link>
        </li>
        <li>
          <Link to="/buyers" className="navbar-link"> {/* Updated class name */}
            <i className="fas fa-users"></i>
            Buyers
          </Link>
        </li>
        <li>
          <Link to="/products" className="navbar-link"> {/* Updated class name */}
            <i className="fas fa-box"></i>
            Products
          </Link>
        </li>
        <li>
          <Link to="/sellers" className="navbar-link"> {/* Updated class name */}
            <i className="fas fa-store"></i>
            Sellers
          </Link>
        </li>
        <li>
          <Link to="/page" className="navbar-link"> {/* Updated class name */}
            <i className="fas fa-file-alt"></i>
            Static Pages
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar; // Exporting the updated component name
