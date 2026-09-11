import { useEffect, useRef, useState } from "react";
import "../styles/Countdown.css";

function Countdown() {
  const countdownRef = useRef(null);

  const targetDate = new Date(
    "October 3, 2026 08:00:00"
  ).getTime();

  const calculateTime = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(
        distance / (1000 * 60 * 60 * 24)
      ),

      hours: Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
          (1000 * 60 * 60)
      ),

      minutes: Math.floor(
        (distance % (1000 * 60 * 60)) /
          (1000 * 60)
      ),

      seconds: Math.floor(
        (distance % (1000 * 60)) / 1000
      ),
    };
  };

  const [time, setTime] = useState(calculateTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculateTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const element = countdownRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("countdown-show");
        } else {
          element.classList.remove("countdown-show");
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const formatNumber = (number) => {
    return String(number).padStart(2, "0");
  };

  return (
    <section
      className="countdown-section"
      ref={countdownRef}
    >
      <div className="countdown-wrapper">

        {/* =========================
            JUDUL
        ========================= */}

        <div className="countdown-heading">

          <p className="countdown-small-title">
            SAVE THE DATE
          </p>

          <h2>
            Menuju Hari Bahagia
          </h2>

          <p className="countdown-subtitle">
            The countdown to our forever
          </p>

        </div>


        {/* =========================
            ORNAMEN
        ========================= */}

        <div className="countdown-ornament">

          <span></span>

          <i>✦</i>

          <span></span>

        </div>


        {/* =========================
            COUNTDOWN
        ========================= */}

        <div className="countdown-container">

          {/* HARI */}
          <div className="countdown-item">

            <div className="countdown-number">
              {formatNumber(time.days)}
            </div>

            <span>HARI</span>

          </div>


          {/* JAM */}
          <div className="countdown-item">

            <div className="countdown-number">
              {formatNumber(time.hours)}
            </div>

            <span>JAM</span>

          </div>


          {/* MENIT */}
          <div className="countdown-item">

            <div className="countdown-number">
              {formatNumber(time.minutes)}
            </div>

            <span>MENIT</span>

          </div>


          {/* DETIK */}
          <div className="countdown-item">

            <div className="countdown-number">
              {formatNumber(time.seconds)}
            </div>

            <span>DETIK</span>

          </div>

        </div>


        {/* =========================
            TANGGAL
        ========================= */}

        <div className="countdown-date">

          <span></span>

          <p>
            Sabtu, 03 Oktober 2026
          </p>

          <span></span>

        </div>

      </div>
    </section>
  );
}

export default Countdown;