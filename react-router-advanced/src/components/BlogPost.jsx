import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const BlogPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  // Mock blog posts data
  const blogPosts = {
    1: {
      id: 1,
      title: 'Getting Started with React Router',
      content: `
        <p>React Router is the standard routing library for React applications. It enables 
        you to build single-page applications with navigation without the page refreshing 
        as the user navigates.</p>
        
        <h3>Key Features:</h3>
        <ul>
          <li>Declarative routing</li>
          <li>Nested routes</li>
          <li>Route parameters</li>
          <li>Programmatic navigation</li>
        </ul>
        
        <p>In this article, we'll explore how to set up React Router and implement 
        basic routing in your React application.</p>
      `,
      author: 'Alice Johnson',
      date: '2024-01-15',
      readTime: '5 min read',
      category: 'React'
    },
    2: {
      id: 2,
      title: 'Advanced Routing Patterns',
      content: `
        <p>Advanced routing patterns in React Router include nested routes, 
        protected routes, and dynamic routing. These patterns help you build 
        more complex and secure applications.</p>
        
        <h3>Nested Routes</h3>
        <p>Nested routes allow you to render components inside other components, 
        creating a hierarchy that matches your UI structure.</p>
        
        <h3>Protected Routes</h3>
        <p>Protected routes require authentication before allowing access. 
        This is essential for user-specific content and admin areas.</p>
      `,
      author: 'Bob Smith',
      date: '2024-01-12',
      readTime: '8 min read',
      category: 'Advanced'
    }
  };

  const post = blogPosts[postId];

  if (!post) {
    return (
      <div className="blog-post-container">
        <div className="not-found-post">
          <h1>Post Not Found</h1>
          <p>The blog post you're looking for doesn't exist.</p>
          <Link to="/blog" className="back-link">← Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post-container">
      <nav className="blog-post-nav">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>
        <Link to="/blog" className="blog-home-link">All Posts</Link>
      </nav>

      <article className="blog-post">
        <header className="post-header">
          <span className="post-category">{post.category}</span>
          <h1>{post.title}</h1>
          
          <div className="post-meta">
            <div className="author-info">
              <strong>By {post.author}</strong>
            </div>
            <div className="post-details">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </header>

        <div 
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <footer className="post-footer">
          <div className="post-actions">
            <button onClick={() => navigate(-1)} className="action-button">
              ← Previous
            </button>
            <Link to="/blog" className="action-button">
              All Posts
            </Link>
            <button 
              onClick={() => navigate(`/blog/${parseInt(postId) + 1}`)}
              className="action-button"
            >
              Next →
            </button>
          </div>
        </footer>
      </article>
    </div>
  );
};

export default BlogPost;
