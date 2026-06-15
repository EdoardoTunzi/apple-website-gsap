import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import {
  performanceImages,
  performanceImgPositions,
  performanceImgPositionsMobile,
  performanceImgPositionsTablet,
} from "../constants/index.js";

const Performance = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const sectionEl = sectionRef.current;
      if (!sectionEl) return;

      // Text animation — tutti i viewport
      gsap.fromTo(
        ".content p",
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          ease: "power1.out",
          scrollTrigger: {
            trigger: ".content p",
            start: "top bottom",
            end: "top center",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );

      const mm = gsap.matchMedia();

      // Mobile: posiziona le immagini + stagger fade-up
      mm.add("(max-width: 767px)", () => {
        performanceImgPositionsMobile.forEach((pos) => {
          const vars: Record<string, string> = { bottom: `${pos.bottom}%` };
          if ("left" in pos) vars.left = `${pos.left}%`;
          if ("right" in pos) vars.right = `${pos.right}%`;
          gsap.set(`.${pos.id}`, vars);
        });

        gsap.fromTo(
          performanceImgPositionsMobile.map((p) => `.${p.id}`),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionEl,
              start: "top 70%",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
            },
          }
        );
      });

      // Tablet: scrub verso le posizioni tablet (senza pin)
      mm.add("(min-width: 768px) and (max-width: 1024px)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power1.inOut" },
          scrollTrigger: {
            trigger: sectionEl,
            start: "top bottom",
            end: "center center",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        performanceImgPositionsTablet.forEach((pos) => {
          const vars: Record<string, string> = { bottom: `${pos.bottom}%` };
          if ("left" in pos) vars.left = `${pos.left}%`;
          if ("right" in pos) vars.right = `${pos.right}%`;
          tl.to(`.${pos.id}`, vars, 0);
        });
      });

      // Desktop: scrub con posizioni originali
      mm.add("(min-width: 1025px)", () => {
        const tl = gsap.timeline({
          defaults: { duration: 2, ease: "power1.inOut", overwrite: "auto" },
          scrollTrigger: {
            trigger: sectionEl,
            start: "top bottom",
            end: "center center",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        performanceImgPositions
          .filter((item) => item.id !== "p5")
          .forEach((item) => {
            const vars: Record<string, string> = {};
            if (typeof item.left === "number") vars.left = `${item.left}%`;
            if (typeof item.right === "number") vars.right = `${item.right}%`;
            if (typeof item.bottom === "number") vars.bottom = `${item.bottom}%`;
            tl.to(`.${item.id}`, vars, 0);
          });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="performance" ref={sectionRef}>
      <h2>Next-level graphics performance. Game on.</h2>

      <div className="wrapper">
        {performanceImages.map((item, index) => (
          <img key={index} src={item.src} className={item.id} alt={`Performance Image #${index + 1}`} />
        ))}
      </div>

      <div className="content">
        <p>
          Run graphics-intensive workflows with a responsiveness that keeps up with your imagination. The M4 family of chips features a GPU with a
          second-generation hardware-accelerated ray tracing engine that renders images faster, so{" "}
          <span className="text-white">gaming feels more immersive and realistic than ever.</span> And Dynamic Caching optimizes fast on-chip memory to
          dramatically increase average GPU utilization — driving a huge performance boost for the most demanding pro apps and games.
        </p>
      </div>
    </section>
  );
};
export default Performance;
