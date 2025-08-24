import { useQuery } from 'react-query';
import './PostsComponent.css';

const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

function PostsComponent() {
  const { data: posts, isLoading, isError, error, refetch, isFetching } = useQuery('posts', fetchPosts, {
    staleTime: 300000, // Data will be considered fresh for 5 minutes
    cacheTime: 3600000, // Cache will be garbage collected after 1 hour
    retry: 3, // Will retry failed requests 3 times
    refetchOnWindowFocus: true, // Automatically refetch when window regains focus
    keepPreviousData: true, // Keep showing previous data while fetching new data
    onFocus: () => {
      console.log('Window focused - checking for updates');
    }
  });

  if (isLoading) {
    return <div>Loading posts...</div>;
  }

  if (isError) {
    return <div>Error fetching posts: {error.message}</div>;
  }

  return (
    <div className="posts-container">
      <div className="header">
        <h1>Posts</h1>
        <button 
          onClick={() => refetch()} 
          disabled={isFetching}
          className="refresh-button"
        >
          {isFetching ? 'Refreshing...' : 'Refresh Posts'}
        </button>
      </div>
      <div className="posts-grid">
        {posts?.map((post) => (
          <div key={post.id} className="post-card">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostsComponent;
