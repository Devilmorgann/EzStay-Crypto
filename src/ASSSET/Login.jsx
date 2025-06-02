import React, { useState } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../components/Navbar/firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setMessage('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      localStorage.setItem('userEmail', user.email);
      const redirectPath = localStorage.getItem('redirectAfterLogin') || '/';
      localStorage.removeItem('redirectAfterLogin');
      navigate(redirectPath);
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle Google sign-in (added to match Signup)
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setMessage('');
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem('userEmail', user.email);
      const redirectPath = localStorage.getItem('redirectAfterLogin') || '/';
      localStorage.removeItem('redirectAfterLogin');
      navigate(redirectPath);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" />
      <div
        style={{
          minHeight: '100vh',
          color: '#e2e8f0',
          background: 'linear-gradient(#1e3a8a, #3b0764, #0f172a)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 0,
          margin: 0,
          boxSizing: 'border-box',
          fontFamily: "'Outfit', sans-serif",
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          style={{
            background: 'rgba(15, 23, 42, 0.9)',
            padding: '40px',
            borderRadius: '16px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
            width: '400px',
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            color: '#e2e8f0',
            margin: 0,
            boxSizing: 'border-box',
            fontFamily: "'Outfit', sans-serif",
            transition: 'all 0.3s ease',
          }}
        >
          <h2
            style={{
              margin: 0,
              paddingBottom: '24px',
              fontSize: '32px',
              fontWeight: '600',
              color: '#e2e8f0',
              boxSizing: 'border-box',
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            Log In
          </h2>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            style={{
              margin: 0,
              padding: '16px',
              borderRadius: '10px',
              border: '1px solid #475569',
              fontSize: '16px',
              marginBottom: '20px',
              boxSizing: 'border-box',
              fontFamily: "'Outfit', sans-serif",
              background: '#1e293b',
              color: '#e2e8f0',
              outline: 'none',
              transition: 'border-color 0.3s ease',
            }}
          />

          <div style={{ position: 'relative', margin: 0, boxSizing: 'border-box' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              style={{
                margin: 0,
                padding: '16px',
                borderRadius: '10px',
                border: '1px solid #475569',
                fontSize: '16px',
                width: '100%',
                marginBottom: '20px',
                boxSizing: 'border-box',
                fontFamily: "'Outfit', sans-serif",
                background: '#1e293b',
                color: '#e2e8f0',
                outline: 'none',
                transition: 'border-color 0.3s ease',
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '12px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#e2e8f0',
                margin: 0,
                padding: 0,
                boxSizing: 'border-box',
                fontFamily: "'Outfit', sans-serif",
                fontSize: '14px',
                transition: 'color 0.3s ease',
              }}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <button
            type="submit"
            style={{
              padding: '16px',
              backgroundColor: '#8b5cf6',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              cursor: 'pointer',
              margin: 0,
              marginBottom: '24px',
              boxSizing: 'border-box',
              fontFamily: "'Outfit', sans-serif",
              transition: 'background-color 0.3s ease',
            }}
            disabled={loading}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#a78bfa')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#8b5cf6')}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>

          <div
            style={{
              margin: 0,
              marginBottom: '24px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxSizing: 'border-box',
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            <div style={{ flex: '1', height: '1px', backgroundColor: '#475569', margin: 0, boxSizing: 'border-box' }} />
            <span
              style={{
                padding: '0 12px',
                color: '#94a3b8',
                margin: 0,
                boxSizing: 'border-box',
                fontFamily: "'Outfit', sans-serif",
                fontSize: '14px',
              }}
            >
              or continue with
            </span>
            <div style={{ flex: '1', height: '1px', backgroundColor: '#475569', margin: 0, boxSizing: 'border-box' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', margin: 0, boxSizing: 'border-box' }}>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              style={{
                padding: '12px 16px',
                backgroundColor: '#ea580c',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                cursor: 'pointer',
                width: '48%',
                margin: 0,
                boxSizing: 'border-box',
                fontFamily: "'Outfit', sans-serif",
                transition: 'background-color 0.3s ease',
              }}
              disabled={loading}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#f97316')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#ea580c')}
            >
              Google
            </button>
            <button
              style={{
                padding: '12px 16px',
                backgroundColor: '#171717',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                cursor: 'pointer',
                width: '48%',
                margin: 0,
                boxSizing: 'border-box',
                fontFamily: "'Outfit', sans-serif",
                transition: 'background-color 0.3s ease',
              }}
              disabled={loading}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#27272a')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#171717')}
            >
              GitHub
            </button>
          </div>

          <p
            style={{
              margin: 0,
              marginTop: '20px',
              fontSize: '14px',
              textAlign: 'center',
              color: '#94a3b8',
              boxSizing: 'border-box',
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            Don't have an account?{' '}
            <a
              href="/signup"
              onClick={(e) => {
                e.preventDefault();
                handleSignupRedirect();
              }}
              style={{
                textDecoration: 'none',
                color: '#8b5cf6',
                fontWeight: '600',
                fontFamily: "'Outfit', sans-serif",
                transition: 'color 0.3s ease',
              }}
              onMouseOver={(e) => (e.target.style.color = '#a78bfa')}
              onMouseOut={(e) => (e.target.style.color = '#8b5cf6')}
            >
              Create Account
            </a>
          </p>

          {message && (
            <p
              style={{
                margin: 0,
                marginTop: '20px',
                color: message.includes('Error') ? '#ef4444' : '#22c55e',
                boxSizing: 'border-box',
                fontFamily: "'Outfit', sans-serif",
                fontSize: '14px',
              }}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default Login;