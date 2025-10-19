import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import './PostsComponent.css';

// API service functions
const postsAPI = {
  fetchPosts: async ({ pageParam = 1, limit = 10 }) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=${limit}`
    );
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
  const [currentPage, setCurrentPage] = useState(1);
  const [postsLimit, setPostsLimit] = useState(10);
  const [forceRefreshCount, setForceRefreshCount] = useState(0);

  // Main query for fetching all posts with advanced caching options
  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
    dataUpdatedAt,
    isRefetching
  } = useQuery({
    queryKey: ['posts', postsLimit, forceRefreshCount],
    queryFn: () => postsAPI.fetchPosts({ pageParam: currentPage, limit: postsLimit }),
    
    // Advanced caching and behavior configurations
    cacheTime: 1000 * 60 * 5, // 5 minutes - cache persists for 5 minutes
    staleTime: 1000 * 30, // 30 seconds - data stays fresh for 30 seconds
    refetchOnWindowFocus: true, // Refetch when window gains focus
    keepPreviousData: true, // Keep previous data while fetching new data
    
    // Retry configuration
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Query for individual post with caching demonstration
  const { 
    data: selectedPost, 
    isLoading: isPostLoading,
    isFetching: isPostFetching 
  } = useQuery({
    queryKey: ['post', selectedPostId],
    queryFn: () => postsAPI.fetchPostById(selectedPostId),
    enabled: !!selectedPostId, // Only fetch when postId is selected
    
    // Individual post caching settings
    cacheTime: 1000 * 60 * 10, // 10 minutes cache time
    staleTime: 1000 * 60 * 2, // 2 minutes stale time
    refetchOnWindowFocus: false, // Don't refetch individual posts on window focus
  });

  // Handler for manual refresh with force
  const handleRefresh = () => {
    refetch();
  };

  // Handler for force refresh (bypass cache)
  const handleForceRefresh = () => {
    setForceRefreshCount(prev => prev + 1);
  };

  // Handler for post selection
  const handlePostSelect = (postId) => {
    setSelectedPostId(postId);
  };

  // Handler for pagination
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Handler for limit change
  const handleLimitChange = (newLimit) => {
    setPostsLimit(newLimit);
    setCurrentPage(1); // Reset to first page when changing limit
  };

  // Format timestamp for display
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  // Calculate cache status
  const getCacheStatus = () => {
    if (!dataUpdatedAt) return 'No cache';
    const timeSinceUpdate = Date.now() - dataUpdatedAt;
    if (timeSinceUpdate < 30000) return 'Fresh';
    if (timeSinceUpdate < 300000) return 'Stale';
    return 'Expired';
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
      {/* Enhanced Control Panel */}
      <div className="control-panel">
        <div className="controls-left">
          <button 
            onClick={handleRefresh} 
            disabled={isFetching}
            className="refresh-button"
          >
            {isFetching ? 'Refreshing...' : 'Refresh Posts'}
          </button>
          
          <button 
            onClick={handleForceRefresh}
            disabled={isFetching}
            className="force-refresh-button"
          >
            Force Refresh (Bypass Cache)
          </button>
          
          <span className="data-info">
            Last updated: {dataUpdatedAt ? formatTime(dataUpdatedAt) : 'Never'}
          </span>
        </div>
        
        <div className="controls-right">
          <div className="cache-status-indicator">
            <span className={`status-dot ${getCacheStatus().toLowerCase()}`}></span>
            Cache: {getCacheStatus()}
          </div>
        </div>
      </div>

      {/* Enhanced Posts Statistics */}
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
        <div className="stat-item">
          <span className="stat-label">Page:</span>
          <span className="stat-value">{currentPage}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Limit:</span>
          <select 
            value={postsLimit} 
            onChange={(e) => handleLimitChange(Number(e.target.value))}
            className="limit-select"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      {/* Posts Grid and Detail View */}
      <div className="content-area">
        {/* Posts List */}
        <div className="posts-list">
          <h2>
            Posts List 
            {isFetching && <span className="fetching-indicator">↻</span>}
            {isRefetching && <span className="refetching-badge">Background Refetch</span>}
          </h2>
          
          <div className="posts-grid">
            {posts?.map((post) => (
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

          {/* Simple Pagination */}
          <div className="pagination">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              Previous
            </button>
            <span className="pagination-info">Page {currentPage}</span>
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              className="pagination-button"
            >
              Next
            </button>
          </div>
        </div>

        {/* Selected Post Detail */}
        <div className="post-detail">
          <h2>Post Details</h2>
          {selectedPost ? (
            <div className="selected-post">
              {isPostLoading || isPostFetching ? (
                <div className="post-loading">
                  <div className="small-spinner"></div>
                  <span>Loading post...</span>
                </div>
              ) : (
                <>
                  <h3>{selectedPost.title}</h3>
                  <p>{selectedPost.body}</p>
                  <div className="post-info">
                    <p><strong>Post ID:</strong> {selectedPost.id}</p>
                    <p><strong>User ID:</strong> {selectedPost.userId}</p>
                    <p>
                      <strong>Cache Status:</strong> 
                      <span className="cache-status"> Individual post cached</span>
                    </p>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="no-selection">
              <p>Select a post to view details</p>
              <small>Individual posts are cached separately from the main list</small>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Caching Demonstration */}
      <div className="cache-demo">
        <h3>React Query Caching Demonstration</h3>
        <div className="cache-info">
          <div className="cache-features">
            <h4>Active Caching Features:</h4>
            <ul>
              <li>
                <strong>cacheTime: 5 minutes</strong> - How long unused data stays in cache
              </li>
              <li>
                <strong>staleTime: 30 seconds</strong> - How long data is considered fresh
              </li>
              <li>
                <strong>refetchOnWindowFocus: true</strong> - Auto-refresh when tab becomes active
              </li>
              <li>
                <strong>keepPreviousData: true</strong> - Show old data while fetching new data
              </li>
            </ul>
          </div>
          
          <div className="testing-instructions">
            <h4>How to Test Caching:</h4>
            <ol>
              <li>
                <strong>Test keepPreviousData:</strong> Change page or limit - notice old data stays visible during fetch
              </li>
              <li>
                <strong>Test refetchOnWindowFocus:</strong> Switch browser tabs and return - data auto-refreshes
              </li>
              <li>
                <strong>Test cacheTime:</strong> Wait 30+ seconds after loading, then select a post - it loads from cache
              </li>
              <li>
                <strong>Test staleTime:</strong> Wait 30+ seconds, data becomes stale but still shows until refresh
              </li>
              <li>
                <strong>Compare refresh types:</strong> Use "Refresh" (respects cache) vs "Force Refresh" (bypasses cache)
              </li>
            </ol>
          </div>

          <div className="interaction-demo">
            <h4>Data Refetch Interactions:</h4>
            <div className="interaction-buttons">
              <button 
                onClick={() => window.dispatchEvent(new Event('focus'))}
                className="demo-button"
              >
                Simulate Window Focus
              </button>
              <button 
                onClick={() => handleLimitChange(5)}
                className="demo-button"
              >
                Load 5 Posts
              </button>
              <button 
                onClick={() => handleLimitChange(20)}
                className="demo-button"
              >
                Load 20 Posts
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsComponent;
