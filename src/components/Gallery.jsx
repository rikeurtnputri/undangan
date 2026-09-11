import { useEffect, useRef, useState } from "react";
import "../styles/Gallery.css";

import foto1 from "../assets/images/1.jpg";
import foto2 from "../assets/images/2.jpg";
import foto3 from "../assets/images/3.jpg";
import foto4 from "../assets/images/4.jpg";
import foto5 from "../assets/images/5.jpg";
import foto6 from "../assets/images/6.jpg";
import foto7 from "../assets/images/7.jpg";
import foto8 from "../assets/images/8.jpg";
import foto9 from "../assets/images/9.jpg";
import foto10 from "../assets/images/10.jpg";

const photos = [
  foto1,
  foto2,
  foto3,
  foto4,
  foto5,
  foto6,
  foto7,
  foto8,
  foto9,
  foto10,
];

function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const galleryRef = useRef(null);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  /* =========================
     ANIMASI SAAT SCROLL
  ========================= */

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.15,
      }
    );

    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    return () => {
      if (galleryRef.current) {
        observer.unobserve(galleryRef.current);
      }
    };
  }, []);

  /* =========================
     CAROUSEL AUTO PLAY
  ========================= */

  useEffect(() => {
    if (!isVisible || lightboxIndex !== null) return;

    const interval = setInterval(() => {
      setCurrentIndex(
        (prev) => (prev + 1) % photos.length
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [isVisible, lightboxIndex]);

  /* =========================
     LIGHTBOX AUTO PLAY
  ========================= */

  useEffect(() => {
    if (lightboxIndex === null) return;

    const interval = setInterval(() => {
      setLightboxIndex(
        (prev) => (prev + 1) % photos.length
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [lightboxIndex]);

  /* =========================
     KEYBOARD
  ========================= */

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;

      if (e.key === "Escape") {
        setLightboxIndex(null);
      }

      if (e.key === "ArrowRight") {
        setLightboxIndex(
          (prev) => (prev + 1) % photos.length
        );
      }

      if (e.key === "ArrowLeft") {
        setLightboxIndex(
          (prev) =>
            (prev - 1 + photos.length) %
            photos.length
        );
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [lightboxIndex]);

  /* =========================
     CAROUSEL SWIPE
  ========================= */

  const handleTouchStart = (e) => {
    touchStartX.current =
      e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current =
      e.changedTouches[0].clientX;

    const distance =
      touchStartX.current -
      touchEndX.current;

    if (Math.abs(distance) < 50) return;

    if (distance > 0) {
      setCurrentIndex(
        (prev) => (prev + 1) % photos.length
      );
    } else {
      setCurrentIndex(
        (prev) =>
          (prev - 1 + photos.length) %
          photos.length
      );
    }
  };

  /* =========================
     LIGHTBOX SWIPE
  ========================= */

  const handleLightboxTouchStart = (e) => {
    touchStartX.current =
      e.touches[0].clientX;
  };

  const handleLightboxTouchEnd = (e) => {
    touchEndX.current =
      e.changedTouches[0].clientX;

    const distance =
      touchStartX.current -
      touchEndX.current;

    if (Math.abs(distance) < 50) return;

    if (distance > 0) {
      setLightboxIndex(
        (prev) => (prev + 1) % photos.length
      );
    } else {
      setLightboxIndex(
        (prev) =>
          (prev - 1 + photos.length) %
          photos.length
      );
    }
  };

  /* =========================
     LIGHTBOX
  ========================= */

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const showPrev = (e) => {
    e.stopPropagation();

    setLightboxIndex(
      (prev) =>
        (prev - 1 + photos.length) %
        photos.length
    );
  };

  const showNext = (e) => {
    e.stopPropagation();

    setLightboxIndex(
      (prev) => (prev + 1) % photos.length
    );
  };

  /* =========================
     POSISI CAROUSEL
  ========================= */

  const getPosition = (index) => {
    let position =
      index - currentIndex;

    if (
      position >
      photos.length / 2
    ) {
      position -= photos.length;
    }

    if (
      position <
      -photos.length / 2
    ) {
      position += photos.length;
    }

    return position;
  };

  return (
    <>
      <section
        ref={galleryRef}
        className={`gallery ${
          isVisible
            ? "gallery-visible"
            : ""
        }`}
      >
        {/* =========================
            HEADER
        ========================= */}

        <div className="gallery-header">

          <span className="gallery-small">
            OUR MOMENTS
          </span>

          <h2 className="gallery-title">
            Look at Our Happiness
          </h2>

          <div className="gallery-line">
            <span></span>
            <span></span>
            <span></span>
          </div>

        </div>


        {/* =========================
            CAROUSEL
        ========================= */}

        <div
          className="gallery-carousel"
          onTouchStart={
            handleTouchStart
          }
          onTouchEnd={
            handleTouchEnd
          }
        >

          <div className="gallery-stage">

            {photos.map(
              (photo, index) => {

                const position =
                  getPosition(index);

                const isCenter =
                  position === 0;

                return (
                  <div
                    key={index}
                    className={`gallery-item ${
                      isCenter
                        ? "center"
                        : ""
                    }`}
                    style={{
                      "--position":
                        position,
                      zIndex:
                        20 -
                        Math.abs(
                          position
                        ),
                    }}
                    onClick={() =>
                      openLightbox(
                        index
                      )
                    }
                  >
                    <img
                      src={photo}
                      alt={`Gallery ${
                        index + 1
                      }`}
                      draggable="false"
                    />
                  </div>
                );
              }
            )}

          </div>

        </div>


        {/* =========================
            DOTS
        ========================= */}

        <div className="gallery-dots">

          {photos.map(
            (_, index) => (
              <span
                key={index}
                className={
                  index ===
                  currentIndex
                    ? "active"
                    : ""
                }
              ></span>
            )
          )}

        </div>

      </section>


      {/* =========================
          LIGHTBOX
      ========================= */}

      {lightboxIndex !== null && (

        <div
          className="gallery-lightbox"
          onClick={closeLightbox}
          onTouchStart={
            handleLightboxTouchStart
          }
          onTouchEnd={
            handleLightboxTouchEnd
          }
        >

          <button
            className="lightbox-close"
            onClick={
              closeLightbox
            }
          >
            ×
          </button>


          <button
            className="lightbox-prev"
            onClick={showPrev}
          >
            ‹
          </button>


          <div
            className="lightbox-image-wrapper"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <img
              src={
                photos[
                  lightboxIndex
                ]
              }
              alt={`Gallery ${
                lightboxIndex + 1
              }`}
            />

            <div className="lightbox-counter">
              {lightboxIndex + 1} /{" "}
              {photos.length}
            </div>

          </div>


          <button
            className="lightbox-next"
            onClick={showNext}
          >
            ›
          </button>

        </div>
      )}
    </>
  );
}

export default Gallery;