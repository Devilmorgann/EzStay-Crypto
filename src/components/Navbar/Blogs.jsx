// Blog.jsx
import React, { useEffect, useState } from 'react';

const Blog = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          `https://newsapi.org/v2/everything?q=crypto OR finance&language=en&sortBy=publishedAt&pageSize=100&apiKey=81f699d80147428a91be5d507b40530a`
        );
        const data = await res.json();
        setArticles(data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>📰 Latest Crypto & Finance News</h1>
      <div style={styles.grid}>
        {articles.map((article, index) => (
          <div key={index} style={styles.card}>
            {article.urlToImage && (
              <img src={article.urlToImage} alt="article thumbnail" style={styles.image} />
            )}
            <div style={styles.content}>
              <h2 style={styles.title}>{article.title}</h2>
              <p style={styles.description}>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer" style={styles.link}>
                Read More →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '60px 40px',
    fontFamily: 'Poppins, sans-serif',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    minHeight: '100vh',
  },
  heading: {
    textAlign: 'center',
    fontSize: '42px',
    fontWeight: '700',
    color: '#1e1e2f',
    marginBottom: '50px',
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '30px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  content: {
    padding: '25px',
  },
  title: {
    fontSize: '22px',
    fontWeight: '600',
    marginBottom: '15px',
    color: '#1b1b2f',
    lineHeight: '1.4',
  },
  description: {
    fontSize: '15px',
    color: '#444',
    marginBottom: '20px',
    lineHeight: '1.6',
  },
  link: {
    display: 'inline-block',
    backgroundColor: '#7927ff',
    color: '#fff',
    padding: '10px 18px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'background-color 0.3s ease',
  },
};

export default Blog;
