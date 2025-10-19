import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import './PostsComponent.css';

// API service functions
const postsAPI = {
  fetchPosts: async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return response.json();
  },
  
  fetchPostById: async (id) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }
    return response.json();
  }
};

const PostsComponent = () => {
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [showCachedData, setShowCachedData] = useState(true);

  // Main query for fetching all posts
  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
    dataUpdatedAt
  } = useQuery({
    queryKey: ['posts'],
    queryFn: postsAPI.fetchPosts,
    staleTime: 5000, // Consider data fresh for 5 seconds
  });

  // Query for individual post (demonstrates caching)
  const { data: selectedPost } = useQuery({
    queryKey: ['post', selectedPostId],
    queryFn: () => postsAPI.fetchPostById(selectedPostId),
    enabled: !!selectedPostId, // Only fetch when postId is selected
    staleTime: 1000 * 60 * 10, // 10 minutes stale time for individual posts
  });

  // Handler for manual refresh
  const handleRefresh = () => {
    refetch();
  };

  // Handler for post selection
  const handlePostSelect = (postId) => {
    setSelectedPostId(postId);
  };

  // Format timestamp for display
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  if (isLoading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Loading posts...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="error-state">
        <h2>Error Loading Posts</h2>
        <p>{error.message}</p>
        <button onClick={handleRefresh} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="posts-container">
      {/* Control Panel */}
      <div className="control-panel">
        <div className="controls-left">
          <button 
            onClick={handleRefresh} 
            disabled={isFetching}
            className="refresh-button"
          >
            {isFetching ? 'Refreshing...' : 'Refresh Posts'}
          </button>
          <span className="data-info">
            Last updated: {dataUpdatedAt ? formatTime(dataUpdatedAt) : 'Never'}
          </span>
        </div>
        
        <div className="controls-right">
          <label className="cache-toggle">
            <input
              type="checkbox"
              checked={showCachedData}
              onChange={(e) => setShowCachedData(e.target.checked)}
            />
            Show Cached Data
          </label>
        </div>
      </div>

      {/* Posts Statistics */}
      <div className="stats-panel">
        <div className="stat-item">
          <span className="stat-label">Total Posts:</span>
          <span className="stat-value">{posts?.length || 0}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Status:</span>
          <span className={`stat-value ${isFetching ? 'fetching' : 'idle'}`}>
            {isFetching ? 'Fetching...' : 'Idle'}
          </span>
        </div>
      </div>

      {/* Posts Grid and Detail View */}
      <div className="content-area">
        {/* Posts List */}
        <div className="posts-list">
          <h2>Posts List {isFetching && <span className="fetching-indicator">↻</span>}</h2>
          <div className="posts-grid">
            {posts?.slice(0, 12).map((post) => (
              <div
                key={post.id}
                className={`post-card ${selectedPostId === post.id ? 'selected' : ''}`}
                onClick={() => handlePostSelect(post.id)}
              >
                <h3 className="post-title">{post.title}</h3>
                <p className="post-body">{post.body.substring(0, 100)}...</p>
                <div className="post-meta">
                  <span>Post ID: {post.id}</span>
                  <span>User: {post.userId}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Post Detail */}
        <div className="post-detail">
          <h2>Post Details</h2>
          {selectedPost ? (
            <div className="selected-post">
              <h3>{selectedPost.title}</h3>
              <p>{selectedPost.body}</p>
              <div className="post-info">
                <p><strong>Post ID:</strong> {selectedPost.id}</p>
                <p><strong>User ID:</strong> {selectedPost.userId}</p>
                <p><strong>Status:</strong> <span className="cache-status">Cached</span></p>
              </div>
            </div>
          ) : (
            <div className="no-selection">
              <p>Select a post to view details</p>
              <small>Note: Individual posts are cached separately</small>
            </div>
          )}
        </div>
      </div>

      {/* Caching Demonstration */}
      <div className="cache-demo">
        <h3>Caching Demonstration</h3>
        <div className="cache-info">
          <p>
            <strong>How to test caching:</strong>
          </p>
          <ol>
            <li>Click on different posts - notice fast loading (cached)</li>
            <li>Navigate away and back - data loads instantly</li>
            <li>Wait 5+ seconds and refresh - data may be stale</li>
            <li>Check Network tab in DevTools to see reduced API calls</li>
          </ol>
          <div className="cache-stats">
            <p>
              <strong>Stale Time:</strong> 5 seconds (posts list)
            </p>
            <p>
              <strong>Cache Time:</strong> 30 minutes (default)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsComponent;
