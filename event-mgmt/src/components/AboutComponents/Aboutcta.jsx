import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function AboutCTA() {
  return (
    <div className="about-cta-wrap">
      <motion.div
        className="about-cta"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
      >
        <div className="about-cta-inner">
          <motion.p
            className="a-eyebrow"
            style={{ justifyContent: "center", marginBottom: 16 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Work With Us
          </motion.p>

          <motion.h2
            className="about-cta-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            Let's Create Something<br />
            <em>Amazing Together</em>
          </motion.h2>

          <motion.p
            className="about-cta-desc"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            Partner with EventSphere and make your event a masterpiece. Contact
            our experts today to bring your vision to life.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <Link to="/contact" className="btn-gold">
              Contact Us Now →
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}