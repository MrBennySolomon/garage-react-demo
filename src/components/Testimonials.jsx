import React from "react";
import { Quote, Star } from "lucide-react";

const testimonials = [
  { name: "דניאל ל.", text: "שירות מעולה, הסבירו לי בדיוק מה התקלה ומה צריך לעשות. המחיר היה הוגן והעבודה מהירה." },
  { name: "אבי מ.", text: "הגעתי עם בעיית מיזוג וקיבלתי טיפול מקצועי ומהיר. בהחלט אחזור שוב." },
  { name: "רועי ש.", text: "מוסך אמין ושקוף. סוף סוף מקום שבו מרגישים שאפשר לסמוך על מי שמטפל ברכב." }
];

export default function Testimonials() {
  return (
    <section className="section testimonials">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow dark">לקוחות מספרים</span>
          <h2>השירות שלנו מדבר בעד עצמו</h2>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((t) => (
            <article className="testimonial" key={t.name}>
              <Quote className="quote-icon" size={34} />
              <div className="stars">{[1,2,3,4,5].map(n => <Star key={n} size={16} fill="currentColor" />)}</div>
              <p>“{t.text}”</p>
              <strong>{t.name}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}