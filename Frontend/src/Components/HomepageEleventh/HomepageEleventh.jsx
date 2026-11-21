import React, { useEffect, useRef, useState } from "react";
import "./HomepageEleventh.css";

const blogPosts = [
  {
    id: 1,
    date: "July 20, 2025",
    author: "By Admin",
    comments: "(03) Comments",
    title: "Infrastructures with a network focus constantly intersect",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
    featured: true,
  },
  {
    id: 2,
    date: "July 20, 2025",
    author: "By Admin",
    comments: "(03) Comments",
    title: "Start resources appropriately using line metrics.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80",
    featured: false,
  },
  {
    id: 3,
    date: "July 20, 2025",
    author: "By Admin",
    comments: "(03) Comments",
    title: "Appropriately initiate resource through line metrics",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=500&q=80",
    featured: false,
  },
  {
    id: 4,
    date: "July 20, 2025",
    author: "By Admin",
    comments: "(03) Comments",
    title: "Use line metrics to start resources appropriately.",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=500&q=80",
    featured: false,
  },
];

const UserIcon = () => (
  <svg viewBox="0 0 24 24" className="blog-meta-icon" aria-hidden="true">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
  </svg>
);

const CommentIcon = () => (
  <svg viewBox="0 0 24 24" className="blog-meta-icon" aria-hidden="true">
    <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
  </svg>
);

const BlogMeta = ({ post }) => (
  <div className="blog-meta">
    <span>
      <UserIcon /> {post.author}
    </span>
    <span className="blog-separator"></span>
    <span>
      <CommentIcon /> {post.comments}
    </span>
  </div>
);

const HomepageEleventh = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const featuredPost = blogPosts.find((post) => post.featured);
  const sidePosts = blogPosts.filter((post) => !post.featured);

  return (
    <section
      className={`blog-section ${visible ? "blog-visible" : ""}`}
      ref={sectionRef}
    >
      <div className="blog-inner">
        {/* Header */}
        <div className="blog-header">
          <div className="blog-ornament">
            <span>✦</span>
            <i></i>
            <span>❧</span>
            <i></i>
            <span>✦</span>
          </div>

          <p className="blog-tag">NEWS &amp; BLOG</p>

          <h2 className="blog-title">Check Our Latest Blog Post</h2>
        </div>

        {/* Main Grid */}
        <div className="blog-container">
          {/* Featured post */}
          {featuredPost && (
            <article className="blog-main-card">
              <a href="/blog" className="blog-image-wrapper large">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  loading="lazy"
                />
                <span className="blog-date-badge">{featuredPost.date}</span>
                <span className="blog-image-tint"></span>
              </a>

              <div className="blog-content">
                <BlogMeta post={featuredPost} />

                <h3 className="blog-card-title">
                  <a href="/blog">{featuredPost.title}</a>
                </h3>

                <a href="/blog" className="blog-read-more">
                  <span>Read More</span>
                  <span className="blog-read-arrow">→</span>
                </a>
              </div>
            </article>
          )}

          {/* Side posts */}
          <div className="blog-sidebar-list">
            {sidePosts.map((post, index) => (
              <article
                key={post.id}
                className="blog-side-card"
                style={{ "--blog-delay": `${(index + 1) * 140}ms` }}
              >
                <a href="/blog" className="blog-image-wrapper small">
                  <img src={post.image} alt={post.title} loading="lazy" />
                  <span className="blog-date-badge">{post.date}</span>
                </a>

                <div className="blog-content">
                  <BlogMeta post={post} />

                  <h4 className="blog-card-title small">
                    <a href="/blog">{post.title}</a>
                  </h4>

                  <a href="/blog" className="blog-read-more small">
                    <span>Read More</span>
                    <span className="blog-read-arrow">→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* View all */}
        <div className="blog-footer">
          <a href="/blog" className="blog-all-button">
            <span className="blog-btn-text">VIEW ALL POSTS</span>
            <span className="blog-btn-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HomepageEleventh;