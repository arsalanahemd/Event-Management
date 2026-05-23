import React from "react";
import { motion } from "framer-motion";
import LogoNameTagline from "../../assets/LogoNameTagline.jpg";
// import LogoNameTagline from "../assets/LogoNameTagline.jpg";

const stats = [
  { num: "300+", label: "Events" },
  { num: "600+", label: "Clients" },
  { num: "99%",  label: "Satisfaction" },
];

export default function WhoWeAre() {
  return (
    <section className="who-section">
      <div className="about-container">
        <div className="who-inner">

          {/* LEFT: Text */}
          <motion.div
            className="who-text-side"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <p className="a-eyebrow">Who We Are</p>
            <h2 className="a-sec-title">
              Who <em>We Are</em>
            </h2>
            <p className="a-sec-desc">
              EventSphere is a modern event management company committed to
              excellence, creativity, and innovation. From corporate meetings
              to grand festivals, we deliver experiences that connect people
              and inspire brands.
            </p>
            <p className="a-sec-desc" style={{ marginTop: 14 }}>
              With a team of professionals and years of expertise, we ensure
              every event is planned to perfection — on time, on budget, and
              beyond expectations.
            </p>

            {/* Stats */}
            <motion.div
              className="who-stats"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              {stats.map((s, i) => (
                <motion.div
                  className="who-stat"
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                >
                  <span className="who-stat-num">{s.num}</span>
                  <span className="who-stat-label">{s.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT: Logo with floating circles */}
          <motion.div
            className="who-img-side"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
          >
            <div className="who-img-circle-2" />
            <div className="who-img-circle" />
            <img
              src={LogoNameTagline}
              alt="EventSphere Logo"
              className="who-logo-img"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}