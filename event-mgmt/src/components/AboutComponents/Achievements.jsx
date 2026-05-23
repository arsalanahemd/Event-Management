import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ---- SAME DATA AS ORIGINAL ---- */
const achievements = [
  { icon: "📅", number: "300+", raw: 300, suffix: "+", label: "Successful Events" },
  { icon: "👤", number: "600+", raw: 600, suffix: "+", label: "Satisfied Clients" },
  { icon: "🎉", number: "99%",  raw: 99,  suffix: "%", label: "Positive Feedback" },
];

/* Animated counter hook */
function useCounter(target, duration = 1800, shouldStart = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!shouldStart) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [shouldStart, target, duration]);
  return count;
}

function AchievementCard({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useCounter(item.raw, 1600, inView);

  return (
    <motion.div
      ref={ref}
      className="ach-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      whileHover={{ y: -14 }}
      transition={{
        duration: 0.65,
        delay: index * 0.12,
        ease: "easeOut",
        hover: { type: "spring", stiffness: 260, damping: 18 },
      }}
    >
      {/* Icon */}
      <motion.div
        className="ach-icon-wrap"
        initial={{ scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 + index * 0.12 }}
      >
        <span className="ach-icon">{item.icon}</span>
      </motion.div>

      {/* Animated number */}
      <div className="ach-number">
        {inView ? `${count}${item.suffix}` : `0${item.suffix}`}
      </div>

      <div className="ach-label">{item.label}</div>
    </motion.div>
  );
}

export default function Achievements() {
  return (
    <section className="achievements-section">
      <div className="about-container">
        {/* Header */}
        <motion.div
          className="a-sec-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="a-eyebrow">Track Record</p>
          <h2 className="a-sec-title">
            Our <em>Achievements</em>
          </h2>
          <p className="a-sec-desc">
            Transforming visions into reality through dedicated excellence and
            innovation.
          </p>
        </motion.div>

        <div className="achievements-grid">
          {achievements.map((item, i) => (
            <AchievementCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}