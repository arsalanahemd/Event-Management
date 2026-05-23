import React from "react";

const brands = [
  "Google", "Microsoft", "Amazon", "Meta", "Apple",
  "Netflix", "Spotify", "Adobe", "Salesforce", "Oracle",
  "IBM", "SAP",
];

export default function BrandsMarquee() {
  return (
    <section className="brands-section">
      <p className="brands-label">Trusted by world-class companies</p>
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {[...brands, ...brands].map((brand, i) => (
            <div className="brand-pill" key={i}>
              <span className="brand-dot" />
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}