"use client";
import React from "react";
import { useAppSettings } from "../context/AppSettingsContext";
import { translations } from "../translations";

type Place = {
  name: string;
  type: string;
};

type NearbyFooterProps = {
  places: Place[];
};

const NearbyFooter: React.FC<NearbyFooterProps> = ({ places }) => {
  const { language } = useAppSettings();
  const t = translations[language];

  return (
    <div className="bg-red-950 text-white p-4">
      <p className="text-xl font-semibold">{t.nearbyLocations}</p>
      <div className="flex flex-col space-y-4 mt-2">
        {places && places.length > 0 ? (
          places.map((place, index) => (
            <div key={index} className="flex flex-col">
              <p className="text-lg font-semibold">{place.name}</p>
              <p className="text-sm">{place.type}</p>
            </div>
          ))
        ) : (
          <p className="text-sm">{t.noNearbyLocations}</p>
        )}
      </div>
    </div>
  );
};

export default NearbyFooter;
