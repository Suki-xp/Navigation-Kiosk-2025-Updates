"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MapPage from "../mapPage";
import KioskDemoView01 from "./KioskDemoView01";
import KioskDemoView02 from "./KioskDemoView02";
import KioskDemoView03 from "./KioskDemoView03";
import KioskDemoView04 from "./KioskDemoView04";
export default function CarouselView() {
  const pages = [
    MapPage,
    KioskDemoView01,
    KioskDemoView02,
    KioskDemoView03,
    KioskDemoView04,
  ];
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<number | null>(null);
  const timeoutDuration = useRef(100000);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = window.setTimeout(() => {
      setIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % pages.length;
        console.log(newIndex);
        if (newIndex === 1) {
          timeoutDuration.current = 50000;
        } else if (newIndex === 2) {
          timeoutDuration.current = 50000;
        } else if (newIndex === 3) {
          timeoutDuration.current = 50000;
        } else if (newIndex === 4) {
          timeoutDuration.current = 50000;
        } else if (newIndex === 5) {
          timeoutDuration.current = 50000;
        }
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
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute w-full h-full"
        >
          <Page />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
