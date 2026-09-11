import { useState } from "react";
import "../styles/Cover.css";
import weddingData from "../data/weddingData";

import bunga from "../assets/images/bunga.png";

function Cover({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false);

  // =========================
  // NAMA TAMU DARI URL
  // Contoh:
  // ?to=Herdiansyah
  // ?to=Ibu%20Siti
  // =========================

  const params = new URLSearchParams(window.location.search);

  const namaTamu =
    params.get("to") || weddingData.guest;

  // =========================
  // BUKA UNDANGAN
  // =========================

  const handleOpen = () => {
    if (isOpening) return;

    setIsOpening(true);

    /*
      Beri waktu untuk animasi swipe
      sebelum masuk ke halaman undangan.
    */
    setTimeout(() => {
      onOpen();
    }, 1100);
  };

  return (
    <section
      className={`cover ${
        isOpening ? "cover-opening" : ""
      }`}
    >

      {/* =========================
          CARD UTAMA
      ========================= */}

      <div className="cover-content">

        <div className="cover-inner">


          {/* =========================
              BUNGA ATAS CARD
          ========================= */}

          <img
            src={bunga}
            className="cover-flower"
            alt=""
          />


          {/* =========================
              INISIAL
          ========================= */}

          <p className="initials">
            RA
          </p>


          {/* =========================
              NAMA PENGANTIN
          ========================= */}

          <h1 className="couple-name">

            <span>
              Resti
            </span>

            <b>
              &amp;
            </b>

            <span>
              Arif
            </span>

          </h1>


          {/* =========================
              TEKS UNDANGAN
          ========================= */}

          <div className="invitation-text">

            <p>
              Tanpa Mengurangi Rasa Hormat,
            </p>

            <p>
              Kami Mengundang Anda
            </p>

            <p>
              Untuk Hadir Di Acara Pernikahan Kami
            </p>

          </div>


          {/* =========================
              NAMA TAMU
          ========================= */}

          <div className="guest-box">

            <p className="guest-label">
              Kepada Yth.
            </p>

            <h3 className="guest-name">
              {namaTamu}
            </h3>

          </div>


          {/* =========================
              BUTTON
          ========================= */}

          <button
            className="open-button"
            onClick={handleOpen}
            disabled={isOpening}
          >

            <span className="button-icon">
              ✉
            </span>

            {isOpening
              ? "Membuka..."
              : "Buka Undangan"}

          </button>

        </div>

      </div>

    </section>
  );
}

export default Cover;