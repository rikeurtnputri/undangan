import { useEffect, useRef } from "react";
import "../styles/LoveStory.css";

function LoveStory() {
  const storyRef = useRef(null);

  useEffect(() => {
    const element = storyRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("love-story-show");
        } else {
          element.classList.remove("love-story-show");
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="love-story"
      className="love-story-section"
      ref={storyRef}
    >
      <div className="love-story-wrapper">

        {/* =========================
            HEADING
        ========================= */}

        <div className="love-story-heading">
          <p>Our Journey</p>

          <h2>Our Love Story</h2>

          <span>
            Every love story is beautiful,
            <br />
            but ours is our favorite.
          </span>
        </div>

        {/* =========================
            TIMELINE
        ========================= */}

        <div className="love-timeline">

          {/* =========================
              AWAL BERTEMU
          ========================= */}

          <div className="love-item">
            <div className="love-dot"></div>

            <div className="love-card">
              <h3>Awal Bertemu</h3>

              <div className="love-line"></div>

              <p>
                Pertemuan yang tidak disengaja
                membawa kami pada sebuah
                perjalanan panjang.
              </p>
            </div>
          </div>

          {/* =========================
              LAMARAN
          ========================= */}

          <div className="love-item">
            <div className="love-dot"></div>

            <div className="love-card">
              <h3>Lamaran</h3>

              <div className="love-line"></div>

              <p>
                Setelah melewati berbagai cerita
                dan menyatukan komitmen untuk
                saling menjaga, tiba waktu untuk
                melangkah ke jenjang yang lebih serius.
                Jumat, 4 April 2025, kami melangsungkan
                acara lamaran.
              </p>
            </div>
          </div>

          {/* =========================
              MENIKAH
          ========================= */}

          <div className="love-item">
            <div className="love-dot"></div>

            <div className="love-card">
              <h3>Menikah</h3>

              <div className="love-line"></div>

              <p>
                Tiba pada waktu yang telah
                digariskan untuk kami melaksanakan
                ibadah terpanjang kami.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default LoveStory;