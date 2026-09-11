import { useEffect, useState } from "react";
import "../styles/Ucapan.css";

import fotoBackground from "../assets/images/4.jpg";
import bunga from "../assets/images/bunga.png";

function Ucapan() {
  const [ucapanList, setUcapanList] = useState([]);

  const [nama, setNama] = useState("");
  const [ucapan, setUcapan] = useState("");
  const [kehadiran, setKehadiran] = useState("Hadir");

  const [loading, setLoading] = useState(false);

  const [notifikasi, setNotifikasi] = useState({
    tampil: false,
    tipe: "success",
    judul: "",
    pesan: "",
  });

  const API_URL = "https://tknmxqrrxrvdqtpomjni.supabase.co";

  /* =========================
     AMBIL DATA UCAPAN
  ========================= */

  const ambilUcapan = async () => {
    try {
      const response = await fetch(
        `${API_URL}/get_ucapan.php`
      );

      if (!response.ok) {
        throw new Error("Server tidak merespons");
      }

      const result = await response.json();

      if (result.success) {
        setUcapanList(result.data);
      }
    } catch (error) {
      console.error(
        "Gagal mengambil data ucapan:",
        error
      );
    }
  };

  /* =========================
     LOAD DATA
  ========================= */

  useEffect(() => {
    ambilUcapan();
  }, []);

  /* =========================
     ANIMASI SCROLL
  ========================= */

  useEffect(() => {
    const elements =
      document.querySelectorAll(".ucapan-animate");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      elements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, [ucapanList]);

  /* =========================
     JUMLAH UCAPAN
  ========================= */

  const jumlahUcapan = ucapanList.length;

  const jumlahHadir = ucapanList.filter(
    (item) => item.kehadiran === "Hadir"
  ).length;

  const jumlahTidakHadir = ucapanList.filter(
    (item) => item.kehadiran === "Tidak Hadir"
  ).length;

  /* =========================
     NOTIFIKASI
  ========================= */

  const tampilkanNotifikasi = (
    tipe,
    judul,
    pesan
  ) => {
    setNotifikasi({
      tampil: true,
      tipe,
      judul,
      pesan,
    });
  };

  const tutupNotifikasi = () => {
    setNotifikasi((prev) => ({
      ...prev,
      tampil: false,
    }));
  };

  /* =========================
     KIRIM UCAPAN
  ========================= */

  const kirimUcapan = async (e) => {
    e.preventDefault();

    if (!nama.trim()) {
      tampilkanNotifikasi(
        "error",
        "Nama Belum Diisi",
        "Silakan masukkan nama terlebih dahulu."
      );
      return;
    }

    if (!ucapan.trim()) {
      tampilkanNotifikasi(
        "error",
        "Ucapan Belum Diisi",
        "Silakan tuliskan ucapan dan doa restu terlebih dahulu."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/tambah_ucapan.php`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },

          body: new URLSearchParams({
            nama: nama.trim(),
            ucapan: ucapan.trim(),
            kehadiran: kehadiran,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Server tidak merespons");
      }

      const result = await response.json();

      if (result.success) {
        setNama("");
        setUcapan("");
        setKehadiran("Hadir");

        await ambilUcapan();

        tampilkanNotifikasi(
          "success",
          "Ucapan Berhasil Dikirim",
          "Terima kasih atas doa dan ucapan baik yang telah diberikan untuk kami. ❤️"
        );
      } else {
        tampilkanNotifikasi(
          "error",
          "Ucapan Gagal Dikirim",
          result.message ||
            "Terjadi kesalahan saat mengirim ucapan."
        );
      }
    } catch (error) {
      console.error(
        "Gagal mengirim ucapan:",
        error
      );

      tampilkanNotifikasi(
        "error",
        "Koneksi Bermasalah",
        "Tidak dapat terhubung ke server. Pastikan Laragon sedang berjalan."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* =========================
          SECTION UCAPAN
      ========================= */}

      <section
        id="ucapan"
        className="ucapan-section"
        style={{
          backgroundImage: `url(${fotoBackground})`,
        }}
      >
        <div className="ucapan-bg-overlay"></div>

        <div className="ucapan-container">

          {/* HEADER */}

          <div className="ucapan-header">

            <h2 className="ucapan-animate">
              Ucapan dan Doa Restu
            </h2>

            <p className="ucapan-animate">
              Ucapan selamat dan kebahagiaan bisa dari
              mana saja. Tanpa berjabat tangan, atau
              pelukan hangat, masih ada simpul senyum
              dan doa baik yang kami harapkan.
            </p>

          </div>


          {/* SUMMARY */}

          <div className="ucapan-summary ucapan-animate">

            <div className="summary-item">
              <span className="summary-number">
                {jumlahUcapan}
              </span>

              <span className="summary-label">
                Ucapan
              </span>
            </div>

            <div className="summary-item">
              <span className="summary-number">
                {jumlahHadir}
              </span>

              <span className="summary-label">
                Hadir
              </span>
            </div>

            <div className="summary-item">
              <span className="summary-number">
                {jumlahTidakHadir}
              </span>

              <span className="summary-label">
                Tidak Hadir
              </span>
            </div>

          </div>


          {/* FORM */}

          <form
            className="ucapan-form ucapan-animate"
            onSubmit={kirimUcapan}
          >

            <div className="form-group">

              <label>
                Nama
              </label>

              <input
                type="text"
                placeholder="Masukkan nama"
                value={nama}
                onChange={(e) =>
                  setNama(e.target.value)
                }
                maxLength={100}
              />

            </div>


            <div className="form-group">

              <label>
                Ucapan & Doa Restu
              </label>

              <textarea
                placeholder="Tuliskan ucapan dan doa restu..."
                value={ucapan}
                onChange={(e) =>
                  setUcapan(e.target.value)
                }
                rows="5"
              />

            </div>


            <div className="form-group">

              <label>
                Konfirmasi Kehadiran
              </label>

              <div className="attendance-options">

                <label
                  className={`attendance-option ${
                    kehadiran === "Hadir"
                      ? "active"
                      : ""
                  }`}
                >

                  <input
                    type="radio"
                    name="kehadiran"
                    value="Hadir"
                    checked={
                      kehadiran === "Hadir"
                    }
                    onChange={(e) =>
                      setKehadiran(
                        e.target.value
                      )
                    }
                  />

                  <span>
                    Hadir
                  </span>

                </label>


                <label
                  className={`attendance-option ${
                    kehadiran === "Tidak Hadir"
                      ? "active"
                      : ""
                  }`}
                >

                  <input
                    type="radio"
                    name="kehadiran"
                    value="Tidak Hadir"
                    checked={
                      kehadiran === "Tidak Hadir"
                    }
                    onChange={(e) =>
                      setKehadiran(
                        e.target.value
                      )
                    }
                  />

                  <span>
                    Tidak Hadir
                  </span>

                </label>

              </div>

            </div>


            <button
              type="submit"
              className="ucapan-submit"
              disabled={loading}
            >
              {loading
                ? "Mengirim..."
                : "Kirim Ucapan"}
            </button>

          </form>


          {/* =========================
              LIST UCAPAN
          ========================= */}

          <div className="ucapan-list">

            {ucapanList.length === 0 ? (

              <div className="ucapan-empty ucapan-animate">
                Belum ada ucapan. Jadilah yang pertama
                memberikan doa dan ucapan untuk kedua
                mempelai. ❤️
              </div>

            ) : (

              ucapanList.map((item, index) => (

                <div
                  className="ucapan-item"
                  key={item.id}
                  style={{
                    animationDelay:
                      `${index * 0.08}s`,
                  }}
                >

                  <div className="ucapan-item-top">

                    <h3>
                      {item.nama}
                    </h3>

                    <span
                      className={`attendance-badge ${
                        item.kehadiran === "Hadir"
                          ? "hadir"
                          : "tidak-hadir"
                      }`}
                    >
                      {item.kehadiran}
                    </span>

                  </div>

                  <p>
                    {item.ucapan}
                  </p>

                </div>

              ))

            )}

          </div>


          {/* =========================
              PENUTUP
          ========================= */}

          <div className="ucapan-closing ucapan-animate">

            <p className="ucapan-closing-text">
              Terima Kasih Atas Ucapan
              dan Doa Restunya
            </p>

            <div className="ucapan-initial">
              RA
            </div>

            <div className="ucapan-couple-name">
              Resti & Arif
            </div>

            <img
              src={bunga}
              alt="Bunga"
              className="ucapan-closing-flower"
            />

          </div>

        </div>

      </section>


      {/* =========================
          NOTIFIKASI
      ========================= */}

      {notifikasi.tampil && (

        <div
          className="ucapan-notification-overlay"
          onClick={tutupNotifikasi}
        >

          <div
            className={`ucapan-notification ${
              notifikasi.tipe === "success"
                ? "notification-success"
                : "notification-error"
            }`}
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="notification-icon">
              {notifikasi.tipe === "success"
                ? "✓"
                : "!"}
            </div>

            <h3>
              {notifikasi.judul}
            </h3>

            <p>
              {notifikasi.pesan}
            </p>

            <button
              type="button"
              onClick={tutupNotifikasi}
            >
              OK
            </button>

          </div>

        </div>

      )}
    </>
  );
}

export default Ucapan;