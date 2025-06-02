import React, { useContext } from 'react';
import { CoinContext } from '../../context/CoinContext';
import { Link } from 'react-router-dom';
// Style Component
import './Navbar.css';
// Images Connections
import logo from 'C:/Users/astha/Downloads/project logo.jpg';

import arrow_icon from '../../assets/arrow_icon.png';

const Navbar = () => {
  const { setCurrency } = useContext(CoinContext);

  const currencyHandler = (event) => {
    switch (event.target.value) {
      case 'usd': {
        setCurrency({ name: 'usd', symbol: '$' });
        break;
      }
      case 'eur': {
        setCurrency({ name: 'eur', symbol: '€' });
        break;
      }
      case 'inr':{
        setCurrency({name:'inr',symbol:'₹'});
        break;
      }
      case 'try': {
        setCurrency({ name: 'try', symbol: '₺' });
        break;
      }
      default: {
        setCurrency({ name: 'usd', symbol: '$' });
        break;
      }
    }
  };

  return (
    <div className="navbar">
       
       <Link to={'/'}>
  <img src={logo} alt="Logo" style={{ height: '70px', width: '100px' }} />
</Link>

      <ul>
        <Link to={'/'}>
          <li>Home</li>
        </Link>
       
        <li><a href="/pricing">Pricing</a></li>
        

        <Link to="/contact">Contacts</Link>
        <Link to="/features">Features</Link>
       {/*  
        <Link to="/portfolio">Portfolio</Link>
        <li><a href="/Ai">AI</a></li>
         <li><a href="/chat">Chat</a></li>
         <Link to="/blogs">Blog</Link>
        */}
         
      </ul>

      <div className="nav-right">
        <select onChange={currencyHandler}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="try">TRY</option>
          <option value="inr">INR</option>

        </select>

        <>
     <button> <a href="/login">
     Login <img src={arrow_icon} alt="arrow" />
     </a>
      </button>
     </>






     <>
     <button> <a href="/signUp">
     Sign Up <img src={arrow_icon} alt="arrow" />
     </a>
      </button>
     </>

      </div>
    </div>
  );
};

export default Navbar;
