import React from 'react';
import './HomepageEleventh.css';

const blogPosts = [
  {
    id: 1,
    date: 'July 20, 2025',
    author: 'ByAdmin',
    comments: '(03) Comments',
    title: 'Infrastructures with a network focus constantly intersect',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    id: 2,
    date: 'July 20, 2025',
    author: 'ByAdmin',
    comments: '(03) Comments',
    title: 'Start resources appropriately using line metrics.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80',
    featured: false,
  },
  {
    id: 3,
    date: 'July 20, 2025',
    author: 'ByAdmin',
    comments: '(03) Comments',
    title: 'Appropriately initiate resource through line metrics',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80',
    featured: false,
  },
  {
    id: 4,
    date: 'July 20, 2025',
    author: 'ByAdmin',
    comments: '(03) Comments',
    title: 'Use line metrics to start resources appropriately.',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=400&q=80',
    featured: false,
  },
];

const HomepageEleventh = () => {
  const featuredPost = blogPosts.find((post) => post.featured);
  const sidePosts = blogPosts.filter((post) => !post.featured);

  return (
    <section className="blog-section">
      {/* Header section */}
      <div className="blog-header">
        <span className="blog-subtitle-deco">
          <span className="line"></span>
          <span className="deco-icon">✦ ❖ ✦</span>
          <span className="line"></span>
        </span>
        <h4 className="blog-tag">NEWS & BLOG</h4>
        <h2 className="blog-title">Check Our Latest Blog Post</h2>
      </div>

      {/* Main Grid Content */}
      <div className="blog-container">
        {/* Left Large Featured Post */}
        {featuredPost && (
          <div className="blog-main-card">
            <div className="blog-image-wrapper large">
              <img src={featuredPost.image} alt={featuredPost.title} />
              <span className="blog-date-badge">{featuredPost.date}</span>
            </div>
            <div className="blog-content">
              <div className="blog-meta">
                <span><i className="user-icon">👤</i> {featuredPost.author}</span>
                <span className="separator">|</span>
                <span><i className="comment-icon">💬</i> {featuredPost.comments}</span>
              </div>
              <h3 className="blog-card-title">{featuredPost.title}</h3>
            </div>
          </div>
        )}

        {/* Right Stacked Posts */}
        <div className="blog-sidebar-list">
          {sidePosts.map((post) => (
            <div key={post.id} className="blog-side-card">
              <div className="blog-image-wrapper small">
                <img src={post.image} alt={post.title} />
                <span className="blog-date-badge">{post.date}</span>
              </div>
              <div className="blog-content">
                <div className="blog-meta">
                  <span><i className="user-icon">👤</i> {post.author}</span>
                  <span className="separator">|</span>
                  <span><i className="comment-icon">💬</i> {post.comments}</span>
                </div>
                <h4 className="blog-card-title small">{post.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomepageEleventh;