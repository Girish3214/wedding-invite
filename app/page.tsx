"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import GaneshLoader from "@/components/GaneshLoader";
import { AnimatePresence, motion } from "framer-motion";

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
            <div className="flex flex-col items-center text-center space-y-8 mb-20">
              <span className="text-primary uppercase tracking-[0.3em] font-medium text-sm">
                Save the Date
              </span>
              <h1 className="text-6xl md:text-8xl text-foreground font-cookie">
                {data.brideName}{" "}
                <span className="text-3xl align-middle mx-4 not-italic font-body text-primary">
                  &
                </span>{" "}
                {data.groomName}
              </h1>
              <p className="text-xl max-w-2xl font-body text-foreground/80 leading-relaxed">
                With the blessings of Lord Ganesh, we invite you to celebrate
                our union on {data.weddingDate}.
              </p>
            </div>

            {/* Event Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.events?.map((event: any, idx: number) => (
                <div
                  key={idx}
                  className="p-8 border border-primary/10 rounded-3xl group hover:border-primary/40 transition-all bg-card shadow-sm hover:shadow-xl"
                >
                  <h3 className="text-2xl text-primary mb-2 font-heading italic">
                    {event.title}
                  </h3>
                  <p className="font-bold text-foreground mb-4">
                    {event.date} | {event.time}
                  </p>
                  <p className="text-foreground/70">{event.location}</p>
                  <p className="mt-4 text-sm italic text-muted-foreground">
                    {event.description}
                  </p>
                </div>
              ))}
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
