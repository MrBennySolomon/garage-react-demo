import React from "react";
import gar from "../img/garage.jpg";
import gar2 from "../img/garage2.jpg";


const images = [
  "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&w=900&q=80",
  gar,
  gar2
];

export default function Gallery() {
  return (
    <section className="section gallery-section">
      <div className="container">
        <div className="section-heading light-heading">
          <span className="eyebrow"></span>
          <h2>מקצועיות רואים בעיניים</h2>
        </div>
        <div className="gallery-grid">
          {images.map((src, i) => <img key={src} src={src} alt={`עבודת מוסך ${i + 1}`} loading="lazy" />)}
        </div>
      </div>
    </section>
  );
}