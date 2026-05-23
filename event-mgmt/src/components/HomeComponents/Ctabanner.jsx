import React from "react";

export default function CTABanner({ onNavigate }) {
  return (
    <section className="cta-section">
      <div className="cta-glow cta-glow-1" />
      <div className="cta-glow cta-glow-2" />
      <div className="cta-inner">
        <p className="section-eyebrow">Limited Seats Available</p>
        <h2 className="cta-title">
          Join the Next Big<br />
          <span className="gradient-text">Event Experience</span>
        </h2>
        <p className="cta-desc">
          Turn your vision into reality — reserve your spot and craft an unforgettable event!
        </p>
        <div className="cta-actions">
          <button className="btn-primary btn-lg" onClick={() => onNavigate("/contact")}>
            Book Now
          </button>
          <button className="btn-ghost" onClick={() => onNavigate("/events")}>
            Learn More →
          </button>
        </div>
        <div className="cta-trust">
          <span>✓ No hidden fees</span>
          <span>✓ 24/7 Support</span>
          <span>✓ Easy Cancellation</span>
        </div>
      </div>
    </section>
  );
}