import React from "react";
import { Award, CheckCircle2, Users } from "lucide-react";

export default function About() {
  return (
    <main>
      <section className="page-hero"><div className="container"><span className="eyebrow">אודות</span><h1>חזי חיו - מקצועיות עם יחס אישי</h1></div></section>
      <section className="section about-section">
        <div className="container about-grid">
          <div>
            <span className="eyebrow dark">מי אני</span>
            <h2>שקיפות, מקצועיות ושירות בגובה העיניים</h2>
            <p>אני מאמין שטיפול ברכב מתחיל בהסבר ברור. לפני כל עבודה מסבירים מה נמצא, מה האפשרויות ומה העלות המשוערת.</p>
            <p>המטרה היא להעניק שירות אמין ומקצועי ולבנות קשר ארוך טווח עם כל לקוח.</p>
          </div>
          <div className="about-cards">
            <div><Award /><b>מקצועיות</b><span>עבודה מסודרת ותהליך אבחון ברור.</span></div>
            <div><Users /><b>יחס אישי</b><span>ליווי והסבר לאורך כל הטיפול.</span></div>
            <div><CheckCircle2 /><b>שקיפות</b><span>תיאום ואישור לפני ביצוע עבודות נוספות.</span></div>
          </div>
        </div>
      </section>
    </main>
  );
}