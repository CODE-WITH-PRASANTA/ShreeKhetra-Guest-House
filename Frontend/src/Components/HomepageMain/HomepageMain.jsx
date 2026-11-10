
import React, { useEffect, useState } from "react";
import "./HomepageMain.css";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2000&q=90",
    subtitle: "Unique Palace & Luxury Hotel",
    title: "Discover Your Next Luxurious Hotel",
    description:
      "Experience extraordinary comfort, elegant spaces and unforgettable moments with us.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=2000&q=90",
    subtitle: "Experience Pure Elegance",
    title: "A Beautiful Stay Beyond Expectations",
    description:
      "Relax in beautifully designed rooms where every detail is made for your comfort.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=90",
    subtitle: "Luxury Meets Nature",
    title: "Escape Into Your Dream Destination",
    description:
      "Discover peaceful surroundings, exceptional hospitality and beautiful experiences.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?auto=format&fit=crop&w=2000&q=90",
    subtitle: "Unforgettable Hospitality",
    title: "Your Perfect Holiday Begins Here",
    description:
      "Make every moment special with premium amenities and personalized service.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=90",
    subtitle: "The Art Of Luxury Living",
    title: "Indulge In Comfort And Sophistication",
    description:
      "Enjoy a perfect blend of modern luxury, relaxation and timeless hospitality.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=2000&q=90",
    subtitle: "Your Home Away From Home",
    title: "Create Memories That Last Forever",
    description:
      "From peaceful mornings to beautiful evenings, experience something extraordinary.",
  },
];

const HomepageMain = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const [rooms, setRooms] = useState("1");
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");

  // Automatic image slider - 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Minimum date for booking
  const today = new Date().toISOString().split("T")[0];

  const handleCheckIn = (e) => {
    const value = e.target.value;
    setCheckIn(value);

    if (checkOut && value >= checkOut) {
      setCheckOut("");
    }
  };

  // Booking form submission
  const handleBooking = (e) => {
    e.preventDefault();

    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates.");
      return;
    }

    if (checkOut <= checkIn) {
      alert("Check-out date must be after check-in date.");
      return;
    }

    const bookingDetails = {
      checkIn,
      checkOut,
      rooms,
      adults,
      children,
    };

    console.log("Booking Details:", bookingDetails);

    alert(
      `Booking Details:\nCheck In: ${checkIn}\nCheck Out: ${checkOut}\nRooms: ${rooms}\nAdults: ${adults}\nChildren: ${children}`
    );
  };

  return (
    <div className="homepage-main">

      {/* HERO SECTION */}

      <section className="homepage-hero">

        {/* Background Images */}

        <div className="hero-background">

          {slides.map((slide, index) => (
            <div
              key={index}
              className={`hero-slide ${
                activeSlide === index ? "active" : ""
              }`}
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            />
          ))}

        </div>

        {/* Dark Overlay */}

        <div className="hero-overlay"></div>

        {/* Hero Content */}

        <div className="hero-content" key={activeSlide}>

          <span className="hero-subtitle">
            {slides[activeSlide].subtitle}
          </span>

          <h1 className="hero-title">
            {slides[activeSlide].title}
          </h1>

          <p className="hero-description">
            {slides[activeSlide].description}
          </p>

          <a href="#booking" className="hero-button">
            Explore Rooms
            <span className="hero-arrow">→</span>
          </a>

        </div>

        {/* Slider Indicators */}

        <div className="hero-indicators">

          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              className={`hero-indicator ${
                activeSlide === index ? "selected" : ""
              }`}
              onClick={() => setActiveSlide(index)}
            />
          ))}

        </div>

        {/* Slide Number */}

        <div className="hero-slide-number">
          <span>0{activeSlide + 1}</span>
          <span className="slide-divider"></span>
          <span>0{slides.length}</span>
        </div>

      </section>


      {/* BOOKING SECTION */}

      <section className="booking-section" id="booking">

        <form className="booking-container" onSubmit={handleBooking}>

          {/* Check In */}

          <div className="booking-field">

            <label htmlFor="checkIn">Check In</label>

            <div className="booking-input-wrapper">

              <input
                type="date"
                id="checkIn"
                value={checkIn}
                min={today}
                onChange={handleCheckIn}
                required
              />

            </div>

          </div>


          {/* Check Out */}

          <div className="booking-field">

            <label htmlFor="checkOut">Check Out</label>

            <div className="booking-input-wrapper">

              <input
                type="date"
                id="checkOut"
                value={checkOut}
                min={checkIn || today}
                onChange={(e) => setCheckOut(e.target.value)}
                required
              />

            </div>

          </div>


          {/* Rooms */}

          <div className="booking-field">

            <label htmlFor="rooms">Rooms</label>

            <div className="booking-input-wrapper">

              <select
                id="rooms"
                value={rooms}
                onChange={(e) => setRooms(e.target.value)}
              >
                <option value="1">01 Room</option>
                <option value="2">02 Rooms</option>
                <option value="3">03 Rooms</option>
                <option value="4">04 Rooms</option>
                <option value="5">05 Rooms</option>
              </select>

            </div>

          </div>


          {/* Guests */}

          <div className="booking-field">

            <label>Guests</label>

            <div className="booking-guests">

              <select
                aria-label="Adults"
                value={adults}
                onChange={(e) => setAdults(e.target.value)}
              >
                <option value="1">01 Adult</option>
                <option value="2">02 Adults</option>
                <option value="3">03 Adults</option>
                <option value="4">04 Adults</option>
                <option value="5">05 Adults</option>
                <option value="6">06 Adults</option>
              </select>

              <span className="guest-divider">,</span>

              <select
                aria-label="Children"
                value={children}
                onChange={(e) => setChildren(e.target.value)}
              >
                <option value="0">0 Child</option>
                <option value="1">1 Child</option>
                <option value="2">2 Children</option>
                <option value="3">3 Children</option>
                <option value="4">4 Children</option>
              </select>

            </div>

          </div>


          {/* Booking Button */}

          <div className="booking-submit">

            <button type="submit">
              CHECK NOW
              <span>→</span>
            </button>

          </div>

        </form>

      </section>

    </div>
  );
};

export default HomepageMain;
