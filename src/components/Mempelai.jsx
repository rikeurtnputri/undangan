import { useEffect, useRef } from "react";

import "../styles/Mempelai.css";
import weddingData from "../data/weddingData";

import wanita from "../assets/images/wanita.png";
import laki from "../assets/images/laki.png";

function Mempelai() {
  const mempelaiRef = useRef(null);

  useEffect(() => {
    const section = mempelaiRef.current;
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
        threshold: 0.2,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="mempelai"
      className="mempelai"
      ref={mempelaiRef}
    >
      {/* BACKGROUND */}
      <div className="mempelai-bg"></div>
      <div className="mempelai-overlay"></div>

      <div className="mempelai-content">

        {/* PEMBUKA */}
        <div className="mempelai-intro">
          <p className="mempelai-bismillah">
            Bismillahirrahmanirrahim…
          </p>

          <p className="mempelai-opening">
            Maha suci Allah yang telah menciptakan makhluk-Nya
            berpasang-pasangan dan sungguh besar rahmat dan karunia
            yang diberikan Allah kepada kita semua. Kami mengundang
            Bapak/Ibu/Saudara/i sekaligus mengharapkan doa restu dari
            Bapak/Ibu/Saudara/i dalam acara pernikahan kami.
          </p>
        </div>

        {/* MEMPELAI */}
        <div className="mempelai-wrapper">

          {/* =========================
              MEMPELAI WANITA
          ========================= */}
          <div className="mempelai-card mempelai-bride">

            <img
              src={wanita}
              alt={weddingData.bride.name}
              className="mempelai-photo"
            />

            <h2 className="mempelai-name">
              {weddingData.bride.name}
            </h2>

            {/* INSTAGRAM WANITA */}
            <a
              href="https://www.instagram.com/rresstiia_?stkn=MzJ5N2hnaTN4YWR1"
              target="_blank"
              rel="noopener noreferrer"
              className="mempelai-instagram"
              aria-label="Instagram Resti Agustina"
            >
              <span className="instagram-icon"></span>
            </a>

            {/* ORANG TUA */}
            <p className="mempelai-child">
              Putri dari {weddingData.bride.father} &amp;{" "}
              {weddingData.bride.mother}
            </p>

            {/* ALAMAT */}
            <p className="mempelai-address">
              {weddingData.bride.address}
            </p>
          </div>


          {/* =========================
              PEMISAH
          ========================= */}
          <div className="mempelai-and">
            &amp;
          </div>


          {/* =========================
              MEMPELAI LAKI-LAKI
          ========================= */}
          <div className="mempelai-card mempelai-groom">

            <img
              src={laki}
              alt={weddingData.groom.name}
              className="mempelai-photo"
            />

            <h2 className="mempelai-name">
              {weddingData.groom.name}
            </h2>

            {/* INSTAGRAM LAKI-LAKI - TIDAK ADA AKUN */}
            <div
              className="mempelai-instagram"
              aria-label="Instagram Arif Rahman Hakim"
            >
              <span className="instagram-icon"></span>
            </div>

            {/* ORANG TUA */}
            <p className="mempelai-child">
              Putra dari {weddingData.groom.father} &amp;{" "}
              {weddingData.groom.mother}
            </p>

            {/* ALAMAT */}
            <p className="mempelai-address">
              {weddingData.groom.address}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Mempelai;