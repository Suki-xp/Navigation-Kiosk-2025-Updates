"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import mapPage from "../mapPage";
import SampleEvent01 from "./SampleEvent01";
import KioskDemoView01 from "./kiosk_pics_view/KioskDemoView01";
import KioskDemoView02 from "./kiosk_pics_view/KioskDemoView02";
import KioskDemoView03 from "./kiosk_pics_view/KioskDemoView03";
import KioskDemoView04 from "./kiosk_pics_view/KioskDemoView04";
export default function CarouselView() {
  const pages = [
    mapPage,
    SampleEvent01,
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
          timeoutDuration.current = 10000;
        } else if (newIndex === 2) {
          timeoutDuration.current = 10000;
        } else if (newIndex === 3) {
          timeoutDuration.current = 10000;
        } else if (newIndex === 4) {
          timeoutDuration.current = 10000;
        } else if (newIndex === 5) {
          timeoutDuration.current = 10000;
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
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute w-full h-full"
        >
          <Page />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
