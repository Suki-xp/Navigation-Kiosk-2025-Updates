import React from "react";
import Header from "./components/Header";
import MapComponent from "./components/MapComponent";

export default function MapPage() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <MapComponent />
    </div>
  );
}
