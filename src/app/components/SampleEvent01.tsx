import Image from "next/image";
import React from "react";
import logo from "../../assets/vt-event-01.png";

export default function SampleEvent01() {
  console.log("SampleEvent01");
  return (
    <div>
      <Image src={logo} alt="Event-01" className="h-screen w-screen" />
    </div>
  );
}
