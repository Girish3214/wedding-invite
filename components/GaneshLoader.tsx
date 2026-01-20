"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface GaneshaData {
  red: string[];
  gold: string[];
}

export default function GaneshLoader() {
  const [data, setData] = useState<GaneshaData | null>(null);

  useEffect(() => {
    fetch("/api/ganesha-segments")
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error("Failed to load ganesha segments:", err));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#171717]"
    >
      <div className="relative w-80 h-80 rounded-full border border-accent/20 bg-black/60 backdrop-blur-xl flex items-center justify-center overflow-hidden shadow-[0_0_80px_rgba(145,1,1,0.2)]">
        <svg viewBox="0 0 264 216" className="w-[85%] h-[85%] scale-110">
          {data && (
            <>
              {/* Base Red Layer - Fades in first */}
              {data.red.map((d, i) => (
                <motion.path
                  key={`red-${i}`}
                  d={d}
                  fill="#910101"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  transition={{ duration: 1 }}
                />
              ))}

              {/* Gold Layer - Animated one by one */}
              {data.gold.map((d, i) => (
                <motion.path
                  key={`gold-${i}`}
                  d={d}
                  fill="#e9b234"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                />
              ))}

              {/* Eyes - Adding distinct black eyes */}
              <motion.circle
                cx="130"
                cy="60"
                r="2.5"
                fill="#000000"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3.5, duration: 0.5 }}
              />
              <motion.circle
                cx="145"
                cy="60"
                r="2.5"
                fill="#000000"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3.5, duration: 0.5 }}
              />
            </>
          )}
        </svg>

        {/* Decorative inner circle */}
        <div className="absolute inset-4 rounded-full border border-accent/5 pointer-events-none" />
        {/* Subtle glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-radial from-accent/5 to-transparent pointer-events-none" />

        {!data && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-2 border-accent/20 border-t-accent rounded-full"
            />
          </div>
        )}
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
        className="mt-12 text-center"
      >
        <p className="font-heading text-4xl tracking-[0.25em] text-accent uppercase font-bold drop-shadow-2xl">
          Shree Ganeshay Namah
        </p>
        <div className="mt-4 flex flex-col items-center">
          <motion.div
            animate={{ width: ["0%", "100%", "0%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="h-[1px] bg-accent/40 w-48"
          />
          <p className="mt-4 text-accent/50 text-xs tracking-[0.5em] uppercase font-light">
            Invoking Divine Presence
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
