import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogPosts } from './Blog';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const post = blogPosts.find(post => post.id === parseInt(id));

  if (!post) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2>Blog Post Not Found</h2>
        <button 
          onClick={() => navigate('/blog')}
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Back to Blog List
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <article>
        <h2>{post.title}</h2>
        <div style={{ marginTop: '20px' }}>
          <p>{post.excerpt}</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
            eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
            in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </article>
      
      <div style={{ marginTop: '30px' }}>
        <button 
          onClick={() => navigate('/blog')}
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Back to Blog List
        </button>
      </div>
    </div>
  );
};

export default BlogPost;
