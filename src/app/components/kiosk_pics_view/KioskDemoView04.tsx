import Image from "next/image";
import React from "react";
import kiosk04 from "../../../assets/kiosk04.png";

export default function KioskDemoView04() {
  console.log("KioskDemoView03");
  return (
    <div className="h-screen w-screen bg-white flex justify-center items-center">
      <Image src={kiosk04} alt="kiosk-04" className="h-fit w-fit" />
    </div>
  );
}
