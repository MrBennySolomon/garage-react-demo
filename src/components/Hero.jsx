import React from "react";
import { ArrowLeft, CheckCircle2, Phone, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay" />
      <div className="container hero-content">
        <div className="hero-copy">
          <span className="eyebrow">שירות מקצועי לרכב</span>
          <h1>הרכב שלך בידיים<br /><span>מקצועיות.</span></h1>
          <p>טיפולים, דיאגנוסטיקה, חשמל ומיזוג — עם שירות אישי, שקיפות ומקצועיות.</p>

          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">קבעו תור <ArrowLeft size={18} /></a>
            <a href="tel:0538880211" className="btn btn-ghost"><Phone size={18} /> התקשרו עכשיו</a>
          </div>

          <div className="hero-points">
            <span><CheckCircle2 size={17} /> אבחון מקצועי</span>
            <span><CheckCircle2 size={17} /> הצעת מחיר מראש</span>
            <span><ShieldCheck size={17} /> שירות אמין</span>
          </div>
        </div>
      </div>
    </section>
  );
}