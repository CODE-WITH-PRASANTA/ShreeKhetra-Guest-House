
import React, { useMemo, useState } from "react";
import "./NewsSidebar.css";

const blogPosts = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1400&q=85",
    title: "Luxury Hotel Room Disclosing the Secrets of Success",
    category: "Venue Selection",
    comments: "03",
    date: "August 1, 2025",
    description:
      "We offer a wide range of services to our guests, including a restaurant, bar, tennis court, swimming pool, beauty salon, and fitness center. We are improving the hotel services for your guests by providing facilities that make them feel like royalty.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=85",
    title: "Disclosing the Secrets of Success in Luxury Hospitality",
    category: "Venue Selection",
    comments: "03",
    date: "August 4, 2025",
    description:
      "We offer a wide range of services to our guests, including a restaurant, bar, tennis court, swimming pool, beauty salon, and fitness center. We are improving the hotel services for your guests by providing facilities that make them feel like royalty.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1400&q=85",
    title: "20 Ways to Make Your Hotel for the Summer Season",
    category: "Hotel Lifestyle",
    comments: "05",
    date: "August 7, 2025",
    description:
      "Discover inspiring ways to elevate your hotel experience this summer. From beautifully designed guest spaces and exceptional hospitality to relaxing amenities, create unforgettable memories for every guest.",
  },
];

const categories = [
  "City Guide",
  "Digital Nomad",
  "New Places",
  "Popular Hosts",
  "Room With A View",
  "Tips & Tricks",
];

const recentPosts = [
  {
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=250&q=85",
    date: "August 1, 2025",
    title: "Top Six Countries to Visit in Asia Without Travel...",
  },
  {
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=250&q=85",
    date: "August 4, 2025",
    title: "Service mode and daily work of the hotel",
  },
  {
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=250&q=85",
    date: "August 7, 2025",
    title: "The Secrets of Success in Luxury Hospitality",
  },
];

const tags = [
  "Bathroom",
  "Beach",
  "Hotel",
  "Relax",
  "Breakfast",
  "Room",
];

const NewsSidebar = () => {
  const [keyword, setKeyword] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [activeTag, setActiveTag] = useState("");

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const searchText = keyword.toLowerCase();

      const matchesSearch =
        post.title.toLowerCase().includes(searchText) ||
        post.description.toLowerCase().includes(searchText);

      const matchesCategory =
        !activeCategory ||
        post.category.toLowerCase() === activeCategory.toLowerCase() ||
        post.title.toLowerCase().includes(activeCategory.toLowerCase());

      const matchesTag =
        !activeTag ||
        post.title.toLowerCase().includes(activeTag.toLowerCase()) ||
        post.description.toLowerCase().includes(activeTag.toLowerCase());

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [keyword, activeCategory, activeTag]);

  const clearFilters = () => {
    setKeyword("");
    setActiveCategory("");
    setActiveTag("");
  };

  return (
    <section className="news-sidebar-section">
      <div className="news-sidebar-container">

        {/* LEFT COLUMN - BLOG POSTS */}
        <div className="news-sidebar-posts">

          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <article
                className="news-sidebar-card"
                key={post.id}
                style={{ "--card-index": index }}
              >
                {/* Blog Image */}
                <div className="news-sidebar-image-wrap">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="news-sidebar-main-image"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                  <div className="news-sidebar-image-overlay" />
                </div>

                {/* Blog Content */}
                <div className="news-sidebar-card-content">

                  {/* Meta Information */}
                  <div className="news-sidebar-meta">
                    <span>
                      <svg viewBox="0 0 24 24">
                        <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0Z" />
                      </svg>
                      ByAdmin
                    </span>

                    <i />

                    <span>
                      <svg viewBox="0 0 24 24">
                        <circle cx="12" cy="8" r="3.5" />
                        <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
                      </svg>
                      {post.category}
                    </span>

                    <i />

                    <span>
                      <svg viewBox="0 0 24 24">
                        <path d="M21 11.5a8.5 8.5 0 0 1-9 8.5 9.5 9.5 0 0 1-4-.9L3 21l1.9-4.3A8.5 8.5 0 1 1 21 11.5Z" />
                      </svg>
                      ({post.comments}) Comments
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="news-sidebar-card-title">
                    {post.title}
                  </h2>

                  {/* Description */}
                  <p className="news-sidebar-description">
                    {post.description}
                  </p>

                  {/* Read More */}
                  <a
                    href={`/blog/${post.id}`}
                    className="news-sidebar-read-more"
                  >
                    Read More
                    <span>→</span>
                  </a>

                </div>
              </article>
            ))
          ) : (
            <div className="news-sidebar-empty">
              <span>✦</span>
              <h3>No Articles Found</h3>
              <p>
                We couldn't find any hotel stories matching your search.
              </p>
              <button onClick={clearFilters}>
                Clear Filters
              </button>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN - SIDEBAR */}
        <aside className="news-sidebar-right">

          {/* SEARCH BOX */}
          <div className="news-sidebar-search-box">
            <form
              className="news-sidebar-search-form"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="search"
                placeholder="Enter Keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                aria-label="Search blog posts"
              />

              <button type="submit" aria-label="Search">
                <svg viewBox="0 0 24 24">
                  <circle cx="10.8" cy="10.8" r="6.5" />
                  <path d="m16 16 5 5" />
                </svg>
              </button>
            </form>
          </div>

          {/* CATEGORY BOX */}
          <div className="news-sidebar-widget news-sidebar-category">

            <h3 className="news-sidebar-widget-title">
              Category
            </h3>

            <div className="news-sidebar-category-list">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`news-sidebar-category-item ${
                    activeCategory === category ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveCategory(
                      activeCategory === category ? "" : category
                    );
                    setActiveTag("");
                  }}
                >
                  <span>{category}</span>
                  <span className="news-sidebar-category-arrow">→</span>
                </button>
              ))}
            </div>

          </div>

          {/* RECENT POSTS BOX */}
          <div className="news-sidebar-widget news-sidebar-recent">

            <h3 className="news-sidebar-widget-title">
              Recent Posts
            </h3>

            <div className="news-sidebar-recent-list">
              {recentPosts.map((post, index) => (
                <a
                  href={`/blog/recent-${index + 1}`}
                  className="news-sidebar-recent-item"
                  key={index}
                >
                  <div className="news-sidebar-recent-image">
                    <img src={post.image} alt={post.title} loading="lazy" />
                  </div>

                  <div className="news-sidebar-recent-info">
                    <span className="news-sidebar-recent-date">
                      {post.date}
                    </span>

                    <h4>{post.title}</h4>
                  </div>
                </a>
              ))}
            </div>

          </div>

          {/* POPULAR TAGS BOX */}
          <div className="news-sidebar-widget news-sidebar-tags">

            <h3 className="news-sidebar-widget-title">
              Popular Tags
            </h3>

            <div className="news-sidebar-tags-list">
              {tags.map((tag) => (
                <button
                  key={tag}
                  className={`news-sidebar-tag ${
                    activeTag === tag ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveTag(activeTag === tag ? "" : tag);
                    setActiveCategory("");
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>

          </div>

        </aside>

      </div>
    </section>
  );
};

export default NewsSidebar;
