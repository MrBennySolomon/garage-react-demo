import React, { useState } from "react";
import { Clock3, Mail, MapPin, Phone, Send } from "lucide-react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  function submit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section id="contact" className="section contact-section">
      <div className="container contact-grid">
        <div>
          <span className="eyebrow dark">צור קשר</span>
          <h2>בואו נדאג לרכב שלך</h2>
          <p className="contact-lead">השאירו פרטים ונחזור אליכם לתיאום מועד נוח.</p>

          <div className="contact-details">
            <a href="tel:0500000000"><span><Phone /></span><div><small>טלפון</small><b>050-000-0000</b></div></a>
            <a href="mailto:info@benny-garage.co.il"><span><Mail /></span><div><small>אימייל</small><b>info@benny-garage.co.il</b></div></a>
            <div><span><MapPin /></span><div><small>כתובת</small><b>רחוב המוסך 10, ראשון לציון</b></div></div>
            <div><span><Clock3 /></span><div><small>שעות פעילות</small><b>א׳–ה׳ 08:00–17:00</b></div></div>
          </div>
        </div>

        <form className="contact-form" onSubmit={submit}>
          <input required placeholder="שם מלא" />
          <input required type="tel" placeholder="טלפון" />
          <select defaultValue="">
            <option value="" disabled>במה נוכל לעזור?</option>
            <option>טיפול תקופתי</option>
            <option>דיאגנוסטיקה</option>
            <option>מיזוג</option>
            <option>חשמל רכב</option>
            <option>תקלה אחרת</option>
          </select>
          <textarea placeholder="ספרו לנו בקצרה על התקלה..." rows="5" />
          <button className="btn btn-primary" type="submit"><Send size={18} /> שליחת פנייה</button>
          {sent && <div className="success">הפנייה נשלחה בהצלחה! נחזור אליכם בהקדם.</div>}
        </form>
      </div>
    </section>
  );
}