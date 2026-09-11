import { useEffect, useRef } from "react";

import "../styles/Verse.css";
import weddingData from "../data/weddingData";

function Verse() {

  const verseRef = useRef(null);

  useEffect(() => {

    const section = verseRef.current;

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
      className="verse"
      ref={verseRef}
    >

      {/* =========================
          BACKGROUND
      ========================= */}

      <div className="verse-bg"></div>

      <div className="verse-overlay"></div>


      {/* =========================
          ISI
      ========================= */}

      <div className="verse-content">

        {/* TANDA KUTIP PEMBUKA */}

        <span className="verse-mark verse-mark-open">
          “
        </span>


        {/* AYAT */}

        <p className="verse-text">
          {weddingData.quote}
        </p>


        {/* TANDA KUTIP PENUTUP */}

        <span className="verse-mark verse-mark-close">
          ”
        </span>


        {/* DIVIDER */}

        <div className="verse-divider">

          <span className="verse-divider-line"></span>

          <span className="verse-divider-glyph">
            ✦
          </span>

          <span className="verse-divider-line"></span>

        </div>


        {/* REFERENSI */}

        <p className="verse-reference">
          {weddingData.verse}
        </p>

      </div>

    </section>
  );
}

export default Verse;