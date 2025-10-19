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
    }
  ];

  return (
    <div className="blog-container">
      <div className="blog-header">
        <h1>Blog Posts</h1>
        <p>Dynamic Routing Example - Click on posts to see dynamic URLs</p>
      </div>
      
      <div className="blog-grid">
        {blogPosts.map(post => (
          <article key={post.id} className="blog-card">
            <div className="blog-card-content">
              <h2>
                {/* Dynamic routing: /blog/1, /blog/2, etc. */}
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

      <div className="routing-info">
        <h3>Dynamic Routing Demonstration</h3>
        <p>
          This page demonstrates dynamic routing where each blog post has a unique URL 
          like <code>/blog/1</code>, <code>/blog/2</code>, etc. The <code>postId</code> 
          parameter is extracted from the URL using React Router's <code>useParams</code> hook.
        </p>
      </div>
    </div>
  );
};

export default Blog;
