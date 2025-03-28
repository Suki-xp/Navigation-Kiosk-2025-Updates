"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EmptyView from "./EmptyView";
import mapPage from "../mapPage";

export default function CarouselView() {
  const pages = [mapPage, EmptyView];
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<number | null>(null);
  const timeoutDuration = useRef(10000);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = window.setTimeout(() => {
      setIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % pages.length;
        timeoutDuration.current = newIndex === 0 ? 50000 : 6000;
        return newIndex;
      });
    }, timeoutDuration.current);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index, pages.length]);

  const Page = pages[index];

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute w-full h-full"
        >
          <Page />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
