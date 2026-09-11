import { useEffect, useState } from "react";
import "../styles/MusicButton.css";

function MusicButton({ audio }) {
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [audio]);

  const toggleMusic = () => {
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch((error) => {
        console.log("Musik gagal diputar:", error);
      });
    } else {
      audio.pause();
    }
  };

  if (!audio) return null;

  return (
    <button
      type="button"
      className={`music-button ${isPlaying ? "playing" : "paused"}`}
      onClick={toggleMusic}
      aria-label={isPlaying ? "Matikan musik" : "Nyalakan musik"}
    >
      {isPlaying ? (
        <svg viewBox="0 0 24 24">
          <path d="M9 18V5l10-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="16" cy="16" r="3" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24">
          <path d="M9 18V5l10-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="16" cy="16" r="3" />
          <path d="M3 3l18 18" />
        </svg>
      )}
    </button>
  );
}

export default MusicButton;