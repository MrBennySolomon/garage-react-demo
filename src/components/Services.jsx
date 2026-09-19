import React from "react";
import { BatteryCharging, CarFront, Cog, Cpu, Snowflake, Wrench } from "lucide-react";

const services = [
  { icon: <Cog />, title: "טיפולים תקופתיים", text: "טיפולי שמנים, פילטרים ובדיקות תקופתיות לפי הוראות היצרן." },
  { icon: <Cpu />, title: "דיאגנוסטיקה", text: "איתור תקלות באמצעות ציוד אבחון ובדיקות מקצועיות." },
  { icon: <Snowflake />, title: "מיזוג אוויר", text: "בדיקה, איתור תקלות וטיפול במערכת המיזוג." },
  { icon: <BatteryCharging />, title: "חשמל רכב", text: "איתור תקלות חשמל, מצברים ומערכות טעינה." },
  { icon: <CarFront />, title: "בלמים ומתלים", text: "בדיקה והחלפת רכיבי בלימה ומתלים לפי הצורך." },
  { icon: <Wrench />, title: "תיקונים כלליים", text: "טיפול במגוון תקלות מכניות ותחזוקת רכב." }
];

export default function Services({ preview = false }) {
  const list = preview ? services.slice(0, 3) : services;
  return (
    <section className="section services-section">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow dark">השירותים שלנו</span>
          <h2>כל מה שהרכב שלך צריך</h2>
          <p>שירות מקצועי במקום אחד, עם הסבר ברור לפני כל עבודה.</p>
        </div>
        <div className="service-grid">
          {list.map((service) => (
            <article className="service-card" key={service.title}>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <span className="read-more">למידע נוסף ←</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}