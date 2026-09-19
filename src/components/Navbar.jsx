import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Phone, Wrench } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="brand" onClick={close}>
          <span className="brand-icon">
            <Wrench size={22} />
          </span>
          <span>
            <b> חזי שירותי רכב</b>
            <small>מכונאות חשמל דיאגנוסטיקה</small>
          </span>
        </Link>

        <nav className={open ? "nav-links open" : "nav-links"}>
          <NavLink to="/" onClick={close}>
            ראשי
          </NavLink>
          <NavLink to="/about" onClick={close}>
            אודות
          </NavLink>
          <NavLink to="/services" onClick={close}>
            שירותים
          </NavLink>
          <NavLink to="/admin" onClick={close}>
            ניהול
          </NavLink>

          <a href="#contact" onClick={close}>
            צור קשר
          </a>
        </nav>

        <a className="nav-phone" href="tel:0538880211">
          <Phone size={17} /> 053-888-0211
        </a>

        <button
          className="menu-btn"
          onClick={() => setOpen(!open)}
          aria-label="פתיחת תפריט"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}