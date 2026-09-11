import { useEffect, useRef } from "react";
import "../styles/Acara.css";
import weddingData from "../data/weddingData";
import bunga from "../assets/images/bunga.png";

function Acara() {
  const acaraRef = useRef(null);

  useEffect(() => {
    const element = acaraRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.classList.add("acara-show");
          } else {
            element.classList.remove("acara-show");
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  const day = weddingData?.event?.day || "Minggu";
  const date = weddingData?.event?.date || "12 Desember 2026";

  // =========================
  // LOKASI ACARA
  // =========================

  const address =
    "Q9M6+WRC, Selamanik, Kabupaten Ciamis, Jawa Barat";

  // Link asli Google Maps lokasi acara
  const mapLinkUrl =
    "https://maps.app.goo.gl/cwJHRUQ9ggcyE7Z38";

  // Lokasi untuk tampilan peta
  const mapQuery =
    "Q9M6+WRC, Selamanik, Kabupaten Ciamis, Jawa Barat";

  const mapEmbedUrl =
    `https://www.google.com/maps?q=${encodeURIComponent(
      mapQuery
    )}&output=embed`;

  return (
    <section
      id="acara"
      className="acara-section"
      ref={acaraRef}
    >

      <div className="acara-wrapper">

        {/* JUDUL */}
        <div className="acara-heading">

          <h2>Acara Pernikahan</h2>

          <img
            src={bunga}
            alt="Bunga dekorasi"
            className="acara-flower"
          />

        </div>


        {/* CARD */}
        <div className="acara-window">

          <div className="acara-inner">

            {/* AKAD */}
            <div className="event-block">

              <div className="event-icon">

                <svg viewBox="0 0 24 24">

                  <circle
                    cx="9"
                    cy="15"
                    r="5"
                  />

                  <circle
                    cx="15"
                    cy="15"
                    r="5"
                  />

                  <path d="M12 4L14 8H10L12 4Z" />

                </svg>

              </div>

              <p className="event-title">
                Akad Nikah
              </p>

              <p className="event-time">
                08.00 WIB
              </p>

              <p className="event-date">
                {day}, {date}
              </p>

            </div>


            {/* DIVIDER */}
            <div className="event-divider"></div>


            {/* RESEPSI */}
            <div className="event-block">

              <div className="event-icon">

                <svg viewBox="0 0 24 24">

                  <circle
                    cx="12"
                    cy="9"
                    r="4.5"
                  />

                  <path d="M12 13.5V21M9 21h6" />

                  <path d="M8.5 7C7 6 6 6.5 6 8s1.5 2.5 3 1.5M15.5 7c1.5-1 2.5-.5 2.5 1s-1.5 2.5-3 1.5" />

                </svg>

              </div>

              <p className="event-title">
                Resepsi Pernikahan
              </p>

              <p className="event-time">
                10.00 WIB
              </p>

              <p className="event-date">
                {day}, {date}
              </p>

            </div>


            {/* DIVIDER */}
            <div className="event-divider"></div>


            {/* LOKASI */}
            <div className="location-block">

              <div className="location-icon">

                <svg viewBox="0 0 24 24">

                  <path
                    d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"
                  />

                  <circle
                    cx="12"
                    cy="9"
                    r="2.5"
                  />

                </svg>

              </div>


              <p className="location-label">
                LOKASI ACARA
              </p>


              <h3>
                Kediaman Mempelai Wanita
              </h3>


              <p className="location-address">
                {address}
              </p>


              {/* GOOGLE MAPS */}
              <div className="map-container">

                <iframe
                  src={mapEmbedUrl}
                  title="Google Maps Lokasi Pernikahan"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />

              </div>


              {/* BUTTON GOOGLE MAPS */}
              <a
                href={mapLinkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="maps-button"
              >

                <span>⌖</span>

                Buka Google Maps

              </a>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Acara;