import React, { useState } from 'react';
import './blog.scss';

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const blogPosts = [
    {
      id: 1,
      title: "The Joy of Laughter Yoga",
      excerpt: "Laughter yoga is a powerful practice that combines the therapeutic effects of laughter with deep yogic breathing, helping people to transform their lives and improve their overall well-being. This unique exercise taps into the natural healing properties of laughter, reducing stress and boosting endorphin levels, which are known as feel-good hormones. Through sessions that involve intentional laughter, playful exercises, and breathing techniques, laughter yoga provides a full-body workout that can lift your mood, improve your mental clarity, and create a profound sense of connection with others.",
      date: "2023-10-15"
    },
    {
      id: 2,
      title: "Adventures in Calgary: Laughter in Nature",
      excerpt: "Imagine immersing yourself in Calgary's breathtaking outdoor landscapes while engaging in the joyful practice of laughter yoga. Surrounded by the scenic beauty of lush parks, sparkling rivers, and majestic mountain views, laughter yoga takes on an even more powerful dimension. Practicing laughter yoga in Calgary’s outdoor spaces – such as Prince’s Island Park, Nose Hill Park, or the banks of the Bow River – allows you to connect with nature while simultaneously releasing stress and boosting your mood.",
      date: "2023-10-10"
    },
    {
      id: 3,
      title: "Laughter Yoga for Stress Relief",
      excerpt: "Laughter yoga offers practical techniques that can significantly reduce stress and anxiety, making it an effective tool for managing life’s daily challenges. Combining intentional laughter with controlled deep breathing exercises, laughter yoga activates the body’s natural relaxation response, helping to counteract the negative effects of stress. Unlike traditional yoga, which relies on poses, laughter yoga focuses on short exercises and playful interactions that encourage spontaneous laughter and uplift the mood.",
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
              {/* <button className="read-more-btn">Read More</button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;