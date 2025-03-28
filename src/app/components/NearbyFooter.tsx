import React from "react";

type Place = {
  name: string;
  type: string;
};

type NearbyFooterProps = {
  places: Place[];
};

const NearbyFooter: React.FC<NearbyFooterProps> = ({ places }) => {
  return (
    <div className="bg-red-950 text-white p-4">
      <p className="text-xl font-semibold">Nearby Locations</p>
      <div className="flex flex-col space-y-4 mt-2">
        {places && places.length > 0 ? (
          places.map((place, index) => (
            <div key={index} className="flex flex-col">
              <p className="text-lg font-semibold">{place.name}</p>
              <p className="text-sm">{place.type}</p>
            </div>
          ))
        ) : (
          <p className="text-sm">No nearby locations found.</p>
        )}
      </div>
    </div>
  );
};

export default NearbyFooter;
