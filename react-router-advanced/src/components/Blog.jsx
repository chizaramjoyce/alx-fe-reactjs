import React from 'react';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: 'Getting Started with React Router',
    excerpt: 'Learn the basics of React Router and how to implement it in your React applications.'
  },
  {
    id: 2,
    title: 'Understanding Protected Routes',
    excerpt: 'Dive deep into implementing protected routes in React applications.'
  },
  {
    id: 3,
    title: 'Mastering Route Parameters',
    excerpt: 'Learn how to work with dynamic route parameters in React Router.'
  }
];

const Blog = () => {
  return (
    <div className="blog-list">
      <h2>Blog Posts</h2>
      <div style={{ 
        display: 'grid', 
        gap: '20px',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {blogPosts.map(post => (
          <article 
            key={post.id}
            style={{
              padding: '20px',
              border: '1px solid #ddd',
              borderRadius: '8px',
            }}
          >
            <h3 style={{ marginTop: 0 }}>{post.title}</h3>
            <p>{post.excerpt}</p>
            <Link 
              to={`/blog/${post.id}`}
              style={{
                display: 'inline-block',
                padding: '8px 16px',
                backgroundColor: '#007bff',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '4px'
              }}
            >
              Read More
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;
export { blogPosts };
