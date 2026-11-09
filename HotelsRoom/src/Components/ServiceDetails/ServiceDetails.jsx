import React, { useState } from 'react';
import './ServiceDetails.css';

const ServiceDetails = () => {
  const [openFaq, setOpenFaq] = useState(1);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const features = [
    'New Recipe', 'Free wi-fi', 'Blackout curtains', 'Soundproofing',
    'Housekeeping', 'Room safe', 'Telephone', 'Bathrobes & Slippers',
    'Concierge', 'Workspace', 'En-Suite Bathroom', 'USB Charging ports',
    'Laundry & Dry Cleaning', 'Closet & Hangers', 'Free Breakfast', 'Balcony Or View Options',
    'Coffee and station', 'Air Condition', 'Restaurant bar', 'Swimming Pool'
  ];

  const faqs = [
    {
      question: 'What time is check-in and check-out?',
      answer: 'Check-in is from 2:00 PM, and check-out is until 11:00 AM. Early check-in or late check-out is available upon request and subject to availability.'
    },
    {
      question: 'Is breakfast included in the room rate?',
      answer: 'Check-in is from 2:00 PM, and check-out is until 11:00 AM. Early check-in or late check-out is available upon request and subject to availability.'
    },
    {
      question: 'What activities are available at the resort?',
      answer: 'We offer swimming pool access, fitness training, culinary experiences at our restaurant & bar, and guided local tours.'
    },
    {
      question: 'Can I cancel or change my booking?',
      answer: 'Yes, cancellations and modifications can be made up to 48 hours prior to check-in without any additional charges.'
    }
  ];

  return (
    <div className="service-details-container">
      {/* Starting Hero Banner Image with Hover Effect */}
      <div className="hero-banner-card">
        <img 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80" 
          alt="Srikhetra Residency Gym Training Grounds" 
          className="hero-banner-img"
        />
        <div className="hero-overlay"></div>
      </div>

      {/* Main Title */}
      <h1 className="service-main-title">Gym Training Grounds</h1>

      {/* Description Section */}
      <p className="service-description">
        We offer a wide range of services to our guests at <strong>Srikhetra Residency</strong>, including a restaurant, bar, tennis court, swimming pool, beauty salon, and fitness center. We are improving the hotel services for your guests by providing the facilities that make them feel like they are in their own homes. In-house restaurants and bars that serve a variety of cuisine and beverages. Room packages sometimes include meal discounts or access to special events,
      </p>

      <p className="service-description secondary-desc">
        such as wine tastings. There are many variations of passages of available, but the majority have suffered alteration in some form, by injected or words which do not look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there is not anything embarrassing hidden in the middle of text.
      </p>

      {/* Service Overview */}
      <div className="section-block">
        <h2 className="section-title">Service Overview</h2>
        <p className="service-description">
          We offer a wide range of services to our guests, including a restaurant, bar, tennis court, swimming pool, beauty salon, and fitness center. We are improving the hotel services for your guests by providing the facilities that make them feel like they are in their own homes. In-house restaurants and bars that serve a variety of cuisine and beverages. Room packages sometimes include meal discounts or access to special events,
        </p>

        {/* Image Showcase Grid */}
        <div className="gallery-grid">
          <div className="gallery-card">
            <img 
              src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80" 
              alt="Srikhetra Residency Interior" 
            />
          </div>
          <div className="gallery-card">
            <img 
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80" 
              alt="Srikhetra Residency Lounge" 
            />
          </div>
        </div>

        <p className="service-description">
          We offer a wide range of services to our guests, including a restaurant, bar, tennis court, swimming pool, beauty salon, and fitness center. We are improving the hotel services for your guests by providing the facilities that make them feel like they are in their own homes. In-house restaurants and bars that serve a variety of cuisine and beverages. Room packages sometimes include meal discounts or access to special events,
        </p>
      </div>

      {/* All Features Section */}
      <div className="section-block">
        <h2 className="section-title">All Features</h2>
        <div className="features-grid">
          {features.map((feature, idx) => (
            <div key={idx} className="feature-item">
              <span className="check-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </span>
              <span className="feature-text">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="section-block faq-section">
        <h2 className="section-title">Frequently Asked Question</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button 
                className={`faq-question ${openFaq === index ? 'active' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <span>{faq.question}</span>
              </button>
              {openFaq === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;