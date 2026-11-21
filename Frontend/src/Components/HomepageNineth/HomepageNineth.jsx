import React, { useEffect, useRef, useState } from "react";
import "./HomepageNineth.css";

const teamMembers = [
  {
    id: 1,
    name: "Esther Howard",
    role: "CEO & Founder",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=85",
    social: {
      facebook: "https://facebook.com",
      twitter: "https://x.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
    },
  },
  {
    id: 2,
    name: "Jenny Wilson",
    role: "Executive Manager",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=85",
    social: {
      facebook: "https://facebook.com",
      twitter: "https://x.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
    },
  },
  {
    id: 3,
    name: "Wade Warren",
    role: "Relations Manager",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=85",
    social: {
      facebook: "https://facebook.com",
      twitter: "https://x.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
    },
  },
];

const SocialIcon = ({ type }) => {
  const icons = {
    facebook: (
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5h1.7V3.7c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.5v1.8H7V13h2.8v8h3.7z" />
    ),
    twitter: (
      <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-5-7.1L5.7 22H2.5l7.3-8.4L2 2h6.5l4.5 6.5L18.9 2zm-1.1 18h1.7L7.5 3.9H5.7L17.8 20z" />
    ),
    linkedin: (
      <path d="M5.2 3.5a2.2 2.2 0 1 1-4.4 0 2.2 2.2 0 0 1 4.4 0zM1.2 7.3h3.7V21H1.2V7.3zm5.9 0h3.6v1.9h.1c.5-.9 1.8-2.2 3.8-2.2 4 0 4.8 2.6 4.8 6V21h-3.8v-7.1c0-1.7 0-3.8-2.3-3.8s-2.6 1.8-2.6 3.7V21H7.1V7.3z" />
    ),
   
    instagram: (
      <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.4 5.6 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.6 18.4 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
    ),
  };

  return (
    <svg viewBox="0 0 24 24" className="team-social-svg" aria-hidden="true">
      {icons[type]}
    </svg>
  );
};

const HomepageNineth = () => {
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

  return (
    <section
      className={`homepage-team ${visible ? "team-section-visible" : ""}`}
      ref={sectionRef}
    >
      <div className="team-container">
        {/* SECTION HEADING */}
        <div className="team-heading">
          <div className="team-ornament">
            <span>✦</span>
            <i></i>
            <span>❧</span>
            <i></i>
            <span>✦</span>
          </div>

          <p>HOTEL TEAM MEMBER</p>

          <h2>Expert Team Persons</h2>
        </div>

        {/* TEAM CARDS */}
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <article
              className="team-card"
              key={member.id}
              style={{ "--team-delay": `${index * 180}ms` }}
            >
              {/* Teal banner behind the photo */}
              <div className="team-card-banner">
                <span className="team-banner-ring team-banner-ring-one"></span>
                <span className="team-banner-ring team-banner-ring-two"></span>
              </div>

              {/* PROFILE IMAGE */}
              <div className="team-image-wrapper">
                <div className="team-image-border">
                  <img src={member.image} alt={member.name} loading="lazy" />
                </div>
              </div>

              {/* MEMBER DETAILS */}
              <div className="team-member-info">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>

              <div className="team-card-divider"></div>

              {/* SOCIAL LINKS */}
              <div className="team-social-links">
                {Object.entries(member.social).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} ${platform}`}
                    className="team-social-link"
                  >
                    <SocialIcon type={platform} />
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomepageNineth;