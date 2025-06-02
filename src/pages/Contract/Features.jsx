import React from 'react';
import { useNavigate } from 'react-router-dom';

const Features = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'AI',
      description: 'Leverage advanced analysis to automate tips and gain insights.',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
          <path d="M12 3a3 3 0 0 0-3 3v2a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z" />
          <path d="M6 10a6 6 0 0 0-4 10.5M18 10a6 6 frecuentemente 0 4 10.5" />
          <path d="M12 14v4" />
          <circle cx="12" cy="20" r="2" />
        </svg>
      ),
      path: '/ai',
    },
    {
      title: 'Chat',
      description: 'Engage with users in real-time through seamless and intuitive chat interfaces.',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
          <path d="M21 11.5a8.38 8.38 0 0 1-11.9 7.5L3 21l1.9-5.7a8.38 8.38 0 0 1 7.6-11.8 8.38 8.38 0 0 1 8.5 6.5z" />
        </svg>
      ),
      path: '/chat',
    },
    {
      title: 'Contract',
      description: 'Streamline contract management with secure and efficient digital solutions.',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
          <path d="M17 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10z" />
          <path d="M9 7h6" />
          <path d="M9 11h6" />
          <path d="M11 15h2" />
        </svg>
      ),
      path: '/generate-contract',
    },
    {
      title: 'Portfolio',
      description: 'Track and manage your investments with a comprehensive portfolio overview.',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
          <path d="M20 6H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2z" />
          <path d="M8 14v4" />
          <path d="M12 12v6" />
          <path d="M16 10v8" />
        </svg>
      ),
      path: '/Portfolio',
    },
    {
      title: 'Blogs',
      description: 'Stay informed with the latest insights and updates from our blog.',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
          <path d="M3 3v18h18V3H3z" />
          <path d="M7 7h10" />
          <path d="M7 11h10" />
          <path d="M7 15h6" />
        </svg>
      ),
      path: '/blogs',
    },
  ];

  return (
    <section
      style={{
        padding: '80px 16px',
        backgroundColor: '#f3f4f6',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <h2
        style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#111827',
          marginBottom: '48px',
          textAlign: 'center',
        }}
      >
        Our Features
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
          maxWidth: '1200px',
          width: '100%',
        }}
      >
        {features.map((feature, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              padding: '24px',
              textAlign: 'center',
              transition: 'transform 0.2s',
              cursor: 'pointer',
              opacity: 0.85,
            }}
            onClick={() => navigate(feature.path)}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <div style={{ marginBottom: '16px' }}>{feature.icon}</div>
            <h3
              style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '8px',
              }}
            >
              {feature.title}
            </h3>
            <p style={{ fontSize: '16px', color: '#6b7280' }}>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;