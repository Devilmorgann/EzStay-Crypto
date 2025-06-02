import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ContractGenerator from './pages/Contract/ContractGenerator';
import Features from './pages/Contract/Features';
// Component Connections
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Pricing from './pages/Pricing';
import AI from './pages/AI';
import Signup from './components/Navbar/Signup';
import Contact from './components/Navbar/Contact';
import Coin from './pages/Coin/Coin';
import BlogPage from './components/Navbar/Blogs';
import Portfolio from './components/Portfolio'
import Chat from './components/Navbar/Chat';
import Footer from './components/Footer/Footer';
import Login from './ASSSET/Login';

// 🛡️ Protected Route
import Protected from './ASSSET/Protected'; // <-- make sure path is correct

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* 🔒 Only Features route is protected */}
        <Route
          path="/features"
          element={
            <Protected>
              <Features />
            </Protected>
          }
        />
        <Route path="/coin/:coinId" element={<Coin />} />
        <Route path="/generate-contract" element={<ContractGenerator />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/AI" element={<AI />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
