import React, { useState } from "react";
import Header from "./components/Header";
import MapComponent from "./components/MapComponent";
import NearbyFooter from "./components/NearbyFooter";

export default function MapPage() {
  const [places, setPlaces] = useState([]);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <MapComponent setPlaces={setPlaces} />
      <NearbyFooter places={places} />
    </div>
  );
}
