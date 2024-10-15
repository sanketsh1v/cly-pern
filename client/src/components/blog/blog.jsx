import React, { useState } from 'react';
import './blog.scss';

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const blogPosts = [
    {
      id: 1,
      title: "The Joy of Laughter Yoga",
      excerpt: "Discover how laughter yoga can transform your life and boost your overall well-being.",
      date: "2023-10-15"
    },
    {
      id: 2,
      title: "Adventures in Calgary: Laughter in Nature",
      excerpt: "Explore the beautiful outdoors of Calgary while practicing laughter yoga in scenic locations.",
      date: "2023-10-10"
    },
    {
      id: 3,
      title: "Laughter Yoga for Stress Relief",
      excerpt: "Learn how laughter yoga techniques can help you manage stress and anxiety in your daily life.",
      date: "2023-10-05"
    }
  ];

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="blog-page">
      <h1 className="blog-title">Calgary Laughter Yoga Blog</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search blog posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="blog-posts">
        {filteredPosts.map(post => (
          <div key={post.id} className="blog-card">
            <h2 className="blog-card-title">{post.title}</h2>
            <p className="blog-card-excerpt">{post.excerpt}</p>
            <div className="blog-card-footer">
              <span className="blog-card-date">{post.date}</span>
              <button className="read-more-btn">Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;