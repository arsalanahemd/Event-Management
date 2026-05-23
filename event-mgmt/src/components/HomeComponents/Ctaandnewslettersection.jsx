import React, { useState } from "react";

export function CTASection({ onNavigate }) {
  return (
    <div className="cta">
      <div className="cta-glow" />
      <div className="cta-inner">
        <div>
          <h3 className="cta-title">
            Let's join the<br /><em>tech achievement</em>
          </h3>
          <p className="cta-desc">
            Innovate, collaborate, and revolutionize the future with
            cutting-edge technology and groundbreaking advancements.
          </p>
          <div style={{ marginTop: 28 }}>
            <button className="btn-gold" onClick={() => onNavigate("/events")}>
              Buy Tickets →
            </button>
          </div>
        </div>
        <img
          className="cta-img"
          src="https://images.unsplash.com/photo-1559223607-a43c990c692c?w=400&q=80"
          alt="Join EventSphere"
        />
      </div>
    </div>
  );
}

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  return (
    <section className="newsletter">
      <div className="newsletter-inner">
        <p className="eyebrow">Stay Updated</p>
        <h2 className="newsletter-title">
          Never miss a<br /><em>single news</em>
        </h2>
        <p className="newsletter-desc">
          Stay informed with all the latest updates and news about our events.
          Never miss a moment of our exciting gatherings.
        </p>
        <div className="newsletter-form">
          <input
            className="newsletter-input"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button className="btn-gold">Subscribe</button>
        </div>
      </div>
    </section>
  );
}

export function Footer({ onNavigate }) {
  const cols = [
    {
      title: "Pages",
      links: [
        { label: "About",    path: "/about"    },
        { label: "Speakers", path: "/speakers" },
        { label: "Schedule", path: "/schedule" },
        { label: "Gallery",  path: "/gallery"  },
        { label: "Pricing",  path: "/pricing"  },
      ],
    },
    {
      title: "More",
      links: [
        { label: "FAQ",     path: "/faq"     },
        { label: "Contact", path: "/contact" },
        { label: "Events",  path: "/events"  },
      ],
    },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div>
            <a className="footer-logo" href="#" onClick={e => { e.preventDefault(); onNavigate("/"); }}>
              Event<span>Sphere</span>
            </a>
            <p className="footer-about">
              A comprehensive, responsive event management platform designed for
              those who orchestrate unforgettable conferences and exhibitions.
            </p>
            <div className="footer-socials">
              {["𝕏", "f", "in", "▶"].map((s, i) => (
                <a key={i} href="#" className="footer-social">{s}</a>
              ))}
            </div>
          </div>

          {cols.map((col, i) => (
            <div key={i}>
              <div className="footer-col-title">{col.title}</div>
              <ul className="footer-links">
                {col.links.map((l, j) => (
                  <li key={j}>
                    <a href="#" onClick={e => { e.preventDefault(); onNavigate(l.path); }}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <div className="footer-col-title">Contact</div>
            <ul className="footer-links">
              <li><a href="mailto:hello@eventsphere.com">hello@eventsphere.com</a></li>
              <li><a href="tel:+921234567890">+92 123 456 7890</a></li>
              <li><a href="#">National IT Hall, Karachi</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            Copyright © <a href="#">EventSphere</a> All Rights Reserved
          </p>
          <p className="footer-copy">Designed with passion for innovation</p>
        </div>
      </div>
    </footer>
  );
}