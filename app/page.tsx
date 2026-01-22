"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import GaneshLoader from "@/components/GaneshLoader";
import { AnimatePresence, motion } from "framer-motion";
import Banner from "../components/Banner";

function WeddingContent() {
  const searchParams = useSearchParams();
  const bride = searchParams.get("bride");
  const groom = searchParams.get("groom");

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!bride || !groom) {
      setError(
        "Please provide bride and groom names in the URL (e.g., /?bride=Kavya&groom=Vaibhav)",
      );
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      const startTime = Date.now();
      try {
        const response = await fetch(
          `/api/invite?bride=${bride}&groom=${groom}`,
        );
        if (!response.ok) {
          throw new Error("Invitation not found or server error.");
        }
        const result = await response.json();
        setData(result);

        // Add a slight delay for the visual experience
        const elapsed = Date.now() - startTime;
        const minimumLoadTime = 5000;
        const delay = Math.max(0, minimumLoadTime - elapsed);
        setTimeout(() => setLoading(false), delay);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [bride, groom]);

  return (
    <main className="min-h-screen relative bg-background text-foreground">
      <AnimatePresence>{loading && <GaneshLoader />}</AnimatePresence>

      <div className="content-container py-20">
        {error ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <h2 className="text-3xl text-primary mb-4 font-heading">
              Om Ganeshay Namah
            </h2>
            <p className="text-muted-foreground">{error}</p>
          </div>
        ) : data ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Hero Section */}
            <Banner data={data} />

            {/* Event Details - Vertical Timeline */}
            <div className="relative max-w-5xl mx-auto px-4 md:px-0">
              {/* Central Line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/10 via-primary/40 to-primary/10 -translate-x-1/2 rounded-full" />

              <div className="flex flex-col gap-12 md:gap-24 relative">
                {data.events?.map((event: any, idx: number) => {
                  const isEven = idx % 2 === 0;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      className={`relative flex items-center md:justify-between ${
                        isEven ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                    >
                      {/* Timeline Dot */}
                      <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-background border-4 border-primary rounded-full z-10 -translate-x-1/2 shadow-[0_0_15px_rgba(233,178,52,0.6)]" />

                      {/* Content Card */}
                      <div
                        className={`w-full md:w-[45%] pl-20 md:pl-0 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}
                      >
                        <div className="p-8 border border-primary/10 rounded-3xl bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-xl hover:border-primary/30 transition-all group relative overflow-hidden">
                          {/* Decorative gradient blob */}
                          <div
                            className={`absolute top-0 ${isEven ? "right-0" : "left-0"} w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 ${isEven ? "translate-x-1/2" : "-translate-x-1/2"}`}
                          />

                          <h3 className="text-3xl text-primary mb-3 font-heading italic relative z-10">
                            {event.title}
                          </h3>
                          <p className="font-bold text-lg text-foreground mb-4 font-opensans relative z-10">
                            {event.date}{" "}
                            <span className="text-primary mx-2">•</span>{" "}
                            {event.time}
                          </p>
                          <div className="w-full h-px bg-primary/10 mb-4" />
                          <p className="text-foreground/80 leading-relaxed relative z-10 font-light">
                            {event.location}
                          </p>
                          <p className="mt-4 text-sm italic text-muted-foreground relative z-10">
                            {event.description}
                          </p>

                          {/* Decorative Icons matching the sketch */}
                          <div className="absolute bottom-4 right-4 flex gap-2 opacity-10">
                            <img
                              src="/icons/bride.png"
                              alt=""
                              className="w-8 h-auto"
                            />
                            <img
                              src="/icons/groom.png"
                              alt=""
                              className="w-8 h-auto"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Empty spacer for the other side to keep balance */}
                      <div className="hidden md:block w-[45%]" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : null}
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<GaneshLoader />}>
      <WeddingContent />
    </Suspense>
  );
}
