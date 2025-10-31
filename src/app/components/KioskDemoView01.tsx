import Image from "next/image";
import React from "react";
import kiosk01 from "./assets/kiosk01.png";

export default function KioskDemoView01() {
  console.log("KioskDemoView01");
  return (
    <div className="h-screen w-screen bg-white flex justify-center items-center">
      <Image src={kiosk01} alt="kiosk-01" className="h-fit w-fit" />
    </div>
  );
}
