import React from "react";

const sponsors = [
  "Google", "Microsoft", "Amazon Web Services", "Meta", "Apple Inc",
  "Netflix", "Spotify", "Adobe", "Salesforce", "Oracle",
  "IBM", "SAP", "Nvidia", "Intel", "Cisco",
];

export default function SponsorsMarquee() {
  return (
    <section className="sponsors">
      <p className="sponsors-label">Trusted by world-class companies</p>
      <div className="marquee-outer">
        <div className="marquee-track">
          {[...sponsors, ...sponsors].map((name, i) => (
            <div className="sponsor-item" key={i}>
              <span className="sponsor-dot" />
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}