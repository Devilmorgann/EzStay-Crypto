import React from 'react';

const teamData = [
  {
    name: 'Surya Asthana',
    role: 'Software Engineer',
    email: 'asthanaharshit123@gmail.com',
    phone: '+91 9953518817',
    profile: 'https://www.linkedin.com/in/surya-asthana-598554253/',
    github: 'https://github.com/Devilmorgann'
  },
  {
    name: 'Vivek Chauhan',
    role: 'UI/UX Designer',
    email: 'Vivek@example.com',
    phone: '+91 9123456789',
    profile: 'https://linkedin.com/in/VivekC',
    github: 'https://github.com/VivekC'
  },
  {
    name: 'Sachin Kumar',
    role: 'Backend Engineer',
    email: 'ravi@example.com',
    phone: '+91 9988776655',
    profile: 'https://linkedin.com/in/sachinkumar',
    github: 'https://github.com/sachinkumar'
  },
  {
    name: 'Saurabh Sen',
    role: 'Project Manager',
    email: 'neha@example.com',
    phone: '+91 9876512345',
    profile: 'https://linkedin.com/in/Saurabh',
    github: 'https://github.com/Saurabh'
  }
];

const Contact = () => {
  return (
    <div style={{ backgroundColor: '#0b004e', color: 'white', minHeight: '100vh', fontFamily: 'Outfit, sans-serif', padding: '40px' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '30px' }}>Meet Our Team</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px' }}>
        {teamData.map((person, index) => (
          <div key={index} style={{
            backgroundColor: '#1d152f',
            padding: '20px',
            borderRadius: '12px',
            width: '270px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
            textAlign: 'center'
          }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{person.name}</h2>
            <p style={{ color: '#bbb' }}>{person.role}</p>
            <p>Email: <a href={`mailto:${person.email}`} style={{ color: '#4fc3f7' }}>{person.email}</a></p>
            <p>Phone: {person.phone}</p>

            {/* LinkedIn Button */}
            <a href={person.profile} target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-block',
              color: '#fff',
              background: '#4fc3f7',
              padding: '8px 16px',
              borderRadius: '6px',
              textDecoration: 'none',
              marginTop: '12px',
              marginRight: '10px'
            }}>LinkedIn</a>

            {/* GitHub Button */}
            <a href={person.github} target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-block',
              color: '#fff',
              background: '#333',
              padding: '8px 16px',
              borderRadius: '6px',
              textDecoration: 'none',
              marginTop: '12px'
            }}>GitHub</a>
          </div>
        ))}
      </div>

      <footer style={{ marginTop: '60px', borderTop: '1px solid #444', paddingTop: '20px', textAlign: 'center', fontSize: '14px', color: '#ccc' }}>
        <p>📍 ELO Headquarters</p>
        <p>101-C, Sector 10, Near Vasundhara Metro Station</p>
        <p>Ghaziabad, Uttar Pradesh, 201012</p>
        <p>© 2025 ELO Team. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Contact;
