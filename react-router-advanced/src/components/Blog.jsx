import React from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  // Mock blog posts data
  const blogPosts = [
    {
      id: 1,
      title: 'Getting Started with React Router',
      excerpt: 'Learn how to implement advanced routing in your React applications...',
      author: 'Alice Johnson',
      date: '2024-01-15',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'Advanced Routing Patterns',
      excerpt: 'Explore nested routes, protected routes, and dynamic routing...',
      author: 'Bob Smith',
      date: '2024-01-12',
      readTime: '8 min read'
    },
    {
      id: 3,
      title: 'Authentication in React Apps',
      excerpt: 'Implement secure authentication flows with React Router...',
      author: 'Charlie Brown',
      date: '2024-01-10',
      readTime: '6 min read'
    },
    {
      id: 4,
      title: 'Code Splitting with React Router',
      excerpt: 'Optimize your React app performance with lazy loading...',
      author: 'Diana Davis',
      date: '2024-01-08',
      readTime: '7 min read'
    }
  ];

  return (
    <div className="blog-container">
      <div className="blog-header">
        <h1>Blog Posts</h1>
        <p>Explore our latest articles and tutorials</p>
      </div>
      
      <div className="blog-grid">
        {blogPosts.map(post => (
          <article key={post.id} className="blog-card">
            <div className="blog-card-content">
              <h2>
                <Link to={`/blog/${post.id}`} className="blog-title-link">
                  {post.title}
                </Link>
              </h2>
              <p className="blog-excerpt">{post.excerpt}</p>
              
              <div className="blog-meta">
                <span className="author">By {post.author}</span>
                <span className="date">{post.date}</span>
                <span className="read-time">{post.readTime}</span>
              </div>
              
              <Link 
                to={`/blog/${post.id}`} 
                className="read-more-link"
              >
                Read More →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;
