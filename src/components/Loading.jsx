import { useEffect } from "react";
import "../styles/Loading.css";

function Loading({ onFinish }) {
  useEffect(() => {
    // Loading selama 1,5 detik
    const timer = setTimeout(() => {
      onFinish();
    }, 1500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <section className="loading-screen">

      {/* =================================
          LOADING DIAMOND
      ================================= */}

      <div className="loading-box">

        <div className="loading-circle"></div>

        <div className="loading-square square-1"></div>

        <div className="loading-square square-2"></div>

        <div className="loading-square square-3"></div>

      </div>

    </section>
  );
}

export default Loading;