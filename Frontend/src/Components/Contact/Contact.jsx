import React from "react";
import "./Contact.css";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been submitted successfully!");
    e.target.reset();
  };

  return (
    <div className="contact-page">

      {/* Heading Section */}
      <div className="contact-heading">
        <h1>
          Need help with your online booking, have a question or need
          <br />
          more information? Just drop us a line!
        </h1>

        <p>
          After the model, myocardinate cross-platform intellectual capital
          quickly. After maintenance, appropriately build interactive
          infrastructures.
          <br />
          Holistically support independent
        </p>
      </div>

      {/* Contact Content */}
      <div className="contact-container">

        {/* Left Contact Information */}
        <div className="contact-info">
          <div className="contact-info-inner">

            <div className="info-block">
              <h2>LOCATION:</h2>
              <p>
                3949 State 38B Rte
                <br />
                Newark Valley, New York(NY), 139
              </p>
            </div>

            <div className="info-block">
              <h2>CONTACT:</h2>
              <p>
                +99 (0) 432 505 8236
                <br />
                luxivo456@gmail.com
              </p>
            </div>

            <div className="info-block">
              <h2>SOCIAL:</h2>

              <div className="social-links">
                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                  f
                </a>

                <a href="https://x.com" target="_blank" rel="noreferrer">
                  X
                </a>

                <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                  in
                </a>

                <a href="https://pinterest.com" target="_blank" rel="noreferrer">
                  p
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Right Contact Form */}
        <div className="contact-form-section">

          <h2>Fill up the form if you have any question</h2>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              placeholder="Your Name*"
              required
            />

            <input
              type="email"
              placeholder="Your Email*"
              required
            />

            <input
              type="tel"
              placeholder="Your Phone*"
              required
            />

            <textarea
              placeholder="Your Message*"
              rows="5"
              required
            ></textarea>

            <button type="submit">
              SEND A MESSAGE <span>→</span>
            </button>

          </form>
        </div>

      </div>

      {/* Google Map */}
      <div className="contact-map">
        <iframe
          title="Google Map"
          src="https://maps.google.com/maps?q=New%20York%20City&t=&z=12&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

    </div>
  );
};

export default Contact;