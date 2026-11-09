
import React, { useState, useEffect, useRef } from "react";
import "./NewsDetailsComment.css";

const initialComments = [
  {
    id: 1,
    name: "Mariya Dniza",
    date: "16 Aug, 2025 03:50pm",
    message:
      "Provide regular updates to donors and supporters through newsletters, social media, & the charity website, detailing how funds are being used and the impact achieved.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Michel Phelops",
    date: "16 Aug, 2025 03:50pm",
    message:
      "Use metrics and feedback to assess the success of projects and programs, and share these results with the community to demonstrate accountability and build trust.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Michel Phelops",
    date: "16 Aug, 2025 03:50pm",
    message:
      "Use metrics and feedback to assess the success of projects and programs, and share these results with the community to demonstrate accountability and build trust.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];

const NewsDetailsComment = () => {
  const [comments, setComments] = useState(initialComments);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [replyTo, setReplyTo] = useState(null);

  const formRef = useRef(null);
  const messageRef = useRef(null);
  const sectionRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);

  // Section entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Reply functionality
  const handleReply = (comment) => {
    setReplyTo(comment);
    messageRef.current?.focus();

    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  // Submit comment
  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(trimmedEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    const newComment = {
      id: Date.now(),
      name: trimmedName,
      email: trimmedEmail,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      message: replyTo
        ? `Replying to ${replyTo.name}: ${trimmedMessage}`
        : trimmedMessage,
      avatar: null,
    };

    // Add newly submitted comment to the top
    setComments((prevComments) => [
      newComment,
      ...prevComments,
    ]);

    // Reset form
    setName("");
    setEmail("");
    setMessage("");
    setReplyTo(null);
  };

  return (
    <section
      className={`news-comment-section ${
        isVisible ? "news-comment-visible" : ""
      }`}
      ref={sectionRef}
    >
      <div className="news-comment-container">

        {/* Popular Comments */}
        <div className="news-comment-heading">
          <h2>Popular Comments</h2>
        </div>

        <div className="news-comment-list">
          {comments.map((comment, index) => (
            <article
              className="news-comment-item"
              key={comment.id}
              style={{
                animationDelay: `${index * 0.12}s`,
              }}
            >
              <div className="news-comment-avatar">
                {comment.avatar ? (
                  <img
                    src={comment.avatar}
                    alt={comment.name}
                  />
                ) : (
                  <span>
                    {comment.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              <div className="news-comment-content">
                <div className="news-comment-top">
                  <div className="news-comment-author">
                    <h3>{comment.name}</h3>
                    <span>{comment.date}</span>
                  </div>

                  <button
                    type="button"
                    className="news-comment-reply"
                    onClick={() => handleReply(comment)}
                  >
                    REPLY
                  </button>
                </div>

                <p>{comment.message}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Leave a Reply */}
        <div
          className="news-comment-form-area"
          ref={formRef}
        >
          <h2>Leave a Reply</h2>

          {replyTo && (
            <div className="news-comment-reply-notice">
              <span>
                Replying to <strong>{replyTo.name}</strong>
              </span>

              <button
                type="button"
                onClick={() => setReplyTo(null)}
              >
                Cancel
              </button>
            </div>
          )}

          <form
            className="news-comment-form"
            onSubmit={handleSubmit}
          >
            <div className="news-comment-input-row">
              <input
                type="text"
                placeholder="Name"
                aria-label="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <input
                type="email"
                placeholder="Email"
                aria-label="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <textarea
              ref={messageRef}
              placeholder="Message"
              aria-label="Your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows="5"
            />

            <button
              type="submit"
              className="news-comment-submit"
            >
              {replyTo ? "Submit Reply" : "Submit Comment"}
              <span className="news-comment-submit-arrow">
                →
              </span>
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default NewsDetailsComment;
