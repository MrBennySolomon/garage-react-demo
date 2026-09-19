import { useCallback, useEffect, useRef, useState } from "react";

/**
 * ImageCarousel
 * A dependency-free image carousel with arrows, dots, thumbnails,
 * keyboard navigation, touch swipe and optional autoplay.
 *
 * Usage:
 *   <ImageCarousel
 *     images={[
 *       { src: "/photos/one.jpg", alt: "First photo", caption: "Sunrise" },
 *       { src: "/photos/two.jpg", alt: "Second photo", caption: "Forest" },
 *     ]}
 *     autoPlay
 *     interval={4000}
 *   />
 */

const DEFAULT_IMAGES = [
  { src: "https://picsum.photos/id/1015/1200/700", alt: "River between green hills", caption: "River valley" },
  { src: "https://picsum.photos/id/1018/1200/700", alt: "Mountains under a cloudy sky", caption: "Mountain range" },
  { src: "https://picsum.photos/id/1039/1200/700", alt: "Waterfall in a forest", caption: "Forest waterfall" },
  { src: "https://picsum.photos/id/1043/1200/700", alt: "Lake at sunset", caption: "Lake at sunset" },
  { src: "https://picsum.photos/id/1036/1200/700", alt: "Snowy landscape", caption: "Winter light" },
];

export default function ImageCarousel({
  images = DEFAULT_IMAGES,
  autoPlay = false,
  interval = 4000,
  showThumbnails = true,
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);
  const count = images.length;

  const goTo = useCallback((i) => setIndex(((i % count) + count) % count), [count]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Autoplay
  useEffect(() => {
    if (!autoPlay || paused || count < 2) return;
    const id = setTimeout(next, interval);
    return () => clearTimeout(id);
  }, [autoPlay, paused, interval, next, count]);

  // Keyboard navigation
  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  // Touch swipe
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 40) (diff < 0 ? next : prev)();
    touchStartX.current = null;
  };

  if (count === 0) return <p>No images to show.</p>;

  const styles = {
    root: {
      maxWidth: 800,
      margin: "0 auto",
      padding: 16,
      fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
    },
    viewport: {
      position: "relative",
      overflow: "hidden",
      borderRadius: 12,
      background: "#111",
      outline: "none",
      aspectRatio: "16 / 9",
    },
    track: {
      display: "flex",
      height: "100%",
      transform: `translateX(-${index * 100}%)`,
      transition: "transform 400ms ease",
    },
    slide: { flex: "0 0 100%", height: "100%", position: "relative" },
    img: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
    caption: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      padding: "24px 16px 12px",
      color: "#fff",
      fontSize: 15,
      background: "linear-gradient(transparent, rgba(0,0,0,0.65))",
    },
    arrow: (side) => ({
      position: "absolute",
      top: "50%",
      [side]: 10,
      transform: "translateY(-50%)",
      width: 40,
      height: 40,
      borderRadius: "50%",
      border: "none",
      background: "rgba(255,255,255,0.85)",
      color: "#222",
      fontSize: 20,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }),
    counter: {
      position: "absolute",
      top: 10,
      right: 10,
      padding: "3px 10px",
      borderRadius: 999,
      background: "rgba(0,0,0,0.55)",
      color: "#fff",
      fontSize: 12,
    },
    dots: { display: "flex", justifyContent: "center", gap: 8, marginTop: 12 },
    dot: (active) => ({
      width: active ? 22 : 8,
      height: 8,
      borderRadius: 999,
      border: "none",
      padding: 0,
      cursor: "pointer",
      background: active ? "#2563eb" : "#c7cdd4",
      transition: "all 200ms ease",
    }),
    thumbs: {
      display: "flex",
      gap: 8,
      marginTop: 12,
      overflowX: "auto",
      paddingBottom: 4,
    },
    thumb: (active) => ({
      flex: "0 0 auto",
      width: 84,
      height: 56,
      padding: 0,
      borderRadius: 8,
      overflow: "hidden",
      cursor: "pointer",
      border: active ? "2px solid #2563eb" : "2px solid transparent",
      opacity: active ? 1 : 0.65,
      background: "none",
    }),
  };

  return (
    <div style={styles.root}>
      <div
        style={styles.viewport}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Image carousel"
        onKeyDown={onKeyDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div style={styles.track}>
          {images.map((img, i) => (
            <div
              key={img.src}
              style={styles.slide}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={i !== index}
            >
              <img
                src={img.src}
                alt={img.alt || ""}
                style={styles.img}
                loading={i === 0 ? "eager" : "lazy"}
                draggable={false}
              />
              {img.caption && <div style={styles.caption}>{img.caption}</div>}
            </div>
          ))}
        </div>

        {count > 1 && (
          <>
            <button type="button" style={styles.arrow("left")} onClick={prev} aria-label="Previous image">
              &#8249;
            </button>
            <button type="button" style={styles.arrow("right")} onClick={next} aria-label="Next image">
              &#8250;
            </button>
          </>
        )}
        <div style={styles.counter}>
          {index + 1} / {count}
        </div>
      </div>

      {count > 1 && (
        <div style={styles.dots}>
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              style={styles.dot(i === index)}
              onClick={() => goTo(i)}
              aria-label={`Go to image ${i + 1}`}
              aria-current={i === index}
            />
          ))}
        </div>
      )}

      {showThumbnails && count > 1 && (
        <div style={styles.thumbs}>
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              style={styles.thumb(i === index)}
              onClick={() => goTo(i)}
              aria-label={`Show ${img.alt || `image ${i + 1}`}`}
            >
              <img
                src={img.src.replace("/1200/700", "/200/140")}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                draggable={false}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
