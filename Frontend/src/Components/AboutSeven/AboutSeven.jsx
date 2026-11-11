import React, { useState } from "react";
import "./AboutSeven.css";

const AboutSeven = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    checkIn: "",
    checkOut: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      checkIn: "",
      checkOut: "",
      message: "",
    });
  };

  return (
    <section className="about-seven-section">
      {/* Luxury Bedroom Image */}
      <div className="about-seven-image">
        <img
          src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1800&q=90"
          alt="Premium luxury hotel bedroom"
        />

        <div className="about-seven-image-overlay"></div>

        {/* Phone Card */}
        <div className="about-seven-phone-card">
          <div className="about-seven-decoration">
            <span></span>
            <i>❧</i>
            <span></span>
          </div>

          <p>Call us for any inquiry</p>

          <a href="tel:98276581673">
            98276581673
          </a>
        </div>
      </div>

      {/* Contact Form */}
      <div className="about-seven-form-wrapper">
        <div className="about-seven-form-card">

          {/* Decoration */}
          <div className="about-seven-form-decoration">
            <span></span>
            <i>❧</i>
            <span></span>
          </div>

          <span className="about-seven-subtitle">
            CONTACT US
          </span>

          <h2>
            We’re Here to Make Your
            <br />
            Stay Unforgettable
          </h2>

          <p className="about-seven-description">
            Have questions, need help with a reservation, or want to
            plan a custom experience? Our team is just a message away.
          </p>

          {submitted ? (
            <div className="about-seven-success">
              <span>✓</span>

              <h3>Thank You!</h3>

              <p>
                Your inquiry has been submitted successfully.
                Our team will contact you soon.
              </p>

              <button
                type="button"
                onClick={() => setSubmitted(false)}
              >
                SEND ANOTHER MESSAGE
              </button>
            </div>
          ) : (
            <form
              className="about-seven-form"
              onSubmit={handleSubmit}
            >
              {/* Name */}
              <div className="about-seven-field">
                <label htmlFor="about-seven-name">
                  Name
                </label>

                <input
                  type="text"
                  id="about-seven-name"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="about-seven-field">
                <label htmlFor="about-seven-email">
                  Email
                </label>

                <input
                  type="email"
                  id="about-seven-email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Check In */}
              <div className="about-seven-field">
                <label htmlFor="about-seven-checkin">
                  Check In
                </label>

                <input
                  type="date"
                  id="about-seven-checkin"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>

              {/* Check Out */}
              <div className="about-seven-field">
                <label htmlFor="about-seven-checkout">
                  Check Out
                </label>

                <input
                  type="date"
                  id="about-seven-checkout"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  min={
                    formData.checkIn ||
                    new Date().toISOString().split("T")[0]
                  }
                  required
                />
              </div>

              {/* Message */}
              <div className="about-seven-field about-seven-message">
                <label htmlFor="about-seven-message">
                  Message
                </label>

                <textarea
                  id="about-seven-message"
                  name="message"
                  placeholder="Write Message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  required
                ></textarea>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="about-seven-submit"
              >
                CHECK AVAILABILITY

                <span>→</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutSeven;