import React from "react";

/**
 * Waze + WhatsApp buttons.
 *
 * Usage:
 *   <ContactButtons
 *     phone="972501234567"            // international format, digits only (no +, no leading 0)
 *     message="שלום, אשמח לפרטים"
 *     lat={31.9730}
 *     lng={34.7925}
 *   />
 *
 * Or navigate by address instead of coordinates:
 *   <ContactButtons phone="972501234567" address="" />
 */
<ContactButtons phone="972538880211" address="המחלקה הוטרינרית - עיריית רמת גן, רמת גן" />
const WAZE_BLUE = "#33CCFF";
const WHATSAPP_GREEN = "#25D366";

function buildWazeUrl({ lat, lng, address }) {
  if (lat != null && lng != null) {
    return `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;
  }
  return `https://waze.com/ul?q=${encodeURIComponent(address || "")}&navigate=yes`;
}

function buildWhatsAppUrl(phone, message) {
  const digits = String(phone || "").replace(/\D/g, "");
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${text}`;
}

function WazeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3C7 3 3.5 6.6 3.5 11c0 1.6.5 3 1.3 4.2-.3 1.1-.9 2-1.6 2.6 1.4.2 2.7-.1 3.7-.8 1.3.7 2.7 1 4.1 1h.2c5 0 8.8-3.6 8.8-8S17 3 12 3z"
        fill="#fff"
      />
      <circle cx="9.3" cy="10.3" r="1.1" fill="#1a1a1a" />
      <circle cx="14.7" cy="10.3" r="1.1" fill="#1a1a1a" />
      <path
        d="M9 13.4c.9 1 2.1 1.5 3 1.5s2.1-.5 3-1.5"
        stroke="#1a1a1a"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2.5a9.5 9.5 0 0 0-8.1 14.4L2.5 21.5l4.7-1.3A9.5 9.5 0 1 0 12 2.5z"
        fill="#fff"
      />
      <path
        d="M8.6 7.5c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3 2.4.9 2.9.7 3.4.7.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3l-1.9-.9c-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.8-.8-1.4-1.7-1.5-2-.2-.3 0-.4.1-.6l.4-.4c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5z"
        fill={WHATSAPP_GREEN}
      />
    </svg>
  );
}

export default function ContactButtons({
  phone,
  message = "",
  lat,
  lng,
  address,
  wazeLabel = "נווט עם Waze",
  whatsappLabel = "שלח הודעה ב-WhatsApp",
  dir = "rtl",
}) {
  const wazeUrl = buildWazeUrl({ lat, lng, address });
  const whatsappUrl = buildWhatsAppUrl(phone, message);

  return (
    <div className="cb-wrap" dir={dir}>
      <style>{`
        .cb-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          font-family: system-ui, -apple-system, "Segoe UI", Arial, sans-serif;
        }
        .cb-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          flex: 1 1 200px;
          min-height: 48px;
          padding: 12px 20px;
          border-radius: 999px;
          font-size: 16px;
          font-weight: 600;
          text-decoration: none;
          transition: transform .12s ease, filter .12s ease;
        }
        .cb-btn:hover { filter: brightness(0.95); }
        .cb-btn:active { transform: scale(0.98); }
        .cb-btn:focus-visible { outline: 3px solid #1a1a1a; outline-offset: 3px; }
        .cb-waze { background: ${WAZE_BLUE}; color: #0b2a35; }
        .cb-whatsapp { background: ${WHATSAPP_GREEN}; color: #06301a; }
        @media (prefers-reduced-motion: reduce) {
          .cb-btn { transition: none; }
        }
      `}</style>

      <a
        className="cb-btn cb-waze"
        href={wazeUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <WazeIcon />
        <span>{wazeLabel}</span>
      </a>

      <a
        className="cb-btn cb-whatsapp"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <WhatsAppIcon />
        <span>{whatsappLabel}</span>
      </a>
    </div>
  );
}
