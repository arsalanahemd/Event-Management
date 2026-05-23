import React from "react";
import { motion } from "framer-motion";

/* ---- SAME DATA AS ORIGINAL ---- */
const whyChooseUs = [
  {
    icon: "✨",
    title: "Innovative Concepts",
    desc: "Fresh and imaginative ideas crafted to make every event truly distinctive.",
  },
  {
    icon: "👥",
    title: "Elite Professionals",
    desc: "A skilled team that manages every detail with professionalism and care.",
  },
  {
    icon: "📈",
    title: "Strategic Intelligence",
    desc: "Thoughtful planning powered by insights and hands-on industry experience.",
  },
  {
    icon: "🏆",
    title: "Signature Excellence",
    desc: "A proven record of delivering exceptional events and happy clients worldwide.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

export default function WhyChooseUs() {
  return (
    <section className="whychoose-section">
      <div className="about-container">
        {/* Header */}
        <motion.div
          className="a-sec-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="a-eyebrow">Our Edge</p>
          <h2 className="a-sec-title">
            Why Choose <em>EventSphere</em>
          </h2>
          <p className="a-sec-desc">
            Your vision, our expertise — delivering seamless experiences that
            last a lifetime.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          className="whychoose-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {whyChooseUs.map((item, i) => (
            <motion.div
              className="whychoose-card"
              key={i}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 280, damping: 18 }}
            >
              <div className="wc-icon-wrap">
                <span className="wc-icon">{item.icon}</span>
              </div>
              <h3 className="wc-title">{item.title}</h3>
              <p className="wc-desc">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}