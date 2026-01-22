"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const Banner = ({
  data,
}: {
  data: {
    brideName: string;
    groomName: string;
    weddingDate: string;
  };
}) => {
  const { scrollY } = useScroll();
  const [vh, setVh] = useState(0);

  useEffect(() => {
    // Capture Viewport Height for accurate interpolation
    setVh(window.innerHeight);

    // Disable Scroll Restoration to force Hero state on reload
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  // --- Scroll Interpolations ---
  // Range: 0px to 400px scroll
  const RANGE = [0, 400];

  // 1. Header Container Morph
  // Height: vh -> 120px
  // We use the captured 'vh' or a fallback for the MotionValue,
  // but we mostly rely on the conditional style to use CSS '100vh' before hydration.
  const headerHeight = useTransform(scrollY, RANGE, [vh || 800, 120]);

  // Background: Transparent -> Glassmorphic (start fade late)
  const bgOpacity = useTransform(scrollY, [200, 400], [0, 0.95]);
  const borderOpacity = useTransform(scrollY, [200, 400], [0, 0.1]);
  const shadowOpacity = useTransform(scrollY, [200, 400], [0, 0.05]);

  // 2. Main Content Wrapper (The Names)
  // Position: Center (50%, 50%) -> Top Left to mimic navbar position
  // We use standard % for responsive centering, then tween to fixed pixel values
  const wrapTop = useTransform(scrollY, RANGE, ["50%", "0%"]);
  const wrapLeft = useTransform(scrollY, RANGE, ["50%", "0%"]);
  const wrapX = useTransform(scrollY, RANGE, ["-50%", "0%"]); // Remove centering offset
  const wrapY = useTransform(scrollY, RANGE, ["-50%", "0%"]); // Remove centering offset

  // Add padding in final state via translations
  // Adjust these values to fine-tune the "Navbar" position
  const contentX = useTransform(scrollY, RANGE, ["0px", "32px"]);
  const contentY = useTransform(scrollY, RANGE, ["0px", "20px"]);
  const contentScale = useTransform(scrollY, RANGE, [1, 0.5]); // Shrink to half size

  // 3. "We are getting married" - Fade out quickly
  const introTextOpacity = useTransform(scrollY, [0, 150], [1, 0]);
  const introTextY = useTransform(scrollY, [0, 150], [0, -20]);

  // 4. Hero Icons - Fade out
  const heroIconsOpacity = useTransform(scrollY, [100, 200], [1, 0]);

  // 5. Navbar Elements (Date & Right Icons) - Fade in late
  const navbarContentOpacity = useTransform(scrollY, [300, 400], [0, 1]);
  const navbarContentY = useTransform(scrollY, [300, 400], [-20, 0]);

  return (
    <>
      <motion.header
        style={{
          // if vh is ready, use the interpolation. Else use 100dvh CSS.
          height: vh ? headerHeight : "100dvh",
          backgroundColor: `rgba(255, 250, 240, ${bgOpacity})`,
          backdropFilter: "blur(12px)",
          borderColor: `rgba(113, 71, 62, ${borderOpacity})`,
          boxShadow: `0 4px 6px -1px rgba(0, 0, 0, ${shadowOpacity})`,
        }}
        className="fixed top-0 left-0 right-0 z-50 overflow-hidden border-b border-transparent transition-colors"
      >
        {/* --- MAIN NAME WRAPPER --- */}
        <motion.div
          style={{
            top: wrapTop,
            left: wrapLeft,
            x: wrapX,
            y: wrapY,
          }}
          // ABSOLUTE POSITIONING WITH AUTO SIZING (Content determines center)
          className="absolute pointer-events-none"
        >
          <motion.div
            style={{
              x: contentX,
              y: contentY,
              scale: contentScale,
              transformOrigin: "top left",
            }}
            className="flex flex-col items-center relative"
          >
            {/* Intro Text */}
            <motion.span
              style={{ opacity: introTextOpacity, y: introTextY }}
              className="text-primary uppercase tracking-[0.3em] font-medium text-xl md:text-2xl absolute -top-16 whitespace-nowrap"
            >
              We are getting married
            </motion.span>

            {/* Names Row */}
            <div className="flex items-center gap-8 whitespace-nowrap">
              {/* Hero Icon Left */}
              <motion.div style={{ opacity: heroIconsOpacity }}>
                <Image
                  src="/icons/bride.png"
                  alt="Bride"
                  width={100}
                  height={100}
                  className="w-16 h-auto opacity-90"
                />
              </motion.div>

              <div className="relative flex flex-col items-center text-center">
                <p className="text-9xl text-foreground font-cookie leading-tight">
                  {data.brideName}
                </p>

                {/* Centered & */}
                <span className="absolute inset-0 flex items-center justify-center text-7xl font-cookie text-primary opacity-40 pointer-events-none">
                  &
                </span>

                <p className="text-9xl text-foreground font-cookie leading-tight">
                  {data.groomName}
                </p>
              </div>

              {/* Hero Icon Right */}
              <motion.div style={{ opacity: heroIconsOpacity }}>
                <Image
                  src="/icons/groom.png"
                  alt="Groom"
                  width={100}
                  height={100}
                  className="w-16 h-auto opacity-90"
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* --- NAVBAR RIGHT CONTENT (Date & Icons) --- */}
        <motion.div
          style={{ opacity: navbarContentOpacity, y: navbarContentY }}
          className="absolute right-8 top-8 flex items-center gap-8"
        >
          {/* Icons moved to right */}
          <div className="flex gap-1">
            <Image
              src="/icons/bride.png"
              alt="Bride"
              width={70}
              height={70}
              className="w-12 h-auto opacity-80"
            />
            <Image
              src="/icons/groom.png"
              alt="Groom"
              width={60}
              height={60}
              className="w-12 h-auto opacity-80"
            />
          </div>

          <div className="text-right hidden md:block border-l border-primary/20 pl-6">
            <p className="text-sm uppercase tracking-widest text-primary font-medium mb-1">
              Wedding Date
            </p>
            <p className="text-3xl font-cookie text-foreground">
              {data.weddingDate}
            </p>
          </div>
        </motion.div>

        {/* Scroll Hint (Bottom of Hero) */}
        <motion.div
          style={{ opacity: introTextOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center w-full"
        >
          <p className="text-foreground/60 font-body mb-2 text-lg">
            With the blessings of Lord Ganesh, we invite you to celebrate our
            union.
          </p>
          <div className="animate-bounce text-primary text-sm tracking-widest uppercase opacity-60">
            Scroll to Explore
          </div>
        </motion.div>
      </motion.header>

      {/* Spacer to allow scrolling */}
      <div className="h-screen w-full pointer-events-none" />
    </>
  );
};

export default Banner;
