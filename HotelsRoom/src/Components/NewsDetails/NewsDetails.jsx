
import React, { useEffect, useRef, useState } from "react";
import "./NewsDetails.css";

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
    date: "August 1, 2025",
    title: "Top Six Countries to Visit in Asia Without Travel...",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=250&auto=format&fit=crop&q=85",
  },
  {
    date: "August 4, 2025",
    title: "Service mode and daily work of the hotel",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=250&auto=format&fit=crop&q=85",
  },
  {
    date: "August 7, 2025",
    title: "The Secrets of Success in Luxury Hospitality",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=250&auto=format&fit=crop&q=85",
  },
];

const popularTags = [
  "Bathroom",
  "Beach",
  "Hotel",
  "Relax",
  "Breakfast",
  "Room",
];

const NewsDetails = () => {
  const pageRef = useRef(null);
  const [keyword, setKeyword] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [activeTag, setActiveTag] = useState("");

  useEffect(() => {
    const elements = pageRef.current?.querySelectorAll(
      ".news-reveal"
    );

    if (!elements) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("news-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!keyword.trim()) return;

    const article = document.querySelector(".news-article");

    if (article) {
      const text = article.innerText.toLowerCase();
      const found = text.includes(keyword.toLowerCase());

      if (!found) {
        alert("No matching content found in this article.");
      } else {
        article.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  return (
    <section className="news-details-page" ref={pageRef}>
      <div className="news-details-container">

        {/* LEFT SIDE - COMPLETE ARTICLE */}
        <main className="news-article">

          {/* FEATURED IMAGE */}
          <div className="news-featured-image news-reveal">
            <img
              src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1400&auto=format&fit=crop&q=90"
              alt="Luxury hotel reception and elegant interior"
            />
            <div className="news-image-overlay"></div>
            <span className="news-image-label">
              HOTEL JOURNAL
            </span>
          </div>

          {/* ARTICLE META */}
          <div className="news-meta news-reveal">
            <span>
              <i>♟</i> ByAdmin
            </span>
            <b></b>
            <span>
              <i>♙</i> Venue Selection
            </span>
            <b></b>
            <span>
              <i>●</i> (03) Comments
            </span>
          </div>

          {/* ARTICLE TITLE */}
          <h1 className="news-main-title news-reveal">
            Disclosing the Secrets of Success in Luxury Hospitality
          </h1>

          {/* ARTICLE CONTENT */}
          <div className="news-content news-reveal">
            <p>
              Wahyu had a deep love for the natural world from a young
              age. She focused in biodiversity and, soon after
              graduating, worked as a tour guide for visitors, aiming
              to educate and enlighten them about the pristine
              ecosystem of Langkawi, Malaysia, where she was born
              and reared.
            </p>

            <p>
              Our environment as she joins Anantara Desaru Coast
              Resort & Villas. On their excursions with Wahyu, guests
              may expect to observe a variety of animals, including
              hermit crabs, Asian Water Monitors, Oriental Garden
              Lizards, Geckos, Dusky Leaf Monkeys, and much more.
              Every Monday and Friday from 8.30 to 9.30 a.m., guests
              of Anantara Desaru Coast Resort & Villas can gather
              in the lobby to embark on morning adventures.
            </p>
          </div>

          {/* QUOTE BOX */}
          <blockquote className="news-quote news-reveal">
            <p>
              Modern lifeblood of mobile phones and tablets today.
              The true potential your phone icons can provide
              utility. Apps come under various mobile.
            </p>

            <div className="news-quote-author">
              <span></span>
              <cite>Annette Black</cite>
            </div>
          </blockquote>

          {/* MORE ARTICLE CONTENT */}
          <div className="news-content news-reveal">
            <p>
              Spanning across the boulevard of The Pointe on the
              Palm Jumeirah, the Palm Fountain is officially the
              world's largest fountain. The two giant floating
              platforms cover 14,000 square metres of water,
              the highest fountain towering up to 105 metres,
              and lighting up the evening skies of Dubai with
              3,000 magical LED lights.
            </p>
          </div>

          {/* TWO IMAGES IN ONE ROW */}
          <div className="news-gallery news-reveal">
            <div className="news-gallery-item">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&auto=format&fit=crop&q=90"
                alt="Luxury hotel restaurant interior"
              />
            </div>

            <div className="news-gallery-item">
              <img
                src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=900&auto=format&fit=crop&q=90"
                alt="Premium luxury hotel bedroom"
              />
            </div>
          </div>

          {/* SECOND ARTICLE HEADING */}
          <h2 className="news-section-title news-reveal">
            Rules & Regulations
          </h2>

          <div className="news-content news-reveal">
            <p>
              To calm the nerves after your skydive, Anantara Spa
              offers a luxurious Turkish Hammam. Turkish houses,
              or hammams, have been a crucial part of Ottoman culture
              for centuries. Choose from an array of rituals and
              unwind, whilst cleansing out toxins.
            </p>
          </div>

          {/* NUMBERED LIST */}
          <ol className="news-number-list news-reveal">
            <li>
              Watch the same movie at the same time and text
              about your reactions.
            </li>
            <li>
              Create a shared Spotify playlist and listen together.
            </li>
            <li>
              Read a chapter of the same book every day and
              talk about it.
            </li>
          </ol>

          <div className="news-content news-reveal">
            <p>
              Increasing blood circulation and stimulating the
              immune system. Feel flawless after a spa programme
              fit for a sultan, with separate male, female and
              couples' facilities.
            </p>
          </div>

          {/* ARTICLE FOOTER */}
          <div className="news-article-footer news-reveal">

            <div className="news-article-tags">
              <strong>Tag:</strong>

              {["Apartment", "Buyer", "Luxury"].map((tag) => (
                <button
                  type="button"
                  key={tag}
                  className={
                    activeTag === tag
                      ? "news-tag active"
                      : "news-tag"
                  }
                  onClick={() =>
                    setActiveTag(activeTag === tag ? "" : tag)
                  }
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="news-share">
              <strong>Share:</strong>

              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook">
                f
              </a>
              <a href="https://x.com/" target="_blank" rel="noreferrer" aria-label="X">
                X
              </a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                in
              </a>
              <a href="https://www.pinterest.com/" target="_blank" rel="noreferrer" aria-label="Pinterest">
                p
              </a>
            </div>
          </div>
        </main>

        {/* RIGHT SIDE - SIDEBAR */}
        <aside className="news-sidebar">

          {/* SEARCH */}
          <div className="news-sidebar-box news-search-box news-reveal">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Enter Keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />

              <button type="submit" aria-label="Search">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  width="16"
                  height="16"
                >
                  <circle cx="10.8" cy="10.8" r="6.8" />
                  <path d="m16 16 5 5" />
                </svg>
              </button>
            </form>
          </div>

          {/* CATEGORIES */}
          <div className="news-sidebar-box news-category-box news-reveal">
            <h3>Category</h3>

            <div className="news-category-list">
              {categories.map((category) => (
                <button
                  type="button"
                  key={category}
                  className={
                    activeCategory === category
                      ? "news-category-button active"
                      : "news-category-button"
                  }
                  onClick={() =>
                    setActiveCategory(
                      activeCategory === category ? "" : category
                    )
                  }
                >
                  <span>{category}</span>
                  <span className="news-category-arrow">→</span>
                </button>
              ))}
            </div>
          </div>

          {/* RECENT POSTS */}
          <div className="news-sidebar-box news-recent-box news-reveal">
            <h3>Recent Posts</h3>

            <div className="news-recent-list">
              {recentPosts.map((post, index) => (
                <a
                  href="#news-article"
                  className="news-recent-item"
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(".news-article")?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                >
                  <div className="news-recent-image">
                    <img src={post.image} alt={post.title} />
                  </div>

                  <div className="news-recent-info">
                    <span>{post.date}</span>
                    <h4>{post.title}</h4>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* POPULAR TAGS */}
          <div className="news-sidebar-box news-popular-box news-reveal">
            <h3>Popular Tags</h3>

            <div className="news-popular-tags">
              {popularTags.map((tag) => (
                <button
                  type="button"
                  key={tag}
                  className={
                    activeTag === tag
                      ? "news-popular-tag active"
                      : "news-popular-tag"
                  }
                  onClick={() =>
                    setActiveTag(activeTag === tag ? "" : tag)
                  }
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

export default NewsDetails;
