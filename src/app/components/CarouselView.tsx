"use client";

import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    let duration = 50000;
    
    //Going through the specific dispalys of the Kiosk
    if (index === 0)
    {
      duration = 100000; //Map gets the most priority view for 100 seconds
      //while the rest get the 50 seconds
    }
    else
    {
      duration = 50000;
    }

    const totalTimer = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % pages.length);
    }, duration)
    
    return () => clearTimeout(totalTimer);
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
