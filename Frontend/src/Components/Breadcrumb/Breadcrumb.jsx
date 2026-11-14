
import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaChevronRight } from "react-icons/fa";

import "./Breadcrumb.css";
import breadcrumbImage from "../../assets/breadcrumb.png";

const Breadcrumb = ({
  title = "About Us",
  subtitle = "Discover comfort and luxury near Shree Jagannath Temple.",
  items = [],
}) => {
  const breadcrumbItems = [
    { label: "Home", path: "/" },
    ...items,
    { label: title, path: null },
  ];

  return (
    <section
      className="hotel-breadcrumb"
      style={{
        backgroundImage: `url(${breadcrumbImage})`,
      }}
    >
      {/* Dark Background Overlay */}
      <div className="hotel-breadcrumb-overlay"></div>

      {/* Breadcrumb Content */}
      <div className="hotel-breadcrumb-content">

        <span className="hotel-breadcrumb-tag">
          <span className="breadcrumb-tag-line"></span>
          SHRIKSHETRA RESIDENCY
          <span className="breadcrumb-tag-line"></span>
        </span>

        <h1>{title}</h1>

        <div className="hotel-breadcrumb-line">
          <span></span>
          <span className="hotel-breadcrumb-diamond">◆</span>
          <span></span>
        </div>

        <p>{subtitle}</p>

        {/* Breadcrumb Navigation */}
        <nav className="hotel-breadcrumb-nav">
          {breadcrumbItems.map((item, index) => (
            <React.Fragment key={`${item.label}-${index}`}>

              {index !== 0 && (
                <FaChevronRight className="hotel-breadcrumb-arrow" />
              )}

              {item.path ? (
                <Link
                  to={item.path}
                  className="hotel-breadcrumb-link"
                >
                  {index === 0 && <FaHome />}
                  {item.label}
                </Link>
              ) : (
                <span className="hotel-breadcrumb-active">
                  {item.label}
                </span>
              )}

            </React.Fragment>
          ))}
        </nav>

      </div>

      {/* Bottom Decorative Border */}
      <div className="hotel-breadcrumb-bottom"></div>

    </section>
  );
};

export default Breadcrumb;
