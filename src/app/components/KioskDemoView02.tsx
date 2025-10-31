import Image from "next/image";
import React from "react";
import kiosk02 from "./assets/kiosk02.png";

export default function KioskDemoView02() {
  console.log("KioskDemoView01");
  return (
    <div className="h-screen w-screen bg-white flex justify-center items-center">
      <Image src={kiosk02} alt="kiosk-02" className="h-fit w-fit" />
    </div>
  );
}
