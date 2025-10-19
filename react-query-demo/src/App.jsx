import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import PostsComponent from './components/PostsComponent';
import './App.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes - data stays fresh for 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes - cache persists for 30 minutes
      retry: 3, // Retry failed requests 3 times
      refetchOnWindowFocus: true, // Refetch data when window gains focus
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="app-header">
          <h1>React Query Demo - Posts Management</h1>
          <p>Demonstrating advanced data fetching, caching, and state management</p>
        </header>
        <main className="app-main">
          <PostsComponent />
        </main>
      </div>
      {/* Add React Query Devtools for development */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
