import { useEffect, useRef } from "react";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 2;
  }, []);

  return (
    <section id="hero">
      <div>
        <h1>MacBook Pro</h1>
        <img src="/title.png" alt="MacBook Pro" />
      </div>

      <video ref={videoRef} src="videos/hero.mp4" autoPlay muted playsInline />

      <button>Buy</button>

      <p>From $1599 or $129/month for 24 months</p>
    </section>
  );
};

export default Hero;
