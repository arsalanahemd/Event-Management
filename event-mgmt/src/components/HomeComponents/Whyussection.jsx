// import React from "react";

// const features = [
//   { icon: "🏆", title: "Professional Management",  desc: "Experienced team ensuring every event runs flawlessly from planning to execution." },
//   { icon: "💎", title: "Personalized Planning",     desc: "Every event tailored to reflect your unique style and organizational goals." },
//   { icon: "🤝", title: "Trusted Network",           desc: "Strong vendor relationships for reliable, high-quality services at every scale." },
//   { icon: "⭐", title: "Top Rated",                 desc: "Hundreds of satisfied clients trust us for their most important milestones." },
// ];

// export default function WhyUsSection() {
//   return (
//     <section className="whyus">
//       <div className="container">
//         <div className="sec-header sec-header-center">
//           <p className="eyebrow">Why Choose Us</p>
//           <h2 className="sec-title">
//             Why EventSphere<br /><em>Stands Out</em>
//           </h2>
//         </div>
//         <div className="whyus-grid">
//           {features.map((f, i) => (
//             <div className="whyus-card" key={i}>
//               <span className="whyus-icon">{f.icon}</span>
//               <h3 className="whyus-title">{f.title}</h3>
//               <p className="whyus-desc">{f.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
import React, { useEffect, useRef } from "react";

const features = [
  { icon: "🏆", title: "Professional Management",  desc: "Experienced team ensuring every event runs flawlessly from planning to execution." },
  { icon: "💎", title: "Personalized Planning",     desc: "Every event tailored to reflect your unique style and organizational goals." },
  { icon: "🤝", title: "Trusted Network",           desc: "Strong vendor relationships for reliable, high-quality services at every scale." },
  { icon: "⭐", title: "Top Rated",                 desc: "Hundreds of satisfied clients trust us for their most important milestones." },
];

export default function WhyUsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const animatedElements = section.querySelectorAll(".animate-on-scroll");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -60px 0px",
        threshold: 0.1,
      }
    );

    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="whyus" ref={sectionRef}>
      <div className="container">
        <div className="sec-header sec-header-center animate-on-scroll animate-fade-up">
          <p className="eyebrow">Why Choose Us</p>
          <h2 className="sec-title">
            Why EventSphere<br /><em>Stands Out</em>
          </h2>
        </div>
        <div className="whyus-grid">
          {features.map((f, i) => (
            <div 
              className="whyus-card animate-on-scroll animate-card-pop" 
              key={i}
              style={{"--delay": `${0.2 + i * 0.15}s`}}
            >
              <span className="whyus-icon">{f.icon}</span>
              <h3 className="whyus-title">{f.title}</h3>
              <p className="whyus-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll-Triggered Animations CSS */}
      <style>{`
        /* === DEFAULT HIDDEN STATE === */
        .animate-on-scroll {
          opacity: 0;
          will-change: transform, opacity;
        }

        /* === VISIBLE STATE === */
        .animate-on-scroll.is-visible {
          opacity: 1;
          transform: translate(0, 0) scale(1);
        }

        /* --- Fade Up (Header) --- */
        .animate-fade-up {
          transform: translateY(40px);
          transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0s),
                      transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0s);
        }

        /* --- Card Pop In (Feature Cards) --- */
        .animate-card-pop {
          transform: translateY(50px) scale(0.92);
          transition: opacity 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) var(--delay, 0s),
                      transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) var(--delay, 0s);
        }

        /* === HOVER EFFECTS (Subtle) === */
        .whyus-card {
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.35s ease,
                      background 0.3s ease;
        }
        .whyus-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        .whyus-icon {
          display: inline-block;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .whyus-card:hover .whyus-icon {
          transform: scale(1.2) rotate(-5deg);
        }
        .whyus-title {
          transition: color 0.3s ease;
        }
        .whyus-card:hover .whyus-title {
          color: inherit;
        }
        .whyus-desc {
          transition: opacity 0.3s ease;
        }
        .whyus-card:hover .whyus-desc {
          opacity: 0.9;
        }
      `}</style>
    </section>
  );
}