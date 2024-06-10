import React from 'react';
// Style Component
import './Navbar.css';
// Images Connections
import logo from '../../assets/logo.png';
import arrow_icon from '../../assets/arrow_icon.png';

const Navbar = () => {
  return (
    <div className="navbar">
      <img className="logo" src={logo} alt="" />

      <ul>
        <li>Home</li>
        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>

      <div className="nav-right">
        <select>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="try">TRY</option>
        </select>

        <button>
          Sign Up <img src={arrow_icon} alt="" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
