import { useState } from "react";

import Loading from "./components/Loading";
import Cover from "./components/Cover";
import Opening from "./components/Opening";
import Verse from "./components/Verse";
import Mempelai from "./components/Mempelai";
import MusicButton from "./components/MusicButton";
import Acara from "./components/Acara";
import Countdown from "./components/Countdown";
import LoveStory from "./components/LoveStory";
import Gallery from "./components/Gallery";
import WeddingGift from "./components/WeddingGift";
import Ucapan from "./components/Ucapan";
import BottomNav from "./components/BottomNav";

import weddingSong from "./assets/audio/wedding-song.m4a";

function App() {
  const [page, setPage] = useState("loading");
  const [audio, setAudio] = useState(null);

  // =========================
  // LOADING
  // =========================
  if (page === "loading") {
    return (
      <Loading
        onFinish={() => {
          setPage("cover");
        }}
      />
    );
  }

  // =========================
  // COVER
  // =========================
  if (page === "cover") {
    return (
      <Cover
        onOpen={() => {
          const music = new Audio(weddingSong);

          music.loop = true;
          music.volume = 0.5;

          music
            .play()
            .then(() => {
              setAudio(music);
              setPage("invitation");
            })
            .catch((error) => {
              console.log("Musik gagal diputar:", error);

              // Tetap masuk ke undangan
              setAudio(music);
              setPage("invitation");
            });
        }}
      />
    );
  }

  // =========================
  // UNDANGAN DIGITAL
  // =========================
  return (
    <>
      <main className="invitation">

        {/* OPENING */}
        <Opening />

        {/* AYAT / VERSE */}
        <Verse />

        {/* MEMPELAI */}
        <Mempelai />

        {/* ACARA */}
        <Acara />

        {/* COUNTDOWN */}
        <Countdown />

        {/* LOVE STORY */}
        <LoveStory />

        {/* GALERI */}
        <Gallery />

        {/* WEDDING GIFT */}
        <WeddingGift />

        <Ucapan />

        <BottomNav />
        
      </main>

      <MusicButton audio={audio} />
    </>
  );
}

export default App;