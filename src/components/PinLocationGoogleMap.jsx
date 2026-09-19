import { useMemo, useState } from "react";

/**
 * PinLocationGoogleMap
 * Shows a pin at a given latitude/longitude on Google Maps.
 * Uses the free Google Maps embed URL: no API key and no extra npm packages needed.
 *
 * Usage:
 *   <PinLocationGoogleMap lat={48.8584} lng={2.2945} label="Eiffel Tower" />
 */

const PRESETS = [
  { label: "Eiffel Tower, Paris", lat: 48.8584, lng: 2.2945 },
  { label: "Colosseum, Rome", lat: 41.8902, lng: 12.4922 },
  { label: "Statue of Liberty, New York", lat: 40.6892, lng: -74.0445 },
  { label: "Sydney Opera House", lat: -33.8568, lng: 151.2153 },
];

const MAP_TYPES = [
  { id: "m", name: "Map" },
  { id: "k", name: "Satellite" },
];

function buildEmbedUrl(lat, lng, zoom, type) {
  return (
    "https://maps.google.com/maps" +
    `?q=${lat},${lng}` +
    `&z=${zoom}` +
    `&t=${type}` +
    "&output=embed"
  );
}

export default function PinLocationGoogleMap({
  lat = PRESETS[0].lat,
  lng = PRESETS[0].lng,
  label = PRESETS[0].label,
  zoom = 15,
}) {
  const [place, setPlace] = useState({ lat, lng, label });
  const [zoomLevel, setZoomLevel] = useState(zoom);
  const [mapType, setMapType] = useState("m");
  const [latInput, setLatInput] = useState(String(lat));
  const [lngInput, setLngInput] = useState(String(lng));
  const [error, setError] = useState("");

  const src = useMemo(
    () => buildEmbedUrl(place.lat, place.lng, zoomLevel, mapType),
    [place, zoomLevel, mapType]
  );

  const applyCoordinates = () => {
    const la = parseFloat(latInput);
    const ln = parseFloat(lngInput);
    if (Number.isNaN(la) || Number.isNaN(ln) || Math.abs(la) > 90 || Math.abs(ln) > 180) {
      setError("Enter latitude from -90 to 90 and longitude from -180 to 180.");
      return;
    }
    setError("");
    setPlace({ lat: la, lng: ln, label: "Custom location" });
  };

  const choosePreset = (p) => {
    setError("");
    setLatInput(String(p.lat));
    setLngInput(String(p.lng));
    setPlace(p);
  };

  const styles = {
    wrap: {
      maxWidth: 720,
      margin: "0 auto",
      padding: 16,
      fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
      color: "#202124",
    },
    title: { margin: "0 0 4px", fontSize: 22 },
    sub: { margin: "0 0 16px", color: "#5f6368", fontSize: 14 },
    chips: { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 },
    chip: (active) => ({
      padding: "6px 12px",
      borderRadius: 999,
      border: "1px solid " + (active ? "#1a73e8" : "#dadce0"),
      background: active ? "#1a73e8" : "#fff",
      color: active ? "#fff" : "#202124",
      cursor: "pointer",
      fontSize: 13,
    }),
    row: { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 },
    input: {
      flex: "1 1 120px",
      padding: "8px 10px",
      border: "1px solid #dadce0",
      borderRadius: 8,
      fontSize: 14,
    },
    button: {
      padding: "8px 16px",
      border: "none",
      borderRadius: 8,
      background: "#1a73e8",
      color: "#fff",
      fontSize: 14,
      cursor: "pointer",
    },
    error: { color: "#d93025", fontSize: 13, margin: "0 0 8px" },
    mapBox: {
      borderRadius: 12,
      overflow: "hidden",
      border: "1px solid #dadce0",
      marginTop: 8,
    },
    iframe: { display: "block", width: "100%", height: 420, border: 0 },
    footer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 8,
      marginTop: 10,
      fontSize: 13,
      color: "#5f6368",
    },
    select: {
      marginLeft: 6,
      padding: "4px 6px",
      borderRadius: 6,
      border: "1px solid #dadce0",
    },
    link: { color: "#1a73e8" },
  };

  return (
    <div style={styles.wrap}>
      <h2 style={styles.title}>{place.label}</h2>
      <p style={styles.sub}>
        {place.lat.toFixed(5)}, {place.lng.toFixed(5)}
      </p>

      <div style={styles.chips}>
        {PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            style={styles.chip(p.label === place.label)}
            onClick={() => choosePreset(p)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div style={styles.row}>
        <input
          style={styles.input}
          value={latInput}
          onChange={(e) => setLatInput(e.target.value)}
          placeholder="Latitude"
          aria-label="Latitude"
        />
        <input
          style={styles.input}
          value={lngInput}
          onChange={(e) => setLngInput(e.target.value)}
          placeholder="Longitude"
          aria-label="Longitude"
        />
        <button type="button" style={styles.button} onClick={applyCoordinates}>
          Show pin
        </button>
      </div>
      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.mapBox}>
        <iframe
          key={src}
          title={`Google Map showing ${place.label}`}
          style={styles.iframe}
          src={src}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div style={styles.footer}>
        <span>
          <label>
            Zoom:{" "}
            <input
              type="range"
              min={3}
              max={20}
              value={zoomLevel}
              onChange={(e) => setZoomLevel(Number(e.target.value))}
            />
          </label>
          <select
            style={styles.select}
            value={mapType}
            onChange={(e) => setMapType(e.target.value)}
            aria-label="Map type"
          >
            {MAP_TYPES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </span>
        <a
          style={styles.link}
          target="_blank"
          rel="noreferrer"
          href={`https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`}
        >
          Open in Google Maps
        </a>
      </div>
    </div>
  );
}
