import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const MoreEventsSection = ({ expos = [] }) => {
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".more-animate").forEach((el, i) => {
              el.style.transitionDelay = `${i * 0.1}s`;
              el.classList.add("in-view");
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const FALLBACK = [
    { title: "#Photography Club", theme: "Photography", img: null, bg: "linear-gradient(135deg,#3d1a6e,#1a0a2e)" },
    { title: "#Business Conference", theme: "Business", img: null, bg: "linear-gradient(135deg,#1a3d6e,#0a1a2e)" },
    { title: "#MotoFestival", theme: "Lifestyle", img: null, bg: "linear-gradient(135deg,#6e1a3d,#2e0a1a)" },
    { title: "#Design & Marketing", theme: "Marketing", img: null, bg: "linear-gradient(135deg,#3d6e1a,#1a2e0a)" },
  ];

  const items = expos.length > 0
    ? expos.slice(0, 4).map((e) => ({ title: e.title, theme: e.theme, img: `http://localhost:3001/uploads/${e.image}`, bg: null }))
    : FALLBACK;

  return (
    <section ref={sectionRef} style={{ background: "#f7f5f0", padding: "60px 6vw 80px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');
        .more-animate { opacity: 0; transform: translateY(22px); transition: opacity 0.55s ease, transform 0.55s ease; }
        .more-animate.in-view { opacity: 1; transform: translateY(0); }
        .more-card { border-radius: 18px; overflow: hidden; position: relative; cursor: pointer; transition: transform 0.35s cubic-bezier(.4,0,.2,1), box-shadow 0.3s; box-shadow: 0 2px 16px #0001; }
        .more-card:hover { transform: translateY(-8px) scale(1.03); box-shadow: 0 14px 36px #7B5EA722; }
        .more-card .overlay { position: absolute; inset: 0; background: linear-gradient(0deg, #0009 0%, transparent 60%); }
        .more-card .card-label { position: absolute; bottom: 14px; left: 14px; color: #fff; font-family: 'Syne', sans-serif; font-weight: 700; font-size: 0.88rem; }
        .more-card .card-theme { position: absolute; top: 12px; left: 12px; background: rgba(123,94,167,0.85); color: #fff; border-radius: 20px; padding: 3px 12px; font-size: 0.7rem; font-weight: 700; font-family: 'DM Sans', sans-serif; }
        .more-follow-btn { display: inline-flex; align-items: center; gap: 8px; border: 2px solid #7B5EA7; color: #7B5EA7; background: transparent; border-radius: 24px; padding: 8px 22px; font-family: 'DM Sans', sans-serif; font-size: 0.85rem; font-weight: 700; cursor: pointer; transition: all 0.2s; }
        .more-follow-btn:hover { background: #7B5EA7; color: #fff; }
      `}</style>

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div className="more-animate" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", marginBottom: 32, gap: 16 }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#1a0a2e", margin: 0 }}>More from EventSphere</h2>
          <button className="more-follow-btn" onClick={() => navigate("/events")}>
            📅 Follow us
          </button>
        </div>

        {/* Cards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 18 }}>
          {items.map((item, i) => (
            <div key={i} className="more-card more-animate" style={{ height: 260 }} onClick={() => navigate("/events")}>
              {item.img
                ? <img src={item.img} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={e => { e.target.style.display="none"; e.target.parentNode.style.background = FALLBACK[i]?.bg || "#1a0a2e"; }} />
                : <div style={{ width: "100%", height: "100%", background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48 }}>🎪</div>
              }
              <div className="overlay" />
              {item.theme && <div className="card-theme">{item.theme}</div>}
              <div className="card-label">{item.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoreEventsSection;