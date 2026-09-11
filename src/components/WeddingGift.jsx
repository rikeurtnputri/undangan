import { useEffect, useState } from "react";
import "../styles/WeddingGift.css";

import weddingData from "../data/weddingData";

import bunga from "../assets/images/bunga.png";
import logoBRI from "../assets/images/bri.png";
import logoBCA from "../assets/images/bca.png";

function WeddingGift() {
  const [copied, setCopied] = useState("");

  const brideAccount = weddingData.rekening.bride;
  const groomAccount = weddingData.rekening.groom;

  useEffect(() => {
    const elements = document.querySelectorAll(".gift-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      elements.forEach((element) => observer.unobserve(element));
    };
  }, []);

  const copyRekening = (rekening, id) => {
    if (!rekening) return;

    navigator.clipboard
      .writeText(rekening)
      .then(() => {
        setCopied(id);

        setTimeout(() => {
          setCopied("");
        }, 2000);
      })
      .catch(() => {
        alert("Nomor rekening gagal disalin");
      });
  };

  return (
    <section
      id="wedding-gift"
      className="wedding-gift"
    >

      {/* BUNGA */}
      <img
        src={bunga}
        alt="Bunga"
        className="gift-flower gift-reveal gift-reveal-up"
      />

      {/* HEADER */}
      <div className="gift-header gift-reveal gift-reveal-up">
        <h2>Wedding Gift</h2>

        <p>
          Do’a restu anda merupakan karunia yang sangat berarti
          bagi kami, dan jika memberi adalah ungkapan tanda
          terimakasih anda dapat memberikan kado secara cashless.
        </p>
      </div>


      {/* REKENING BRI */}
      <div className="gift-card gift-reveal gift-from-left">

        <div className="bank-logo-wrapper">
          <img
            src={logoBRI}
            alt="Bank BRI"
            className="bank-logo bank-logo-bri"
          />
        </div>

        <p className="rekening-owner">
          Rekening a.n <strong>{brideAccount.name}</strong>
        </p>

        <div className="rekening-number">
          {brideAccount.number}
        </div>

        <button
          className="copy-button"
          onClick={() =>
            copyRekening(brideAccount.number, "bride")
          }
        >
          {copied === "bride"
            ? "✓ Berhasil Disalin"
            : "Salin No. Rekening"}
        </button>

      </div>


      {/* REKENING BCA */}
      <div className="gift-card gift-reveal gift-from-right">

        <div className="bank-logo-wrapper">
          <img
            src={logoBCA}
            alt="Bank BCA"
            className="bank-logo bank-logo-bca"
          />
        </div>

        <p className="rekening-owner">
          Rekening a.n <strong>{groomAccount.name}</strong>
        </p>

        <div className="rekening-number">
          {groomAccount.number || "Nomor rekening belum diisi"}
        </div>

        <button
          className="copy-button"
          disabled={!groomAccount.number}
          onClick={() =>
            copyRekening(groomAccount.number, "groom")
          }
        >
          {copied === "groom"
            ? "✓ Berhasil Disalin"
            : "Salin No. Rekening"}
        </button>

      </div>

      {/* ALAMAT */}
      <div className="gift-address-wrapper">

        <div className="gift-address gift-reveal gift-from-left">

          <div className="address-icon">
            ♧
          </div>

          <h3>
            Alamat Kediaman Mempelai Wanita
          </h3>

          <p>
            {weddingData.bride.address}
          </p>

        </div>


        <div className="gift-address gift-reveal gift-from-right">

          <div className="address-icon">
            ♧
          </div>

          <h3>
            Alamat Kediaman Mempelai Pria
          </h3>

          <p>
            {weddingData.groom.address}
          </p>

        </div>

      </div>


      {/* PENUTUP */}
      <div className="gift-closing gift-reveal gift-reveal-up">

        <p>
          Merupakan suatu kehormatan dan kebahagiaan bagi kami
          apabila {weddingData.guest} berkenan hadir untuk
          memberikan do’a restu kepada kedua mempelai.
        </p>

      </div>

    </section>
  );
}

export default WeddingGift;