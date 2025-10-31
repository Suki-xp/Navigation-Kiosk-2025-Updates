import Image from "next/image";
import React from "react";
import kiosk03 from "./assets/kiosk03.png";

export default function KioskDemoView03() {
  console.log("KioskDemoView03");
  return (
    <div className="h-screen w-screen bg-white flex justify-center items-center scale-115">
      <Image src={kiosk03} alt="kiosk-01" className="h-fit w-fit pt-12" />
    </div>
  );
}
