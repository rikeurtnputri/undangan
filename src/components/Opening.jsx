import { useEffect, useRef } from "react";

import "../styles/Opening.css";
import weddingData from "../data/weddingData";

import bunga2 from "../assets/images/bunga2.png";

function Opening() {

  const openingRef = useRef(null);

  useEffect(() => {

    const section = openingRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            section.classList.add("show");

          } else {

            section.classList.remove("show");

          }

        });

      },
      {
        threshold: 0.25
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };

  }, []);


  return (
    <section
      id="opening"
      className="opening"
      ref={openingRef}
    >

      {/* =========================
          FOTO PENGANTIN
      ========================= */}

      <div className="opening-bg"></div>

      <div className="opening-overlay"></div>


      {/* =========================
          ISI
      ========================= */}

      <div className="opening-content">


        {/* THE WEDDING OF */}

        <p className="opening-title">

          <span className="opening-title-line"></span>

          The Wedding Of

          <span className="opening-title-line"></span>

        </p>


        {/* NAMA PENGANTIN */}

        <h1 className="opening-names">

          <span>
            Resti Agustina
          </span>

          <b>
            &amp;
          </b>

          <span>
            Arif Rahman Hakim
          </span>

        </h1>


        {/* BUNGA */}

        <img
          src={bunga2}
          className="opening-divider"
          alt="Bunga"
        />


        {/* TANGGAL PERNIKAHAN */}

        <div className="opening-date">

          <p className="opening-event-date">

            {weddingData.event.day},{" "}
            {weddingData.event.date}

          </p>


          {/* SAVE THE DATE */}

          <div className="opening-savethedate">

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >

              <rect
                x="3.5"
                y="5.5"
                width="17"
                height="15"
                rx="2"
              />

              <path d="M3.5 9.5h17" />

              <path d="M8 3v4" />

              <path d="M16 3v4" />

            </svg>


            <span className="opening-savethedate-text">

              Save The Date

            </span>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Opening;