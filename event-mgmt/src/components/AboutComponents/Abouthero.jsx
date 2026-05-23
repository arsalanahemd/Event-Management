import React from "react";
import { motion } from "framer-motion";
import aboutBanner from "../../assets/aboutbanner.png";

export default function AboutHero() {
  return (
    <section className="about-hero">
      {/* Background image */}
      <div
        className="about-hero-bg"
        style={{ "--bg-img": `url(${aboutBanner})` }}
      />
      <div className="about-hero-overlay" />

      {/* Decorative gold lines */}
      <div className="about-hero-line about-hero-line-1" />
      <div className="about-hero-line about-hero-line-2" />

      <div className="about-hero-content">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="about-hero-tag">Our Story</div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="about-hero-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
        >
          About <em>EventSphere</em>
        </motion.h1>

        {/* Desc */}
        <motion.p
          className="about-hero-desc"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
        >
          We craft innovative, seamless, and unforgettable event experiences,
          bringing your vision to life with style and precision.
        </motion.p>
      </div>
    </section>
  );
}